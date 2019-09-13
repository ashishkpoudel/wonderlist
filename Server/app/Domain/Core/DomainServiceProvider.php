<?php

namespace App\Domain\Core;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Gate;

use Illuminate\Database\Eloquent\Relations\Relation;
use App\Domain\Entries\{Policies\AuthEntryPolicy, Entry};
use App\Domain\Accounts\{Policies\AuthUserPolicy, User};
use App\Domain\Media\{Policies\AuthMediaPolicy, Media};

class DomainServiceProvider extends ServiceProvider
{
    protected $policies = [
        Entry::class => AuthEntryPolicy::class,
        User::class => AuthUserPolicy::class,
        Media::class => AuthMediaPolicy::class
    ];

    public function register()
    {
        parent::register();
    }

    public function boot()
    {
        foreach ($this->policies as $model => $policy) {
            Gate::policy($model, $policy);
        }

        Relation::morphMap([
            'entries' => Entry::class,
        ]);
    }
}
