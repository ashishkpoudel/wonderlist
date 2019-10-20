<?php

use Illuminate\Database\Seeder;
use App\Domain\Tags\Models\Tag;
use App\Domain\Accounts\Models\User;

class TagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::all()->each(function($user){
            factory(Tag::class, 30)->create(['user_id' => $user->id]);
        });
    }
}
