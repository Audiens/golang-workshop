<?php

class index
{
    public function tj()
    {
        $n = [];

        for($i=0;$i<16;$i++)
        {
            array_push($n, \random_int(0, 100));
        }

        $data = [
            'd' => [
                'x' => 16,
                'y' => 16
            ],
            'v' => $n
        ];

        return \json_encode($data);
    }
}

$g = new index();
echo $g->tj();