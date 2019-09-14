<?php

namespace App\Domain\Accounts\Actions;

use App\Domain\Accounts\{DTO\UserData, Models\User};

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
