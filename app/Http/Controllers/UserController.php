<?php

namespace App\Http\Controllers;

use App\Domain\Users\User;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use App\Domain\Users\Requests\UserLoginRequest;
use App\Domain\Users\Requests\UserRegisterRequest;
use App\Domain\Users\Actions\UserLoginAction;
use App\Domain\Users\Actions\UserRegisterAction;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api')->only('me', 'logout');
    }

    public function login(UserLoginRequest $request)
    {
        $user = dispatch_now(new UserLoginAction($request->validated()));

        if (null !== $user) {
            return response(['api_token' => $user->api_token]);
        }
    }

    public function register(UserRegisterRequest $request)
    {
        $user = dispatch_now(new UserRegisterAction($request->validated()));

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
