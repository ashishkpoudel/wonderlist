<?php

namespace App\Domain\Media\Policies;

use Illuminate\Auth\Access\HandlesAuthorization;
use App\Domain\Media\Models\Media;
use App\Domain\Accounts\Models\User;

class AuthMediaPolicy
{
    use HandlesAuthorization;

    const CREATE = 'create';
    const DELETE = 'delete';

    public function create(User $user, Media $media)
    {
        return $user->id === $media->user->id;
    }

    public function delete(User $user, Media $media)
    {
        return $user->id === $media->user->id;
    }
}
