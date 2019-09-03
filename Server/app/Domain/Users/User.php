<?php

namespace App\Domain\Users;

use Illuminate\Support\Str;
use App\Domain\Users\Models\UserModel;

class User extends UserModel
{
    public function findByEmail(string $email): ?self
    {
        return $this->where('email', $email)->first();
    }

    public function generateApiToken()
    {
        $this->update(['api_token' => hash('sha256', Str::random(60))]);
    }

    public function revokeApiToken()
    {
        $this->update(['api_token' => null]);
    }
}
