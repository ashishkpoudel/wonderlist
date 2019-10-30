<?php

namespace App\Domain\Accounts\DTO;

class UserData
{
    public $name;

    public $email;

    public $password;

    public function withName(string $name)
    {
        $this->name = $name;
        return $this;
    }

    public function withEmail(string $email)
    {
        $this->email = $email;
        return $this;
    }

    public function withPassword(string $password)
    {
        $this->password = $password;
        return $this;
    }
}
