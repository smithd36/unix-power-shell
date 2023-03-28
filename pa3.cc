#include<iostream>
#include<unistd.h>
#include<fcntl.h>
#include<vector>
#include <sys/wait.h>

using namespace std;

void execute(vector<string> argv, int input_fd, int output_fd)
{
    int status;
    pid_t child;

    /* spawning a child process */
    child = fork();

    /* the parent process portion */
    if ( child != 0  )
    {
        printf("(%d) : I am a parent process waiting...\n", getpid());
        waitpid(child, &status, 0);
        printf("waiting complete\n");
    }

    /* the child process portion */
    else
    {
        printf("I am a child executing a new environment \n"); 

        /* Redirect input and output if necessary */
        if (input_fd != STDIN_FILENO) {
            if (dup2(input_fd, STDIN_FILENO) == -1) {
                perror("dup2");
                _exit(1);
            }
            close(input_fd);
        }

        if (output_fd != STDOUT_FILENO) {
            if (dup2(output_fd, STDOUT_FILENO) == -1) {
                perror("dup2");
                _exit(1);
            }
            close(output_fd);
        }

        string exec_path = std::string("/bin/") + std::string(argv[0]);
        execl(exec_path.c_str(),argv[0].c_str(),argv[1].c_str(),(char *)0); 
        _exit(1);
    }
}

/* function which takes a string and parses it into tokens. The tokens are stored into a vector*/

void parse(string line, vector<string>& tokens, string delimiter) 
{
    size_t position = 0;
    string token = "";
    while ((position = line.find(delimiter)) != string::npos) {
        tokens.push_back(line.substr(0, position));
        line.erase(0, position + delimiter.length());
    }

    if(line.length() != 0)
        tokens.push_back(line);

}

int main()
{
    while(1)
    {
        string line;
        vector<string> tokens;
        int input_fd = STDIN_FILENO;
        int output_fd = STDOUT_FILENO;

        /* Print the prompt */
        printf("(%d) %% ", getpid());

        /* takes input from the keyboard */
        getline(cin, line);

        /* parse the input into tokens*/
        parse(line, tokens, " ");

        /* check if input/output redirection is required */
        for (size_t i = 0; i < tokens.size(); i++) {
            if (tokens[i] == "<") {
                if (i == tokens.size() - 1) {
                    perror("No input file specified");
                    break;
                }
                input_fd = open(tokens[i+1].c_str(), O_RDONLY);
                if (input_fd == -1) {
                    perror("Cannot open input file");
                    break;
                }
                tokens.erase(tokens.begin() + i, tokens.begin() + i + 2);
                i--;
            }
            else if (tokens[i] == ">") {
                if (i == tokens.size() - 1) {
                    perror("No output file specified");
                    break;
                }
                output_fd = open(tokens[i+1].c_str(), O_WRONLY|O_CREAT|O_TRUNC, 0644);
                if (output_fd == -1) {
                    perror("Cannot open output file");
                    break;
                }
                tokens.erase(tokens.begin() + i, tokens.begin() + i + 2);
                i--;
            }
        }

        /* execute the user command */
        execute(tokens, input_fd, output_fd);
    }
}