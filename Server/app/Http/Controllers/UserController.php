<?php

namespace App\Http\Controllers;

use App\Domain\Users\Actions\UpdateUserPassword;
use App\Domain\Users\Actions\UpdateUserProfile;
use App\Http\Requests\UserPasswordRequest;
use Illuminate\Http\Request;
use App\Http\Requests\UserLoginRequest;
use App\Http\Requests\UserRegisterRequest;
use App\Http\Requests\UserProfileRequest;
use App\Http\Resources\UserResource;
use App\Domain\Users\Actions\UserLogin;
use App\Domain\Users\Actions\UserRegister;
use App\Domain\Users\AuthPolicy\UserPolicy;
use App\Domain\Users\User;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api')->only('update', 'me', 'logout', 'updateProfile', 'updatePassword');
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

    public function updatePassword($id, UserPasswordRequest $request, UpdateUserPassword $updateUserPassword)
    {
        $user = User::findOrFail($id);

        $this->authorize(UserPolicy::UPDATE, $user);

        $updatedUser = $updateUserPassword->execute($user, $request->get('password'));

        return UserResource::make($updatedUser);
    }

    public function updateProfile($id, UserProfileRequest $userProfileRequest, UpdateUserProfile $updateUserProfile)
    {
        $user = User::findOrFail($id);

        $this->authorize(UserPolicy::UPDATE, $user);

        $updated = $updateUserProfile->execute($user, $userProfileRequest->userData());

        return UserResource::make($updated);
    }

    public function logout(Request $request)
    {
        $request->user()->revokeApiToken();
    }
}
