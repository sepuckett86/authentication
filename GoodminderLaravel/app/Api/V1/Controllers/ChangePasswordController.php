<?php

namespace App\Api\V1\Controllers;

use App\User;
use Auth;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Password;
use App\Api\V1\Requests\ChangePasswordRequest;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Hash;

class ChangePasswordController extends Controller
{
    public function changePassword(ChangePasswordRequest $request)
    {
        $password = Auth::guard()->user()->password;
        $user = User::find(Auth::guard()->user()->id);

        if (Hash::check($request->get('oldPassword'), $password)) {
            //return $request->get('newPassword')." ".Hash::make($request->get('newPassword'));
            //$user->password = Hash::make($request->get('newPassword'));
            //$newPassword = Hash::make($request->get('newPassword'));
            $user->password = $request->get('newPassword');
        } else {
            return response()->json('Old password does not match.', 403);
        }

        if ($user->save()) {
            return 'Password changed successfully.';
        } else {
            return 'Password change failed.';
        }
    }
}
