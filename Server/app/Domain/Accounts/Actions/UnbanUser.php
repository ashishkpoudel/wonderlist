<?php

namespace App\Domain\Accounts\Actions;

use App\Domain\Accounts\User;

class UnbanUser
{
    public function execute(User $user): bool
    {
        return $user->update(['banned_at' => null]);
    }
}
