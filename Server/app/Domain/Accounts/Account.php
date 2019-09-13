<?php

namespace App\Domain\Accounts;

use Illuminate\Database\Eloquent\Model;

class Account extends Model
{
    const TABLE = 'accounts';

    protected $table = self::TABLE;

    protected $guarded = [];

    public function memberships()
    {
        return $this->hasMany(Membership::class, 'account_id', 'id');
    }
}
