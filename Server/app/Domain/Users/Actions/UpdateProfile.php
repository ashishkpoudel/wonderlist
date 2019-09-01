<?php

namespace App\Domain\Users\Actions;

use App\Domain\Users\User;
use App\Domain\Users\DTO\UserData;

class UpdateProfile
{
    public function execute(User $user, UserData $data): User
    {
        $user->name = $data->name;
        $user->email = $data->email;
        $user->save();

        return $user;
    }
}
