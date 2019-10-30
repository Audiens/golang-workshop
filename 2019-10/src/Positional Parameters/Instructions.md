In the work directory, prepare a script `positional_parameters.sh` which:
- Writes on a file named "output.txt" the arguments "FIRSTWORD" "secondword" passed to the script.
- Appends to the file the string "Appended line"
- Using 'tr' command converts the first argument to lowercase and the second argument to uppercase and finally append the converted arguments concatenated to the file on a single line
- Print file content

 
For example:
```
$ ./positional_parameters.sh FIRSTWORD secondword
FIRSTWORD secondword
Appended line
firstword SECONDWORD

$ ls
output.txt
```

Use following docs:
Set Permissions: https://help.ubuntu.com/community/FilePermissions (to make .sh file executable)
Positional parameters: http://linuxcommand.org/lc3_wss0120.php
Convert string: https://linuxhint.com/bash_tr_command/
Redirection: http://tldp.org/HOWTO/Bash-Prog-Intro-HOWTO-3.html
Print file content: http://www.linuxguide.it/command_line/linux-manpage/do.php?file=cat

Then run the command "./test.sh" to check your job

