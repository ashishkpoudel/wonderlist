<?php

namespace App\Domain\Users\Actions;

use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Support\Facades\Auth;
use App\Domain\Users\DTO\UserData;

class UserLogin
{
    public function execute(UserData $userData): ?Authenticatable
    {
        $attempt = Auth::attempt(['email' => $userData->email, 'password' => $userData->password]);

        if (true=== $attempt) {
            $user = Auth::user();
            $user->generateApiToken();
            return $user;
        }

        return null;
    }
}
