<?php

namespace App\Domain\Users\Actions;

use App\Domain\Users\User;
use App\Domain\Users\DTO\UserData;

class UpdateUserProfile
{
    public function execute(User $user, UserData $userData): User
    {
        $user->name = $userData->name;
        $user->email = $userData->email;
        $user->save();

        return $user;
    }
}
