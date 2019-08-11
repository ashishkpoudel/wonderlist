<?php

namespace App\Domain\Users\Actions;

use App\Domain\Users\User;

class UserRegisterAction
{
    private $attributes;

    public function __construct(array $attributes = [])
    {
        $this->attributes = $attributes;
    }

    public function handle(): User
    {
        $user = new User();
        $user->name = $this->attributes['name'];
        $user->email = $this->attributes['email'];
        $user->password = $this->attributes['password'];
        $user->generateApiToken();
        $user->save();

        return $user;
    }
}
