In the work directory, prepare a script `positional_parameters.sh` which:
- Create a directory named "created_files"
- Outputs on a single line (on stdout) all of the arguments that were passed to the script. 
- Outputs on a separated lines (on stdout) all of the arguments that were passed to the script.
- Creates a file with name corresponding to each passed argument.
Use "mkdir" to create the directory, "touch" command to create files and "chmod" command to make the .sh file executable
Arguments to be used: "file1" "file2" "file 3"
 
For example:
```
$ ./positional_parameters.sh "file1" "file2" "file 3"
file1 file2 file 3
file1
file2
file 3

$ ls
'file 3' file 1 file2
```

Use following docs:
Set Permissions: https://help.ubuntu.com/community/FilePermissions (to make .sh file executable)
Touch command: https://linux.die.net/man/1/touch
Positional parameters: http://linuxcommand.org/lc3_wss0120.php
Bash Special Variables: https://www.mylinuxplace.com/bash-special-variables/

Then run the command "./test.sh" to check your job

