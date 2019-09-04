<?php

namespace App\Providers;

use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use App\Domain\Entries\{Policies\AuthEntryPolicy, Entry};
use App\Domain\Users\{Policies\AuthUserPolicy, User};
use App\Domain\Media\{Policies\AuthMediaPolicy, Media};

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        Entry::class => AuthEntryPolicy::class,
        User::class => AuthUserPolicy::class,
        Media::class => AuthMediaPolicy::class
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        //
    }
}
