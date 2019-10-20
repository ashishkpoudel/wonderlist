<?php

namespace App\Domain\Tags\Actions;

use App\Domain\Tags\DTO\TagData;
use App\Domain\Tags\Models\Tag;

class UpdateTag
{
    public function execute(Tag $tag, TagData $tagData): Tag
    {
        $tag->name = $tagData->name;
        $tag->save();

        return $tag;
    }
}
