<?php

namespace App\Domain\Users\Actions;

use App\Domain\Users\User;

class UnbanUser
{
    public function execute(User $user): bool
    {
        return $user->update(['banned_at' => null]);
    }
}
