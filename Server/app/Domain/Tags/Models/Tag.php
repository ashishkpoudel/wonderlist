<?php

namespace App\Domain\Tags\Models;

use Illuminate\Database\Eloquent\Model;
use App\Domain\Accounts\Models\User;

class Tag extends Model
{
    const TABLE = 'tags';

    protected $table = self::TABLE;

    protected $guarded = [];

    public function scopeOfUser($query, $user)
    {
        return $query->where('user_id', $user->id);
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
