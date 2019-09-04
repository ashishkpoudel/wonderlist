<?php

namespace App\Domain\Media;

use Illuminate\Database\Eloquent\Model;
use App\Domain\Users\User;

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
