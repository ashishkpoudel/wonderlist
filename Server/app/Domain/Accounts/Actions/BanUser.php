<?php

namespace App\Domain\Accounts\Actions;

use App\Domain\Accounts\Models\User;
use Carbon\Carbon;

class BanUser
{
    public function execute(User $user): bool
    {
        return $user->update(['banned_at' => Carbon::now()]);
    }
}
