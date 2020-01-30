<?php

class Executor
{
    public function query($query)
    {
        return \array_slice(\func_get_args(), 1);
    }

}

