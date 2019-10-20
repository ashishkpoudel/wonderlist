<?php

namespace App\Domain\Tags\Actions;

use App\Domain\Tags\Models\Tag;

class DeleteTag
{
    public function execute(Tag $tag): bool
    {
        return $tag->delete();
    }
}
