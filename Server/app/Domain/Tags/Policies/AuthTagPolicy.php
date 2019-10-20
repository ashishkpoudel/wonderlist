<?php

namespace App\Domain\Tags\Policies;

use Illuminate\Auth\Access\HandlesAuthorization;
use App\Domain\Tags\Models\Tag;
use App\Domain\Accounts\Models\User;

class AuthTagPolicy
{
    use HandlesAuthorization;

    const CREATE = 'create';
    const UPDATE = 'update';
    const DELETE = 'delete';

    public function create(User $user)
    {
        return true;
    }

    public function update(User $user, Tag $tag)
    {
        return $user->id === (int) $tag->user_id;
    }

    public function delete(User $user, Tag $tag)
    {
        return $user->id === (int) $tag->user_id;
    }
}
