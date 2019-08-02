<?php

require_once __DIR__.'/../../vendor/autoload.php';

$runner = new \Runner\Runner();

echo $runner->run('+',1,1,2);
echo $runner->run('*',7,5,2);
echo $runner->run('-',10,5,2);
echo $runner->run('/',20,5,2);
echo $runner->run('?',65,92,41);

