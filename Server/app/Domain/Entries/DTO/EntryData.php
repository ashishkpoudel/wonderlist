<?php

namespace App\Domain\Entries\DTO;

use App\Domain\Users\User;

class EntryData
{
    public $title;

    public $body;

    public $user;

    public function setTitle(string $title)
    {
        $this->title = $title;
        return $this;
    }

    public function setBody(string $body)
    {
        $this->body = $body;
        return $this;
    }

    public function setUser(User $user)
    {
        $this->user = $user;
        return $this;
    }
}
