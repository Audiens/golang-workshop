<?php

class IndexTest extends \PHPUnit\Framework\TestCase
{
    /**
     * @test
     */
    public function it_will_return_a_valid_response()
    {
        $client = new \GuzzleHttp\Client();

        $dataJson = [
            'd' =>
                [
                    'x' => 16,
                    'y' => 16,
                ],
            'v' =>
                [
                    0  =>
                        [
                            0  => false,
                            1  => true,
                            2  => true,
                            3  => false,
                            4  => false,
                            5  => false,
                            6  => true,
                            7  => false,
                            8  => false,
                            9  => true,
                            10 => false,
                            11 => true,
                            12 => false,
                            13 => true,
                            14 => true,
                            15 => false,
                        ],
                    1  =>
                        [
                            0  => true,
                            1  => true,
                            2  => false,
                            3  => false,
                            4  => false,
                            5  => false,
                            6  => false,
                            7  => false,
                            8  => true,
                            9  => true,
                            10 => false,
                            11 => false,
                            12 => false,
                            13 => false,
                            14 => false,
                            15 => false,
                        ],
                    2  =>
                        [
                            0  => true,
                            1  => false,
                            2  => false,
                            3  => false,
                            4  => false,
                            5  => false,
                            6  => true,
                            7  => false,
                            8  => true,
                            9  => false,
                            10 => false,
                            11 => false,
                            12 => false,
                            13 => false,
                            14 => false,
                            15 => false,
                        ],
                    3  =>
                        [
                            0  => false,
                            1  => false,
                            2  => false,
                            3  => false,
                            4  => true,
                            5  => true,
                            6  => false,
                            7  => true,
                            8  => false,
                            9  => false,
                            10 => false,
                            11 => false,
                            12 => false,
                            13 => true,
                            14 => true,
                            15 => false,
                        ],
                    4  =>
                        [
                            0  => true,
                            1  => true,
                            2  => true,
                            3  => false,
                            4  => false,
                            5  => false,
                            6  => false,
                            7  => false,
                            8  => false,
                            9  => false,
                            10 => false,
                            11 => false,
                            12 => false,
                            13 => false,
                            14 => true,
                            15 => false,
                        ],
                    5  =>
                        [
                            0  => true,
                            1  => false,
                            2  => true,
                            3  => true,
                            4  => false,
                            5  => false,
                            6  => false,
                            7  => true,
                            8  => true,
                            9  => true,
                            10 => false,
                            11 => true,
                            12 => false,
                            13 => false,
                            14 => false,
                            15 => false,
                        ],
                    6  =>
                        [
                            0  => true,
                            1  => false,
                            2  => true,
                            3  => false,
                            4  => false,
                            5  => false,
                            6  => true,
                            7  => false,
                            8  => false,
                            9  => false,
                            10 => false,
                            11 => true,
                            12 => false,
                            13 => false,
                            14 => false,
                            15 => true,
                        ],
                    7  =>
                        [
                            0  => false,
                            1  => false,
                            2  => true,
                            3  => true,
                            4  => true,
                            5  => false,
                            6  => false,
                            7  => false,
                            8  => false,
                            9  => true,
                            10 => false,
                            11 => false,
                            12 => false,
                            13 => false,
                            14 => false,
                            15 => true,
                        ],
                    8  =>
                        [
                            0  => false,
                            1  => false,
                            2  => true,
                            3  => false,
                            4  => true,
                            5  => false,
                            6  => true,
                            7  => false,
                            8  => false,
                            9  => true,
                            10 => false,
                            11 => false,
                            12 => false,
                            13 => false,
                            14 => false,
                            15 => true,
                        ],
                    9  =>
                        [
                            0  => false,
                            1  => false,
                            2  => false,
                            3  => true,
                            4  => false,
                            5  => true,
                            6  => false,
                            7  => true,
                            8  => false,
                            9  => false,
                            10 => false,
                            11 => false,
                            12 => false,
                            13 => true,
                            14 => false,
                            15 => false,
                        ],
                    10 =>
                        [
                            0  => false,
                            1  => false,
                            2  => false,
                            3  => true,
                            4  => false,
                            5  => true,
                            6  => true,
                            7  => false,
                            8  => false,
                            9  => false,
                            10 => false,
                            11 => false,
                            12 => false,
                            13 => false,
                            14 => false,
                            15 => false,
                        ],
                    11 =>
                        [
                            0  => true,
                            1  => true,
                            2  => false,
                            3  => false,
                            4  => false,
                            5  => false,
                            6  => false,
                            7  => false,
                            8  => false,
                            9  => false,
                            10 => false,
                            11 => false,
                            12 => false,
                            13 => false,
                            14 => false,
                            15 => false,
                        ],
                    12 =>
                        [
                            0  => true,
                            1  => true,
                            2  => true,
                            3  => false,
                            4  => false,
                            5  => false,
                            6  => false,
                            7  => false,
                            8  => false,
                            9  => false,
                            10 => false,
                            11 => false,
                            12 => false,
                            13 => false,
                            14 => false,
                            15 => true,
                        ],
                    13 =>
                        [
                            0  => true,
                            1  => true,
                            2  => true,
                            3  => false,
                            4  => false,
                            5  => false,
                            6  => false,
                            7  => false,
                            8  => false,
                            9  => false,
                            10 => false,
                            11 => true,
                            12 => true,
                            13 => true,
                            14 => false,
                            15 => true,
                        ],
                    14 =>
                        [
                            0  => true,
                            1  => true,
                            2  => false,
                            3  => false,
                            4  => false,
                            5  => false,
                            6  => false,
                            7  => false,
                            8  => false,
                            9  => true,
                            10 => true,
                            11 => true,
                            12 => false,
                            13 => false,
                            14 => false,
                            15 => false,
                        ],
                    15 =>
                        [
                            0  => false,
                            1  => false,
                            2  => false,
                            3  => false,
                            4  => true,
                            5  => false,
                            6  => true,
                            7  => false,
                            8  => false,
                            9  => false,
                            10 => false,
                            11 => false,
                            12 => false,
                            13 => false,
                            14 => true,
                            15 => true,
                        ],
                ],
        ];
        

        $response = $client->request(
            'POST',
            'localhost:8080',
            [
                GuzzleHttp\RequestOptions::JSON => $dataJson
            ]);

        $responseBody = $response->getBody()->getContents();

        $this->assertNotNull($responseBody);

        $data = \json_decode($responseBody, true);

        $this->assertNotNull($data);

        $this->assertNotNull($data['d']['x']);
        $this->assertNotNull($data['d']['y']);

        $values = $data['v'];

        $this->assertEquals(16, count($values));

        $firstRow = $values[0][0];

        $this->assertTrue($firstRow);

        $response = $client->request(
            'POST',
            'localhost:8080',
            [
                GuzzleHttp\RequestOptions::JSON => $data
            ]);

        $responseBody = $response->getBody()->getContents();

        $this->assertNotNull($responseBody);

        $data = \json_decode($responseBody, true);

        $this->assertNotNull($data);

        $this->assertNotNull($data['d']['x']);
        $this->assertNotNull($data['d']['y']);

        $values = $data['v'];

        $this->assertEquals(16, count($values));

        $firstRow = $values[0][0];


        $this->assertFalse($firstRow);

    }
}