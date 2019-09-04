<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Domain\Media\DTO\MediaData;

class MediaRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'file' => 'required|file',
            'subject_id' => 'required',
            'subject_type' => 'required',
            'category' => 'required',
        ];
    }

    public function mediaData(): MediaData
    {
        return (new MediaData())
            ->setFile($this->file('file'))
            ->setSubjectId($this->get('subject_id'))
            ->setSubjectType($this->get('subject_type'))
            ->setCategory($this->get('category'))
            ->setUser($this->user());
    }
}
