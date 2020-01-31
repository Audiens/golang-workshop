<?php

// Allow from any origin
if (isset($_SERVER['HTTP_ORIGIN'])) {
    // Decide if the origin in $_SERVER['HTTP_ORIGIN'] is one
    // you want to allow, and if so:
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
}    // Access-Control headers are received during OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
    // may also be using PUT, PATCH, HEAD etc
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
    header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");        exit(0);
}

ini_set('request_order', 'GC');
ini_set('register_globals', 'true');
error_reporting(E_ALL);

$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);

class index
{
    private static $n = [];

    public function tj($receivedValue = null)
    {
        if(is_array($receivedValue))
        {
            self::$n = $receivedValue;
        }

        $isRandom = false;

        if(count(self::$n) == 0)
        {
            self::$n = $this->tjInit();
            $isRandom=true;
        }

        self::$n = $this->tjNext();

        $data = [
            'd' => [
                'x' => 16,
                'y' => 16
            ],
            'v' => self::$n,
            'random' => $isRandom
        ];

        return \json_encode($data);

    }
    public function tjInit()
    {
        $n = [];

        for ($i = 0; $i < 16; $i++) {
            for ($j = 0; $j < 16; $j++) {
                $n[$i][$j] = \random_int(0, 1);
            }
        }

        return $n;

    }

    public function tjNext()
    {
        $world = self::$n;

        $newWorld = [];

        for ($i = 0; $i < 16; $i++) {
            for ($j = 0; $j < 16; $j++) {
                $newWorld[$i][$j] = $this->isAlive($world[$i][$j], $i, $j, $world);
            }

        }

        return $newWorld;
    }

    public function isAlive(bool $cellValue, $coordinateX, $coordinateY, array $world): bool
    {
        $numberOfAliveCells =
            @$world[$coordinateX - 1][$coordinateY - 1] +
            @$world[$coordinateX - 1][$coordinateY + 1] +
            @$world[$coordinateX + 1][$coordinateY - 1] +
            @$world[$coordinateX + 1][$coordinateY + 1] +
            @$world[$coordinateX - 1][$coordinateY + 1] +
            @$world[$coordinateX][$coordinateY - 1] +
            @$world[$coordinateX][$coordinateY + 1] +
            @$world[$coordinateX + 1][$coordinateY] +
            @$world[$coordinateX - 1][$coordinateY];

        if ($cellValue == 1) {
            if ($numberOfAliveCells < 2) {
                return 0;
            }

            if ($numberOfAliveCells == 2 || $numberOfAliveCells == 3) {
                return 1;
            }
            if ($numberOfAliveCells > 3) {
                return 0;
            }
        }

        return $numberOfAliveCells == 3;

    }

}
header('Content-Type: application/json');
$g = new index();
echo $g->tj($_POST['v']);