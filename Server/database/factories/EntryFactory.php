<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use Faker\Generator as Faker;
use App\Domain\Accounts\Models\User;
use App\Domain\Entries\Models\Entry;

$factory->define(Entry::class, function (Faker $faker) {
    return [
        'title' => $faker->sentence,
        'body' => $faker->text(250),
    ];
});

$factory->state(Entry::class, 'with_user', function() {
    return [
        'user_id' => factory(User::class)->create()->id
    ];
});
