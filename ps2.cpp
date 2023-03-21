#include <iostream>
#include <cstring>
#include <unistd.h>
#include <sys/wait.h>
#include <sys/stat.h>
#include <sys/types.h>
#include <limits.h>

int main() {
    while (true) {
        // display prompt
        std::cout << "$ " << std::flush;

        // read input
        std::string input_str;
        std::getline(std::cin, input_str);
        if (input_str.empty()) {
            continue;
        }

        // parse input into command and arguments
        char* command = strtok(input_str.data(), " ");
        char* args[100];
        args[0] = command;
        int i = 1;
        while ((args[i] = strtok(nullptr, " ")) != nullptr) {
            i++;
        }

        // execute command
        if (strcmp(command, "cd") == 0) {
            chdir(args[1]);
        } else if (strcmp(command, "/bin/date") == 0) {
            system(command);
        } else if (strcmp(command, "pwd") == 0) {
            char cwd[PATH_MAX];
            if (getcwd(cwd, sizeof(cwd)) != nullptr) {
                std::cout << cwd << std::endl;
            }
        } else if (strcmp(command, "mkdir") == 0) {
            mkdir(args[1], S_IRWXU | S_IRWXG | S_IROTH | S_IXOTH);
        } else if (strcmp(command, "ls") == 0) {
            pid_t pid = fork();
            if (pid == 0) {
                execlp("ls", "ls", "-F", nullptr);
            } else {
                waitpid(pid, nullptr, 0);
            }
        } else if (strcmp(command, "cat") == 0) {
            FILE* fp = fopen(args[1], "r");
            if (fp != nullptr) {
                char buffer[4096];
                while (fgets(buffer, sizeof(buffer), fp) != nullptr) {
                    std::cout << buffer;
                }
                fclose(fp);
            }
        } else {
            pid_t pid = fork();
            if (pid == 0) {
                execvp(command, args);
                std::cout << command << ": command not found" << std::endl;
                exit(EXIT_FAILURE);
            } else {
                waitpid(pid, nullptr, 0);
            }
        }
    }

    return 0;
}