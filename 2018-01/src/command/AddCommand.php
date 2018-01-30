<?php

namespace command;


class AddCommand implements CommandInterface
{
    /** @var  MathObject */
    private $mathObject;

    /**
     * AddCommand constructor.
     * @param MathObject $mathLogics
     */
    public function __construct(MathObject $mathLogics)
    {
        $this->mathObject = $mathLogics;
    }

    public function execute(): void
    {
        for ($i = 0; $i < 10; $i++) {
            echo $this->mathObject->add();
        }
    }
}
