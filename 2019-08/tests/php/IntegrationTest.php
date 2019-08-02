<?php

namespace Tests;

class IntegrationTest extends \PHPUnit\Framework\TestCase
{

    /**
     * @test
     */
    public function it_works()
    {

        ob_start();
        require_once __DIR__.'/../../src/php/index.php';
        $string = ob_get_contents();
        ob_end_clean();

        self::assertEquals(4700, $string);
    }

    /**
     * @test
     */
    public function daje_carmelito_si_vola()
    {

        ob_start();
        require_once __DIR__.'/../../src/php/index2.php';
        $string = ob_get_contents();
        ob_end_clean();

        self::assertEquals(4702050, $string);
    }

}
