<?php

namespace App\Domain\Tags\DTO;

use App\Domain\Accounts\Models\User;

class TagData
{
    /** @var User */
    public $user;

    public $name;

    public function withUser(User $user)
    {
        $this->user = $user;
        return $this;
    }

    public function withName(string $name)
    {
        $this->name = $name;
        return $this;
    }
}
