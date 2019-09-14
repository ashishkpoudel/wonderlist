<?php

namespace App\Http\Requests;

use App\Domain\Accounts\DTO\UserData;
use App\Domain\Accounts\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UserProfileRequest extends FormRequest
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
            'name' => ['required', 'min:3'],
            'email' => ['required', 'email', Rule::unique(User::TABLE, 'email')->ignore($this->user()->id)],
        ];
    }

    public function userData(): UserData
    {
        return (new UserData)
            ->setName($this->get('name'))
            ->setEmail($this->get('email'));
    }
}
