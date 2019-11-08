<?php

namespace App\Domain\Entries\QueryBuilders;

use Illuminate\Database\Eloquent\Builder;
use App\Domain\Accounts\Models\User;

class EntryQueryBuilder extends Builder
{
    public function ofUser(User $user): self
    {
        return $this->where('user_id', $user->id);
    }
}
