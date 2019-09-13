<?php

namespace App\Domain\Accounts\Policies;

use App\Domain\Accounts\User;
use Illuminate\Support\Facades\Hash;

class UserPasswordPolicy
{
    public function isValid(User $user, string $password): bool
    {
        return Hash::check($password, $user->password);
    }
}
