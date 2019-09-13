<?php

use Illuminate\Database\Seeder;

use App\Domain\Accounts\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(User::class, 10)->create();
        factory(User::class)->create(['email' => 'test@wonderlist.app']);
    }
}
