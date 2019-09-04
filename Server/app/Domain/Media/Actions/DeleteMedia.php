<?php

namespace App\Domain\Media\Actions;

use Illuminate\Support\Facades\Storage;
use App\Domain\Media\Media;

class DeleteMedia
{
    public function execute(Media $media): bool
    {
        Storage::disk('public')->delete($media->relative_path);
        return $media->delete();
    }
}
