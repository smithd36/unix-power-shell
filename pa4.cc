/*
@Author: Drey Smith
@Date: 05/01/2023
@Version: pa4 - Simple Shell With Pipes
@File: pa4.cc
@Description: This program is a simple shell that can execute fundamental commands 
              using I/O redirection and pipes.


ASSIGNMENT DESCRIPTION:
Enhance your code from pa3-simple shell with I/O redirection assignment so it 
has the ability to send the output from one program into the input of another 
program. The supporting mechanism for this is called a pipe. For example:

             % cat dup.cc | grep main

This says that the output resulting from the execution of the linux command 
cat will be sent as input to the command after the pipe. The example above 
runs the linux command cat to print the content of the file named dup.cc, then
the output is sent to the linux command grep as an input to search for any 
line that contains the word main. If the line exists, it is printed out.

To enhance the program to send the output from one program into the input of 
another program, we can use the pipe mechanism in Unix. A pipe is a mechanism
for inter-process communication (IPC) that allows the output of one process to
be used as the input of another process.

To use a pipe, we need to create two file descriptors: one for the read end 
of the pipe and one for the write end of the pipe. We can then use the dup2() 
system call to redirect the standard output of the first program to the write end 
of the pipe, and redirect the standard input of the second program to the read 
end of the pipe. The dup2() system call duplicates an existing file descriptor
to another file descriptor. The dup2() system call takes two arguments: the
first argument is the file descriptor to be duplicated, and the second argument
is the file descriptor to which the first file descriptor is duplicated. The
dup2() system call returns the second argument if successful, or -1 if an error
occurs. The dup2() system call can be used to redirect the standard input and
standard output of a program to a file.

The README.md associated with this tag is the same one which we will be using
for pa6 as extra credit. Please read it carefully and follow the instructions.
*/
// ---------------------------------------------------------------------------
// Header Files
#include <iostream>
#include <fstream>
#include <sys/stat.h>
#include <cerrno>
#include <fcntl.h>
#include <unistd.h>
#include <sys/types.h>
#include <sys/wait.h>
#include <cstring>

using namespace std;
const int MAX_ARGS = 256; // Max number of arguments
enum redirect_pipe {PIPE, REDIRECT, NONE}; // Enum for pipe and redirect
redirect_pipe parse(int, char**, char**, char**); // Parse command
void exec_pipe(char**, char**); // Execute pipe
int read_args(char**); // Read arguments
void redirect_cmd(char**, char**); // Redirect command
void exec_cmd(int, char**); // Execute command
bool quit_check(string); // Check if user wants to quit

redirect_pipe parse(int c, char** argv, char** userCmd1, char** userCmd2) { // Parse command
  // Assume no pipe or redirect will be found. // Assume no pipe or redirect will be found.
  redirect_pipe pr = NONE;
  int split = -1; // Index of pipe or redirect
  // Go through the array of arguments
  for (int i=0; i<c; i++) {
    // Pipe found!
    if (strcmp(argv[i], "|") == 0) {
      pr = PIPE;
      split = i;

    // Redirect found
    } else if (strcmp(argv[i], ">") == 0) {
      pr = REDIRECT;
      split = i;
    }
  }

  if (pr != NONE) { // If pipe or redirect found
    for (int i=0; i<split; i++)
      userCmd1[i] = argv[i]; // Copy first command


    int counter = 0;
    for (int i=split+1; i<c; i++) {
      userCmd2[counter] = argv[i]; // Copy second command
      counter++; // Increment counter
    }

    // Set null terminators
    userCmd1[split] = NULL;
    userCmd2[counter] = NULL;
  }

  return pr; // result
}

void exec_pipe(char** userCmd1, char** userCmd2) {
  int fds[2]; // File descriptors
  pipe(fds); // Open pipe
  pid_t pid;

  // child process #1
  if (fork() == 0) {
    dup2(fds[0], 0);


    close(fds[1]); // Close write end of pipe

    // Execute the second command.
    execvp(userCmd2[0], userCmd2);
    perror("execvp");

  // child process #2
  } else if ((pid = fork()) == 0) {
    dup2(fds[1], 1);


    close(fds[0]); // Close read end of pipe

    // Execute the first command.
    execvp(userCmd1[0], userCmd1);
    perror("execvp");

  // parent process
  } else
    waitpid(pid, NULL, 0); // Wait for child process to finish
}

