<?php

namespace runner;

use PHPUnit\Framework\Constraint\GreaterThan;
use specification\EqualSpecification;
use specification\LowerSpecification;

use specification\OperatorSpecification;
use specification\UpperSpecification;

class Runner
{

    /** @var  OperatorSpecification */
    private $plusSpecification;

    /** @var OperatorSpecification */
    private $plusPlusSpecification;

    public function __construct()
    {
        $this->plusSpecification = new OperatorSpecification('+');
        $this->plusPlusSpecification = new OperatorSpecification('++');

        $this->lower10Specification = new LowerSpecification(10);
        $this->lower20Specification = new LowerSpecification(20);

        $this->greater10Specification = new UpperSpecification(10);
        $this->greater20Specification = new UpperSpecification(20);

        $this->equal20Specification = new EqualSpecification(20);
        $this->equal10Specification = new EqualSpecification(10);

    }


    public function run($what, $argument1, $argument2, $argument3)
    {

        switch ($what) {

            case
                $this->plusPlusSpecification->isSatisfableBy($what) && (
                    $this->greater20Specification->isSatisfableBy($argument1) ||
                    $this->greater20Specification->isSatisfableBy($argument2) ||
                    $this->greater20Specification->isSatisfableBy($argument3)
                )
            :
                $result = 0;
                break;

            case
                $this->plusPlusSpecification->isSatisfableBy($what) &&
                $this->lower10Specification->isSatisfableBy($argument1) &&
                $this->lower10Specification->isSatisfableBy($argument2) &&
                $this->lower10Specification->isSatisfableBy($argument3)
            :
                $result = $argument1 + $argument2 + $argument3;
                break;
            case
                $this->plusPlusSpecification->isSatisfableBy($what) &&

                $this->lower20Specification->isSatisfableBy($argument1) &&
                $this->greater10Specification->isSatisfableBy($argument1) &&

                $this->lower20Specification->isSatisfableBy($argument2) &&
                $this->greater10Specification->isSatisfableBy($argument2) &&

                $this->lower20Specification->isSatisfableBy($argument3) &&
                $this->greater10Specification->isSatisfableBy($argument3)
            :
                $result = $argument1 * $argument2 * $argument3;
                break;
            case '*':
                $result = $argument1 * $argument2 * $argument3;
                break;
            default:
                $result = 0;
                break;
        }

        return $result;

    }
}
