<?php

namespace App\Domain\Users\Models;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class UserModel extends Authenticatable
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

}
