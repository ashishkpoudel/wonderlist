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
        ];
    }

    public function entryData(): EntryData
    {
        return (new EntryData)
            ->setTitle($this->input('title'))
            ->setBody($this->input('body'))
            ->setUser($this->user());
    }
}
