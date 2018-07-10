<?php

require_once __DIR__.'/../vendor/autoload.php';

use Clue\React\Multicast\Factory as MulticastFactory;
use React\Datagram\Socket as DatagramSocket;
use React\EventLoop\Factory;

$multicastAddress = '224.224.0.1:9727';

$myIp = gethostbyname(trim(gethostname()));

$loop   = Factory::create();
$client = new Predis\Client();

$factoryUnicast        = new React\Datagram\Factory($loop);
$socketReceiverUnicast = $factoryUnicast->createServer("$myIp:9728");

$factory        = new MulticastFactory($loop);
$socketReceiver = $factory->createReceiver($multicastAddress);

$socketSender = $factory->createSender();

$socketSender->send(hello_world(), $multicastAddress); // send hello world
$socketSender->send(where_is_world(), $multicastAddress); // send hello world

/// echo -n -e '\x00\x02' > /dev/udp/224.224.0.1/9727

$socketReceiver->on(
    'message',
    function ($data, $remote) use ($socketReceiver, $client) {
        $data = unpack('H*', $data);
        $data = $data[1];

        echo "\n===================\n";

        $op = substr($data, 0, 4);

        switch (hexdec($op)) {
            case 1:
                {
                    echo 'received OP 1';
                    case1($data, $client, $socketReceiver,$remote);
                    break;
                }
            case 2:
                {
                    echo 'received OP 2';
                    case2($data, $client, $socketReceiver,$remote);
                    break;
                }
            default:
                {
                    echo "INVALID OP $op";
                }
        }
        echo "===================\n";
    }
);

$socketReceiverUnicast->then(
    function (React\Datagram\Socket $server) {
        $server->on(
            'message',
            function ($message, $address, $socket) {

                echo "\n===================\n";
                echo "client $address: $message\n";
                echo "===================\n";
            }
        );
    },
    function (Exception $error) {
        echo 'ERROR: '.$error->getMessage()."\n";
    }
);

$loop->run();

function case1($data, $client, DatagramSocket $socket,$remote)
{
    $ip     = substr($data, 4, 8);
    $port   = substr($data, 0 + 4 + 8, 4);
    $peerId = substr($data, 0 + 4 + 8 + 4, 64);

    try {
        $ip   = long2ip(hexdec($ip));
        $port = hexdec($port);

        if ($peerId && $ip && $port) {
            echo "\n".'PARAMETERS CORRECT!'."\n";

            $map                    = [];
            $map[$peerId]['ip']     = $ip;
            $map[$peerId]['port']   = $port;
            $map[$peerId]['peerid'] = $peerId;

            $client->sadd('log', [\json_encode($map)]);
        } else {
            echo $peerId ? "PEER_ID OK \n" : "PEER_ID KO \n";
            echo $ip ? 'IP OK'.$ip." \n" : "IP KO \n";
            echo $port ? "PORT OK \n" : "PORT KO \n";
        }
    } catch (\Throwable $throwable) {
        echo 'Catched and exception while receiving message: '.$throwable->getMessage();
    }

    $arr = $client->smembers('log');

    foreach ($arr as $r) {
        $decoded = \json_decode($r, true);
    }
}

function case2($data, $client, DatagramSocket $socket,$remote)
{
    $port = substr($data, 0 + 4, 4);

    try {
        $port = hexdec($port);
        $ip = explode(':',$remote)[0];

        if ($ip && $port) {
            echo "\n".'PARAMETERS CORRECT!'."\n";
        } else {
            echo " \n";
            echo $ip ? 'IP OK'.$ip." \n" : "IP KO \n";
            echo $port ? "PORT OK \n" : "PORT KO \n";
        }
    } catch (\Throwable $throwable) {
        echo 'Catched and exception while receiving message: '.$throwable->getMessage();
    }
    $socket->send(hello_world(), "$ip:$port");
}

function hello_world()
{
    $myIp = gethostbyname(trim(gethostname()));

//    echo 'my ip is: '.$myIp;

    $id = hash('sha256', \Ramsey\Uuid\Uuid::uuid4()->toString());

    $opCode = sprintf('%04x', 1);
    $myIp   = sprintf('%08x', ip2long($myIp));
    $port   = sprintf('%04x', 9727);
    $id     = sprintf('%064s', $id);

    return hex2bin($opCode.$myIp.$port.$id);
}

function where_is_world()
{
    $myIp = gethostbyname(trim(gethostname()));
//    $myIp = file_get_contents("")

    $opCode = sprintf('%04x', 2);
//    $myIp   = sprintf('%08x', ip2long($myIp));
    $port   = sprintf('%04x', 9728);

    return hex2bin($opCode.$port);
}
