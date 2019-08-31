<?php

namespace App\Domain\Users\AuthPolicy;

use App\Domain\Users\User;

class UserPolicy
{
    const UPDATE = 'update';

    public function update(User $currentUser, User $user)
    {
        return $currentUser->id === $user->id;
    }
}
