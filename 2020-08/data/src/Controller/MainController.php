<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class MainController
{
    /**
     * @Route("/", name="app_lucky_number")
     */
    public function number()
    {
        $number = \random_int(0, 99999);

        return new Response(
            '<html><body>Lucky number: '.$number.'</body></html>'
        );
    }
}