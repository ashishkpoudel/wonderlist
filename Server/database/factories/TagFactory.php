<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Domain\Accounts\Models\User;
use App\Domain\Tags\Models\Tag;
use Faker\Generator as Faker;

$factory->define(Tag::class, function (Faker $faker) {
    return [
        'name' => $faker->word
    ];
});

$factory->state(Tag::class, 'with_user', function() {
    return [
        'user_id' => function() { return factory(User::class)->create()->id; }
    ];
});
