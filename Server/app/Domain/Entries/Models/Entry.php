<?php

namespace App\Domain\Entries\Models;

use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;
use Akp\Slugify\{HasSlug, SlugBuilder};
use App\Domain\Accounts\Models\User;

class Entry extends Model
{
    use SoftDeletes, HasSlug;

    const TABLE = 'entries';

    protected $table = self::TABLE;

    protected $guarded = [];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function scopeOfUser($query, $user)
    {
        return $query->where('user_id', $user->id);
    }

    public function slugBuilder(): SlugBuilder
    {
        return (new SlugBuilder)
            ->from('title')
            ->to('slug');
    }
}
