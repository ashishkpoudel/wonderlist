<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\UserLoginRequest;
use App\Http\Requests\UserRegisterRequest;
use App\Http\Requests\UserRequest;
use App\Http\Resources\UserResource;
use App\Domain\Users\Actions\UserLogin;
use App\Domain\Users\Actions\UserRegister;
use App\Domain\Users\AuthPolicy\UserPolicy;
use App\Domain\Users\Policies\UserPasswordPolicy;
use App\Domain\Users\Actions\UpdateUser;
use App\Domain\Users\User;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api')->only('update', 'me', 'logout');
    }

    public function update($id, UserRequest $request, UpdateUser $updateUser,  UserPasswordPolicy $userPasswordPolicy)
    {
        $user = User::findOrFail($id);

        $this->authorize(UserPolicy::UPDATE, $user);

        if ($userPasswordPolicy->isValid($user, $request->get('current_password'))) {
            abort(400);
        }

        $updatedUser = $updateUser->execute($user, $request->userData());

        return UserResource::make($updatedUser);
    }

    public function login(UserLoginRequest $request)
    {
        $user = (new UserLogin)->execute($request->userData());

        if (null !== $user) {
            return response(['api_token' => $user->api_token]);
        }

        return response(null, 401);
    }

    public function register(UserRegisterRequest $request, UserRegister $userRegister)
    {
        $user = $userRegister->execute($request->userData());

        return UserResource::make($user);
    }

    public function me(Request $request)
    {
        return UserResource::make($request->user());
    }

    public function logout(Request $request)
    {
        $request->user()->revokeApiToken();
    }
}
