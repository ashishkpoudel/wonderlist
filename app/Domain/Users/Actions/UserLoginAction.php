<?php

namespace App\Domain\Users\Actions;

use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Support\Facades\Auth;

class UserLoginAction
{
    private $attributes;

    public function __construct(array $attributes = [])
    {
        $this->attributes = $attributes;
    }

    public function handle(): ?Authenticatable
    {
        $attempt = Auth::attempt(['email' => $this->attributes['email'], 'password' => $this->attributes['password']]);

        if (true === $attempt) {
            $user = Auth::user();
            $user->generateApiToken();
            return $user;
        }
    }
}
