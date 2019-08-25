<?php

use Illuminate\Database\Seeder;

use App\Domain\Users\User;
use App\Domain\Entries\Entry;

class EntrySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::all()->each(function($user) {
            factory(Entry::class, 30)->create(['user_id' => $user->id]);
        });
    }
}
