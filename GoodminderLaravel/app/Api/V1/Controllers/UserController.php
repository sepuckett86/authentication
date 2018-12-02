<?php

namespace App\Api\V1\Controllers;

use Symfony\Component\HttpKernel\Exception\HttpException;
use Tymon\JWTAuth\JWTAuth;
use App\Http\Controllers\Controller;
use App\Api\V1\Requests\LoginRequest;
use App\Api\V1\Requests\UserRequest;
use Tymon\JWTAuth\Exceptions\JWTException;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Auth;
use App\User;

class UserController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('jwt.auth', []);
    }

    /**
     * Get the authenticated User
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json(Auth::guard()->user());
    }

    public function nickname($id)
    {
        return response()->json(User::where('id', '=', $id)->get(['nickname']));
    }

    public function update(UserRequest $request, $id)
    {
        $user = User::find($id);
        $userIsOwnedByUser = $user->id === Auth::guard()->user()->id;

        if ($request->get('name') !== null) {
            $user->name = $request->get('name');
        }

        if ($request->get('nickname') !== null) {
            $user->nickname = $request->get('nickname');
        }

        if ($userIsOwnedByUser && $user->save()) {
            return response()->json([
                'name' => $user->name,
                'nickname' => $user->nickname
            ]);
        } else {
            return "User info update failed.";
        }
    }
}
