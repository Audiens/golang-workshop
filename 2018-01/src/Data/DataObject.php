<?php

namespace Data;

class DataObject {

    /** @var  string */
    protected $operator;

    /** @var  int */
    protected $p1;

    /** @var  int */
    protected $p2;

    /** @var  int */
    protected $p3;

    /**
     * @return string
     */
    public function getOperator(): string
    {
        return $this->operator;
    }

    /**
     * @param string $operator
     */
    public function setOperator(string $operator)
    {
        $this->operator = $operator;
    }

    /**
     * @return int
     */
    public function getP1(): int
    {
        return $this->p1;
    }

    /**
     * @param int $p1
     */
    public function setP1(int $p1)
    {
        $this->p1 = $p1;
    }

    /**
     * @return int
     */
    public function getP2(): int
    {
        return $this->p2;
    }

    /**
     * @param int $p2
     */
    public function setP2(int $p2)
    {
        $this->p2 = $p2;
    }

    /**
     * @return int
     */
    public function getP3(): int
    {
        return $this->p3;
    }

    /**
     * @param int $p3
     */
    public function setP3(int $p3)
    {
        $this->p3 = $p3;
    }




}