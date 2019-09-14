<?php

namespace App\Domain\Accounts\Actions;

use App\Domain\Accounts\Models\User;

class UnbanUser
{
    public function execute(User $user): bool
    {
        return $user->update(['banned_at' => null]);
    }
}
