<?php

namespace App\Domain\Users\Policies;

use App\Domain\Users\User;
use Illuminate\Support\Facades\Hash;

class UserPasswordPolicy
{
    public function isValid(User $user, string $password): bool
    {
        return Hash::check($password, $user->password);
    }
}
