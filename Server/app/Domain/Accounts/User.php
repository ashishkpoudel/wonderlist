<?php

namespace App\Domain\Accounts;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Str;

class User extends Authenticatable
{
    use Notifiable;

    const TABLE = 'users';

    protected $table = self::TABLE;

    protected $guarded = [];

    protected $hidden = [
        'api_token', 'password', 'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

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
