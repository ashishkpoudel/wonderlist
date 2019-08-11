<?php

namespace App\Domain\Entries;

use Illuminate\Database\Eloquent\Model;
use Akp\Slugify\{HasSlug, SlugBuilder};

class Entry extends Model
{
    use HasSlug;

    const TABLE = 'entries';

    protected $table = self::TABLE;

    protected $guarded = [];

    public function slugBuilder(): SlugBuilder
    {
        return (new SlugBuilder)
            ->from('title')
            ->to('slug');
    }
}
