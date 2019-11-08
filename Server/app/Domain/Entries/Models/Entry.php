<?php

namespace App\Domain\Entries\Models;

use App\Domain\Tags\Models\Tag;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;
use Akp\Slugify\{HasSlug, SlugBuilder};
use App\Domain\Accounts\Models\User;
use App\Domain\Media\Models\Media;
use App\Domain\Entries\QueryBuilders\EntryQueryBuilder;

class Entry extends Model
{
    use SoftDeletes, HasSlug;

    const TABLE = 'entries';

    protected $table = self::TABLE;

    protected $guarded = [];

    public function excerpt(int $limit = 200): string
    {
        return Str::limit(strip_tags($this->body), $limit);
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function media()
    {
        return $this->morphMany(Media::class, 'subject');
    }

    public function tags()
    {
        return $this->belongsToMany(Tag::class, 'entry_tag');
    }

    public function slugBuilder(): SlugBuilder
    {
        return (new SlugBuilder)
            ->from('title')
            ->to('slug');
    }

    public function newEloquentBuilder($query): EntryQueryBuilder
    {
        return new EntryQueryBuilder($query);
    }
}
