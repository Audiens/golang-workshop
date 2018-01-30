<?php
namespace handler;

use Data\DataObject;

abstract class Handler
{
    /**
     * @var Handler|null
     */
    private $successor = null;

    public function __construct(Handler $handler = null)
    {
        $this->successor = $handler;
    }

    public function handle(DataObject $data)
    {
        $processed = $this->processing($data);

        if ($processed === null) {
            if ($this->successor !== null) {
                $processed = $this->successor->handle($data);
            }
        }

        return $processed;
    }

    abstract protected function processing(DataObject $data);
}
