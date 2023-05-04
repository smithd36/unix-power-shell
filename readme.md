***Shell Program***

@Author: Drey Smith

@Date: 05/01/2023

@Version: pa4 - Simple Shell With Pipes

@File: pa4.cc

This program is a simple shell program that allows the user to execute commands, handle pipes, and redirections. The program is written in C++ and uses various libraries for input/output, system calls, and error handling.

***Dependencies***

The program uses the following C++ libraries: 

<iostream>

<fstream>

<sys/stat.h>

<cerrno>

<fcntl.h>

<unistd.h>

<sys/types.h>

<sys/wait.h>

<cstring>


***Usage***

To use the program, you need to compile it with a C++ compiler such as g++. Once compiled, the program can be run from the command line. Upon running, the user can enter commands to be executed. The program can handle the following: 
-
- Commands with arguments 
- Pipes between two commands 
- Redirection of output to a file 





***Limitations***

The program has a few limitations: 
-
- Only one pipe or redirect can be used at a time. 
- The program cannot handle some special characters or escape sequences. 
- The program does not support command history or tab completion. 
-
-
- ***Functions***
-
- The program contains the following functions: 

parse(int c, char\*\* argv, char\*\* userCmd1, char\*\* userCmd2)
-
- Parses the command to determine if a pipe or redirect is used and separates the commands accordingly. 

void exec\_pipe(char\*\* userCmd1, char\*\* userCmd2)
-
- Executes two commands connected by a pipe. 

int read\_args(char \*\*argv)
-
- Reads in the arguments for a command. 

void redirect\_cmd(char\*\* cmd, char\*\* file)
-
- Redirects the output of a command to a file. 

void exec\_cmd(int c, char\*\* argv)
-
- Executes a command. 

bool quit\_check(string choice)
-
- Checks if the user wants to quit the shell. 
-
- ***Commands***
-
- The following are the commands supported by this program: 
-
- Pipe command: This command allows the user to execute two commands in sequence, where the output of the first command is used as the input of the second command. The command is specified using the "|" symbol. For example: ls -l | grep "txt" 
- Redirect command: This command allows the user to redirect the output of a command to a file. The command is specified using the ">" symbol. For example: ls > file.txt 
- Quit command: This command allows the user to exit the shell. The command is specified using the "quit" keyword. For example: quit 


