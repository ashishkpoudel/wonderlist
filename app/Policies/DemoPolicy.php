<?php

namespace App\Policies;

use App\Domain\Users\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class DemoPolicy
{
    use HandlesAuthorization;

    /**
     * Create a new policy instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }
}
