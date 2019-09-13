<?php

namespace App\Domain\Accounts\Actions;

use App\Domain\Accounts\User;
use Illuminate\Support\Facades\Hash;

class UpdateUserPassword
{
    public function execute(User $user, string $password): User
    {
        if ($password) $user->password = Hash::make($password);
        $user->save();
        return $user;
    }
}
