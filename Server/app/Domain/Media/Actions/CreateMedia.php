<?php

namespace App\Domain\Media\Actions;

use Illuminate\Support\Facades\Storage;
use App\Domain\Media\Media;
use App\Domain\Media\DTO\MediaData;

class CreateMedia
{
    public function execute(MediaData $mediaData): Media
    {
        $media = new Media;
        $media->relative_path = Storage::disk('public')->putFile('media', $mediaData->file);
        $media->mime_type = $mediaData->file->getMimeType();
        $media->extension = $mediaData->file->extension();
        $media->size = $mediaData->file->getSize();
        $media->subject_id = $mediaData->subjectId;
        $media->subject_type = $mediaData->subjectType;
        $media->category = $mediaData->category;
        $media->save();

        return $media;
    }
}
