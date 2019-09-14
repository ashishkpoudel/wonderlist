<?php

namespace App\Domain\Accounts\Actions;

use App\Domain\Accounts\Models\User;
use App\Domain\Accounts\DTO\UserData;

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
