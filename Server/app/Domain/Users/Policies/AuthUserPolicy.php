<?php

namespace App\Domain\Users\Policies;

use App\Domain\Users\User;

class AuthUserPolicy
{
    const UPDATE = 'update';

    public function update(User $currentUser, User $user)
    {
        return $currentUser->id === $user->id;
    }
}
