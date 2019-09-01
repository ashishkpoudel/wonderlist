<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Domain\Users\Policies\UserPasswordPolicy;

class UserPasswordRequest extends FormRequest
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
     * @param UserPasswordPolicy $userPasswordPolicy
     * @return array
     */
    public function rules(UserPasswordPolicy $userPasswordPolicy)
    {
        return [
            'password' => ['required', 'min:6', 'confirmed'],
            'password_confirmation' => ['required', 'min:6'],
            'current_password' => ['required', function($attribute, $value, $fail) use ($userPasswordPolicy) {
                if (! $userPasswordPolicy->isValid($this->user(), $this->get('current_password'))) {
                    $fail('The current password is invalid');
                }
            }]
        ];
    }
}
