<?php

require_once __DIR__.'/../vendor/autoload.php';

use Clue\React\Multicast\Factory as MulticastFactory;
use React\EventLoop\Factory;

$multicastAddress = '224.224.0.1:9727';

$loop    = Factory::create();
$factory = new MulticastFactory($loop);

$socket = $factory->createReceiver($multicastAddress);
$client = new Predis\Client();
$socket->on(
    'message',
    function ($data, $remote) use ($socket, $client) {
        $data = unpack('H*', $data);
        $data = $data[1];


        echo "\n===================\n";

        $op     = substr($data, 0, 4);
        $ip     = substr($data, 4, 8);
        $port   = substr($data, 0 + 4 + 8, 4);
        $peerId = substr($data, 0 + 4 + 8 + 4, 64);

        try {
            $ip   = long2ip(hexdec($ip));
            $port = hexdec($port);

            if ($peerId && $ip && $port) {
                echo 'PARAMETERS CORRECT!'."\n\n";

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
            print_r($decoded);
        }
        $socket->send($data, $remote);
    }
);

$loop->run();
