<?php

namespace Tests\Feature;

use Illuminate\Support\Facades\Hash;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Domain\Accounts\User;

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
    public function user_can_update_their_password()
    {
        $user = factory(User::class)->create();

        $this->signIn($user);

        $data = [
            'password' => '123456',
            'password_confirmation' => '123456',
            'current_password' => 'password'
        ];

        $this->patchJson(route('users.updatePassword', $user->id), $data)
            ->assertStatus(200);

        $user->refresh();

        $this->assertTrue(Hash::check($data['password'], $user->password));
    }

    /** @test */
    public function user_can_update_their_profile()
    {
        $user = factory(User::class)->create();

        $this->signIn($user);

        $data = [
            'name' => 'Ashish K. Poudel',
            'email' => 'test@new.com'
        ];

        $this->patchJson(route('users.updateProfile', $user->id), $data)
            ->assertStatus(200);

        $this->assertDatabaseHas(User::TABLE, $data);
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
