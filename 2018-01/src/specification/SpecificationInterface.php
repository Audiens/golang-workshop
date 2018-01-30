<?php

namespace specification;

interface SpecificationInterface
{
    public function isSatisfableBy($candidate): bool;


}
