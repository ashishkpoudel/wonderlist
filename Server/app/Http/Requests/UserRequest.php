<?php

namespace App\Http\Requests;

use App\Domain\Users\DTO\UserData;
use App\Domain\Users\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UserRequest extends FormRequest
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
            'email' => ['required', 'email', Rule::unique(User::TABLE, 'email')->ignore(auth()->user()->id)],
            'password' => ['sometimes', 'required', 'min:6'],
        ];
    }

    public function userData(): UserData
    {
        $userData = new UserData;
        $userData->setName($this->get('name'))->setEmail($this->get('email'));
        if ($this->has('password')) $userData->setPassword($this->get('password'));
        return $userData;
    }
}
