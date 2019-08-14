<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\UserLoginRequest;
use App\Http\Requests\UserRegisterRequest;
use App\Http\Resources\UserResource;
use App\Domain\Users\Actions\UserLogin;
use App\Domain\Users\Actions\UserRegister;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api')->only('me', 'logout');
    }

    public function login(UserLoginRequest $request)
    {
        $user = (new UserLogin)->execute($request->userData());

        if (null !== $user) {
            return response(['api_token' => $user->api_token]);
        }
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
