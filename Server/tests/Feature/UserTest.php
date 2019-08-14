<?php

namespace Tests\Feature;

use App\Domain\Users\User;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class UserTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function user_can_login()
    {
        $user = factory(User::class)->create(['password' => bcrypt('12345')]);

        $response = $this->postJson(route('users.login', ['email' => $user->email, 'password' => '12345']))
            ->assertStatus(200)
            ->assertJsonStructure(['api_token']);

        $this->assertDatabaseHas(User::TABLE, [
            'api_token' => $response->decodeResponseJson()['api_token']
        ]);
    }

    /** @test */
    public function guest_can_register_a_user_account()
    {
        $userData = factory(User::class)->make()->toArray();
        $userData['password'] = '123456';
        $userData['password_confirmation'] = '123456';

        $this->postJson(route('users.register'), $userData)
            ->assertStatus(201)
            ->assertJsonStructure(['data']);

        $this->assertDatabaseHas(User::TABLE, [
           'name' => $userData['name'],
           'email' => $userData['email'],
        ]);
    }

    /** @test */
    public function authenticated_user_can_get_their_info()
    {
        $this->signIn();

        $this->getJson(route('users.me'))
            ->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    'id',
                    'name',
                    'email',
                    'created_at',
                    'updated_at',
                ]
            ]);
    }

    /** @test */
    public function authenticated_user_can_logout()
    {
        $this->signIn();

        $this->postJson(route('users.logout'))
            ->assertStatus(200);
    }
}
