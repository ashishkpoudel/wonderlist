<?php

namespace App\Domain\Entries;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Akp\Slugify\{HasSlug, SlugBuilder};
use App\Domain\Users\User;

class Entry extends Model
{
    use HasSlug;

    const TABLE = 'entries';

    protected $table = self::TABLE;

    protected $guarded = [];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function scopeUser(Builder $builder, User $user)
    {
        return $builder->where('user_id', $user->id);
    }

    public function slugBuilder(): SlugBuilder
    {
        return (new SlugBuilder)
            ->from('title')
            ->to('slug');
    }
}
