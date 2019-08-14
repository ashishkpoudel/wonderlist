<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use Faker\Generator as Faker;
use App\Domain\Users\User;
use App\Domain\Entries\Entry;

$factory->define(Entry::class, function (Faker $faker) {
    return [
        'title' => $faker->title,
        'body' => $faker->text,
    ];
});

$factory->state(Entry::class, 'with_user', function() {
    return [
        'user_id' => factory(User::class)->create()->id,
    ];
});
