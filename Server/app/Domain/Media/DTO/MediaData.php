<?php

namespace App\Domain\Media\DTO;

use Illuminate\Http\UploadedFile;
use App\Domain\Accounts\Models\User;

class MediaData
{
    /** @var UploadedFile */
    public $file;

    public $subjectId;

    public $subjectType;

    public $category;

    /** @var User */
    public $user;

    public function withFile(UploadedFile $file)
    {
        $this->file = $file;
        return $this;
    }

    public function withSubjectId(int $subjectId)
    {
        $this->subjectId = $subjectId;
        return $this;
    }

    public function withSubjectType(string $subjectType)
    {
        $this->subjectType = $subjectType;
        return $this;
    }

    public function withCategory(string $category)
    {
        $this->category = $category;
        return $this;
    }

    public function withUser(User $user)
    {
        $this->user = $user;
        return $this;
    }
}
