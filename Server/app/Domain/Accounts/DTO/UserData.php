<?php

namespace App\Domain\Accounts\DTO;

use App\Domain\Accounts\Models\Account;

class UserData
{
    public $name;

    public $email;

    public $password;

    public function setName(string $name)
    {
        $this->name = $name;
        return $this;
    }

    public function setEmail(string $email)
    {
        $this->email = $email;
        return $this;
    }

    public function setPassword(string $password)
    {
        $this->password = $password;
        return $this;
    }
}
