<?php

class MySQL implements DB
{
    protected $pdo;

    public function query($query)
    {
        $stmt = $this->pdo->prepare($query);
        $stmt->execute(array_slice(func_get_args(), 1));

        return $stmt;
    }
    // ...
}

$userData = $db->query('SELECT * FROM users WHERE id = ?', $userID)->fetch();
