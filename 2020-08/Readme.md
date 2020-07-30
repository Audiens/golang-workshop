## Step 1 - setup

Ensure that you don't have any container running:

```bash
$ docker ps
```
This will avoid any port collision.

Create a docker compose script that contains an apache web server exposing port `80` binding it 
to internal `8080`.
The Apache container should be built using a "custom" dockerfile, this will allow further 
personalization.

use the following directive to enable binding of port `8080`:

```dockerfile
RUN sed -i "s/Listen 80/Listen 8080/" /etc/apache2/ports.conf
```

Configure the docker-compose to mount:

- the `2020-08` directory as a volume binding it to `/app`, we'll usi this later
- the `2020-08/data` directory as a volume binding it `/var/www/html`, will contain the empty `index.html`

example of **one** volume declaration:
     
```yml
volumes:
  workshop_project_source:
    driver: local
    driver_opts: {o: "bind", type: none, device: place_the_correct_directory_here }
```
     
Following the directory structure:

```
├── 2020-08/
│   ├── docker/ # Will contain all assets needed for the docker environment
│       ├── webserver.Dockerfile # Our custom PHP apache
│       └── workshop.compose.yml # Our compose
│   └── data/   # Will contain the project data and the source code
│       └── index.html # Empty html file, to allow apache to serve something
```

To verify the correct configuration you can run:

```bash
$ docker-compose -f docker/workshop.compose.yml up --build
```

if everything is correct you'll get attached to the apache log stream

Running `curl 127.0.0.1 -v` in another shell should display a 200 status code and something like:

```text
* Trying 127.0.0.1...
* TCP_NODELAY set
* Connected to 127.0.0.1 (127.0.0.1) port 80 (#0)
> GET / HTTP/1.1
> Host: 127.0.0.1
> User-Agent: curl/7.58.0
> Accept: */*

< HTTP/1.1 200 OK
< Date: Thu, 30 Jul 2020 10:35:01 GMT
< Server: Apache/2.4.38 (Debian)
< Last-Modified: Thu, 30 Jul 2020 10:34:57 GMT
< ETag: "b-5aba639424493"
< Accept-Ranges: bytes
< Content-Length: 11
< Content-Type: text/html
```

## Step 2 - permissions

Create inside the container another user other than root, `audiens`, this will avoid collision 
with folder/files permission.

HINT: use `ARG UID` and pass the current user uid `id -u` during the build phase

- https://medium.com/faun/set-current-host-user-for-docker-container-4e521cef9ffc
- https://medium.com/better-programming/running-a-container-with-a-non-root-user-e35830d1f42a

run again 

```bash
$ docker-compose -f docker/workshop.compose.yml up --build
```

and `curl 127.0.0.1 -v` in another shell you should be able to see the same output as before.

## Step 3 - basic automation

Create a bash script to run docker compose quickly the script should contain the following options:

  - **start** (start the compose environment)
  - **stop** (stop the compose environment)
  - **tail** (connect to the log stream)
  - **connect** (Enter in the PHP container with a bash shell)
  
```
├── 2020-08/
│   ├── docker/ # Will contain all assets needed for the docker environment
│       ├── webserver.Dockerfile # our custom PHP apache
│       └── workshop.compose.yml # our compose
│   ├── ws.sh 
│   └── data/   # Will contain the project data and the source code
│       └── index.html #empty html file, to allow apache to serve something
│    
```
  
The script should be invoked like this
    
```bash
$ ws start
$ ws stop
$ ws tail
```

```bash
  case $1 in
  "start")
    ;;
  "stop")
    ;;
  *)
    help
    ;;
  esac
```
> **HINT:** You need to add an alias script in you shell environment

## Step 4 - composer

Install composer

> **HINT:** use `composer --version` as a build step to ensure is installed correctly, the build will fail 
otherwise.

> HINT: also install `git` and `zip` the will be used by composer


## Step 5 - framework setup

Make a commit as in the following step there will be a lot of new files!

Use the "connect" utility of the ws script to install **Symfony 5**, the installation method
will be via **composer**, avoid using their installation script.

After the installation make sure that the project is installed inside the  data directory and
not in a sub-domain the new folder structure should look like this:

```
├── data
│   ├── bin
│   ├── composer.json
│   ├── composer.lock
│   ├── config
│   ├── index.html
│   ├── LICENSE
│   ├── migrations
│   ├── phpunit.xml.dist
│   ├── public
│   ├── src
│   ├── symfony.lock
│   ├── templates
│   ├── tests
│   ├── translations
│   ├── var
│   ├── vendor
│   └── workshop
├── docker
│   ├── webserver.Dockerfile
│   └── workshop.compose.yml
├── readme.md
└── ws.sh

```
Let's keep the index.html for now, ensure that the webserver is still working before moving to the next step
Mark the directories in PHP storm this will help the indexing

- *data/var*    ---> excluded
- *data/src*    ---> source root
- *data/tests*  ---> test root

## Step 6 - webserver automation

Add another command the ws script that can be used to restart the webserver.
    
```bash
$ ws restart
```
If you used the `graceful` command you should be able to see something like:

[ ok ] Reloading Apache httpd web server: apache2.

*Be careful if you use a more aggressive restart method as the container is kept running by
the apache service...*

If you want to use a complete restart you can do that via proxying the command via docker compose
https://docs.docker.com/compose/reference/restart/

## Step 7 - wiring of the framework

Overwrite the apache hosts file with a file that can serve symfony 5, this can be done via a
simple volume mounting o changing the build file.

For development the best approach is use the volume as we can change the content of the
server without rebuilding the image.

Place the virtual host in the docker/vhost directory

> **HINT:** the file you want to replace is probably the:

`/etc/apache2/sites-enabled/000-default.conf`

> **HINT:** make sure to enable mod rewrite for apache2

this activity is completed when you can see the framework "debug" page on 127.0.0.1/

## Step 8 - libraries cleanup

Using composer remove the following packages we won't be using them:

 - mailer
 - validator
 - serializer
 - string
 - notifier
 - intl and translation
 - form
 - doctrine-migrations-bundle
 - reflection-docblock
 - css-selector
 - doctrine and orm

> **HINT:** There are many way to remove the packages, symfony uses flex as a layer for additional
dependency management
https://symfony.com/doc/current/setup/flex.html

> **HINT:** running export COMPOSER_HOME=/tmp/composer in the container will save you a lot of time

put the right version of PHP

Configure the platform section of composer this is very important if we want to use composer
outside or production environment as will instruct the script of the platform configuration

https://getcomposer.org/doc/06-config.md#platform

Make sure the web application is still working

## Step 9 - Source code

Now we will add our first controller under data/Controller `MainController.php` that will return a random
number and will respond on the path `/`

If you want to use the controller generation there is a guide here: 

https://symfony.com/doc/current/bundles/SensioGeneratorBundle/commands/generate_controller.html

## Step 10 - Testing

Install via composer:

    - phpunit
    - paraunit 

Create a new test under tests/Controller/MainControllerTest.php that assert the controller is working

Configure an additional helper in the ws script `test` that will run paraunit

## Step 11 - Static analysis

Install via composer:
    
- phpstan/extension-installer
- phpstan/phpstan-deprecation-rules
- phpstan/phpstan-php-parser
- phpstan/phpstan-phpunit
- phpstan/phpstan-symfony
- phpstan/phpstan

And create a `.neon` configuration file in the Data directory, this configurtion file should run with the max level