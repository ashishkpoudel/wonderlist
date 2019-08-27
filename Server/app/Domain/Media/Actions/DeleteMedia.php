<?php

namespace App\Domain\Media\Actions;

use App\Domain\Media\Media;

class DeleteMedia
{
    public function execute(Media $media): bool
    {
        return $media->delete();
    }
}
