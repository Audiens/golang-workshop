<?php

namespace specification;

class EqualSpecification implements SpecificationInterface
{
    private $bound;

    public function __construct($bound)
    {
        $this->bound = $bound;
    }

    public function isSatisfableBy($number): bool
    {
        return $number == $this->bound;
    }

}
