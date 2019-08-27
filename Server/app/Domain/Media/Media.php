<?php

namespace App\Domain\Media;

use Illuminate\Database\Eloquent\Model;

class Media extends Model
{
    const TABLE = 'media';

    protected $table = self::TABLE;

    protected $guarded = [];

    public function subject()
    {
        return $this->morphTo();
    }
}
