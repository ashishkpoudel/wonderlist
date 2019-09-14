<?php

namespace App\Domain\Media\Models;

use Illuminate\Database\Eloquent\Model;
use App\Domain\Accounts\Models\User;

class Media extends Model
{
    const TABLE = 'media';

    protected $table = self::TABLE;

    protected $guarded = [];

    public function subject()
    {
        return $this->morphTo();
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
