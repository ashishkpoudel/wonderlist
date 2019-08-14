<?php

namespace App\Domain\Users\Actions;

use App\Domain\Users\{DTO\UserData, User};

class UserRegister
{
    public function execute(UserData $userData): User
    {
        $user = new User();
        $user->name = $userData->name;
        $user->email = $userData->email;
        $user->password = $userData->password;
        $user->generateApiToken();
        $user->save();

        return $user;
    }
}
