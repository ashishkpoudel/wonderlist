<?php

namespace App\Domain\Accounts;

use Illuminate\Database\Eloquent\Model;

class Membership extends Model
{
    const TABLE = 'memberships';

    protected $table = self::TABLE;

    protected $guarded = [];

    public function account()
    {
        return $this->belongsTo(Account::class, 'account_id', 'id');
    }
}
