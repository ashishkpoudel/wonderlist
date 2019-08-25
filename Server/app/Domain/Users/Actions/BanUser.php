<?php

namespace App\Domain\Users\Actions;

use App\Domain\Users\User;
use Carbon\Carbon;

class BanUser
{
    public function execute(User $user): bool
    {
        return $user->update(['banned_at' => Carbon::now()]);
    }
}
