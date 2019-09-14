<?php

namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use App\Domain\Accounts\Models\User;

abstract class TestCase extends BaseTestCase
{
    use CreatesApplication;

    public function signIn(?User $user = null)
    {
        if(null === $user) {
            $user = factory(User::class)->create();
        }

        $this->actingAs($user, 'api');
    }
}
