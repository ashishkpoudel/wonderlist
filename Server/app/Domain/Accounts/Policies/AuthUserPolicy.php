<?php

namespace App\Domain\Accounts\Policies;

use App\Domain\Accounts\User;

class AuthUserPolicy
{
    const UPDATE = 'update';

    public function update(User $currentUser, User $user)
    {
        return $currentUser->id === $user->id;
    }
}
