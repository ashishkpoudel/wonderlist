<?php

namespace App\Domain\Entries;

use App\Domain\Entries\Models\EntryModel;

class Entry extends EntryModel
{
    public function scopeOfUser($query, $user)
    {
        return $query->where('user_id', $user->id);
    }
}
