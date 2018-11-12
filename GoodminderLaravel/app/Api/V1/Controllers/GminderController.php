<?php

namespace App\Api\V1\Controllers;

use Symfony\Component\HttpKernel\Exception\HttpException;
use Tymon\JWTAuth\JWTAuth;
use App\Api\V1\Requests\LoginRequest;
use Tymon\JWTAuth\Exceptions\JWTException;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Auth;
use App\Gminder;
use Dingo\Api\Routing\Helpers;
use Illuminate\Routing\Controller;
use App\Api\V1\Requests\GminderRequest;

class GminderController extends Controller
{
    use Helpers;
   
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('jwt.auth', []);
    }

    public function userGminder($id)
    {   
        $currentUser = Auth::guard()->user()->id;

        $gminders = Gminder::where('user_id', $currentUser)
            ->where('id', $id)
            ->get();

        return response()->json($gminders);
    }

    public function userGminders()
    {   
        $currentUser = Auth::guard()->user()->id;

        $gminders = Gminder::where('user_id', $currentUser)->get();

        return response()->json($gminders);
    }

    public function store(GminderRequest $request)
    {
        $currentUser = Auth::guard()->user()->id;
        
        $gminder = new Gminder;
        $mainResponse = $request->get('mainResponse');
        $category = $request->get('category');

        $gminder->user_id = $currentUser;
        $gminder->mainResponse = $mainResponse;
        $gminder->category = $category;
        $gminder->save();
        
        if ($gminder->save()) {
            return 'Gminder saved.';
        } else {
            return 'Gminder save failed.';
        }
    }

    public function update(GminderRequest $request, $id)
    { 
        $mainResponse = $request->get('mainResponse');

        $currentUser = Auth::guard()->user()->id;

        $gminder = Gminder::find($id);
        $gminder->mainResponse = $mainResponse;

        // Can't use strict equality because user_id can be a string or integer.
        $gminderOwnedByUser = $gminder->user_id == $currentUser;
        
        if ($gminderOwnedByUser && $gminder->save()) {
            return 'Gminder updated.';
        } else {
           return 'Gminder update failed.';
        }
    }

    public function destroy($id)
    {
        $currentUser = Auth::guard()->user()->id;
        $gminder = Gminder::where('user_id', $currentUser)
            ->where('id', $id);
        
            if ($gminder->delete()) {
                return 'Gminder deleted.';
            } else {
                return 'Gminder delete failed.';
            }
    }
}