int read_args(char **argv) {
  char *cstring; 
  string arg;
  int counter = 0;

    // Read arguments
  while (cin >> arg) {
    if (quit_check(arg)) {
      printf("Exiting Shell...\n");
      exit(0);
    }

    cstring = new char[arg.size()+1];
    strcpy(cstring, arg.c_str());
    argv[counter] = cstring;

    counter++; // Increment counter

    if (cin.get() == '\n')
      break;
  }

  argv[counter] = NULL;

 
  return counter; // Return number of arguments
}

void redirect_cmd(char** cmd, char** file) {
  int fds[2];
  int counter;
  int fd;
  char c;
  pid_t pid;  

  pipe(fds); // Open pipe

  // child process #1
  if (fork() == 0) {

    fd = open(file[0], O_RDWR | O_CREAT, 0666); // Open file NOTE: 0666 is the permission for the file

    // open() returns a -1 if an error occurred
    if (fd < 0) {
      printf("Error: %s\n", strerror(errno));
      return;
    }

    dup2(fds[0], 0); // Redirect stdin to read end of pipe.

    // Don't need stdout end of pipe.
    close(fds[1]);

    // Read from stdout...
    while ((counter = read(0, &c, 1)) > 0)
      write(fd, &c, 1); // Write to file.

    execlp("echo", "echo", NULL); // Print to stdout

  // child process #2
  } else if ((pid = fork()) == 0) {
    dup2(fds[1], 1);

    // Don't need stdin end of pipe.
    close(fds[0]);

    // Output contents of the given file to stdout.
    execvp(cmd[0], cmd);
    perror("execvp");

  // parent process
  } else {
    waitpid(pid, NULL, 0);
    close(fds[0]);
    close(fds[1]);
  }
}

void exec_cmd(int c, char** argv) {
  pid_t pid;
  const char *ampersand;
  ampersand = "&";
  bool found = false;

  // Check if the first argument is "wc"
  if (strcmp(argv[0], "wc") == 0) {
    // Execute "wc" command with the rest of the arguments
    execvp("wc", argv);
    perror("execvp");
    return;
  }

  if (strcmp(argv[c-1], ampersand) == 0) // Check if "&" is present
    found = true;

  // Fork process
  pid = fork();

  // error
  if (pid < 0)
    perror("Error (pid < 0)");
  else if (pid == 0) {
    // Child process

    // Remove "&" if it is present
    if (found)
      argv[c-1] = NULL;

    // Execute the command
    execvp(argv[0], argv);
    perror("execvp");
    exit(EXIT_FAILURE);

  } else {
    // Parent process

    // If "&" is not present, wait for the child process to finish
    if (!found)
      waitpid(pid, NULL, 0);
  }
}

bool quit_check(string choice) {
    if (choice == "quit" || choice == "q")
        return true;
    else
        return false;
    }

int main() { // Driver code
  char *argv[MAX_ARGS], *userCmd1[MAX_ARGS], *userCmd2[MAX_ARGS]; // Arguments
  redirect_pipe pipe_redirect; // Pipe or redirect?
  int c;

  while (true) {
    // Display a prompt with pid
    printf("\nSHELL [%d]>> ", getpid());

    c = read_args(argv);
   
    pipe_redirect = parse(c, argv, userCmd1, userCmd2); // Parse the user's command(s)

    // Determine how to handle the user's command(s) using SWITCH.
    switch (pipe_redirect) {
      case PIPE:
        exec_pipe(userCmd1, userCmd2); // Execute pipe
        break;

      case REDIRECT:
        redirect_cmd(userCmd1, userCmd2); // Execute redirect
        break;

      default:
        exec_cmd(c, argv); // Execute command
        break;
    }
  }

  return 0;
}