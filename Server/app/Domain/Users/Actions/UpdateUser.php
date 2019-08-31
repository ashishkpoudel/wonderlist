<?php

namespace App\Domain\Users\Actions;

use App\Domain\Users\User;
use App\Domain\Users\DTO\UserData;

class UpdateUser
{
    public function execute(User $user, UserData $data): User
    {
        $user->name = $data->name;
        $user->email = $data->email;
        if ($data->password) $user->password = $data->password;
        $user->save();

        return $user;
    }
}
