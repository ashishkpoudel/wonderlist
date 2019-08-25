<?php

namespace App\Domain\Entries\AuthPolicies;

use App\Domain\Entries\Entry;
use App\Domain\Users\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class EntryPolicy
{
    use HandlesAuthorization;

    const VIEW = 'view';
    const CREATE = 'create';
    const UPDATE = 'update';
    const DELETE = 'delete';

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
}
