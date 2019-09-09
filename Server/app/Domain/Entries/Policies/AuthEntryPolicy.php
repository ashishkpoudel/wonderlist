<?php

namespace App\Domain\Entries\Policies;

use Illuminate\Auth\Access\HandlesAuthorization;
use App\Domain\Entries\Entry;
use App\Domain\Users\User;

class AuthEntryPolicy
{
    use HandlesAuthorization;

    const VIEW = 'view';
    const CREATE = 'create';
    const UPDATE = 'update';
    const DELETE = 'delete';
    const RESTORE = 'restore';

    public function view(User $user, Entry $entry)
    {
        return $user->id === (int) $entry->user_id;
    }

    public function create(User $user)
    {
        return true;
    }

    public function update(User $user, Entry $entry)
    {
        return $user->id === (int) $entry->user_id;
    }

    public function delete(User $user, Entry $entry)
    {
        return $user->id === (int) $entry->user_id;
    }

    public function restore(User $user, Entry $entry)
    {
        return $user->id === (int) $entry->user_id;
    }
}
