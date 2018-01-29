#!/bin/bash

rm -rf phpmd && git clone https://github.com/phpmd/phpmd.git  && cd phpmd && composer install && rm -rf .git
cd ..
rm -rf PHP_CodeSniffer && git clone https://github.com/squizlabs/PHP_CodeSniffer.git && cd PHP_CodeSniffer && composer install && rm -rf .git
cd ..
rm -rf phpstan && git clone https://github.com/phpstan/phpstan.git && cd phpstan && composer install && rm -rf .git
cd ..
rm -rf phan && git clone https://github.com/etsy/phan.git  && cd phan && composer install && rm -rf .git
cd ..
rm -rf phploc && git clone https://github.com/sebastianbergmann/phploc.git && cd phploc && composer install && rm -rf .git
cd ..