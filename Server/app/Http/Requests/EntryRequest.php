<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Domain\Entries\{DTO\EntryData};

class EntryRequest extends FormRequest
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
            'title' => ['required'],
            'body' => ['required'],
            'media_ids' => ['nullable', 'array']
        ];
    }

    public function entryData(): EntryData
    {
        return (new EntryData)
            ->withTitle($this->input('title'))
            ->withBody($this->input('body'))
            ->withUser($this->user())
            ->withTagIds((array) $this->input('tag_ids'))
            ->withMediaIds((array) $this->input('media_ids'));
    }
}
