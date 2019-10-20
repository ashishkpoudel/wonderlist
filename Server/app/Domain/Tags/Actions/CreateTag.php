<?php

namespace App\Domain\Tags\Actions;

use App\Domain\Tags\DTO\TagData;
use App\Domain\Tags\Models\Tag;

class CreateTag
{
    public function execute(TagData $tagData): Tag
    {
        $tag = new Tag;
        $tag->name = $tagData->name;
        $tag->user()->associate($tagData->user);
        $tag->save();

        return $tag;
    }
}
