<?php

namespace specification;

class OperatorSpecification implements SpecificationInterface
{
    private $operator;

    public function __construct($operator)
    {
        $this->operator = $operator;
    }

    public function isSatisfableBy($candidate): bool
    {
        return $candidate === $this->operator;
    }

}
