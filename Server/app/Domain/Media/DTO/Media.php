<?php

namespace App\Domain\Media\DTO;

use Illuminate\Http\UploadedFile;

class MediaData
{
    public $file;

    public $subjectId;

    public $subjectType;

    public function setFile(UploadedFile $file)
    {
        $this->file = $file;
        return $this;
    }

    public function setSubjectId(int $subjectId)
    {
        $this->subjectId = $subjectId;
        return $this;
    }

    public function setSubjectType(string $subjectType)
    {
        $this->subjectType = $subjectType;
        return $this;
    }
}
