<?php

namespace App\Domain\Entries\DTO;

use App\Domain\Accounts\Models\User;
use App\Domain\Media\Models\Media;
use App\Domain\Tags\Models\Tag;

class EntryData
{
    public $title;

    public $body;

    public $user;

    /** @var Tag[] */
    public $tags = [];

    /** @var Media[]  */
    public $medias = [];

    public function withTitle(string $title)
    {
        $this->title = $title;
        return $this;
    }

    public function withBody(string $body)
    {
        $this->body = $body;
        return $this;
    }

    public function withUser(User $user)
    {
        $this->user = $user;
        return $this;
    }

    public function withTagIds(array $ids)
    {
        foreach ($ids as $id) {
            if ($tag = Tag::find($id)) {
                $this->tags[] = $tag;
            }
        }

        return $this;
    }

    public function withMediaIds(array $ids)
    {
        foreach ($ids as $id) {
            if ($media = Media::find($id)) {
                $this->medias[] = $media;
            }
        }

        return $this;
    }
}
