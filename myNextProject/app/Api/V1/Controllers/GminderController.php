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

    public function userGminders()
    {   
        $currentUser = Auth::guard()->user()->id;

        $gminders = Gminder::where('user_id', '=', $currentUser)->get();
        return response()->json($gminders);
    }

    public function store(GminderRequest $request)
    {
        $currentUser = Auth::guard()->user()->id;
        
        $gminder = new Gminder;
        $mainResponse = $request->get('mainResponse');

        $gminder->user_id = $currentUser;
        $gminder->mainResponse = $mainResponse;
        $gminder->save();
        
        if ($gminder->save()) {
            return 'Gminder saved.';
        } else {
            return 'Gminder save failed.';
        }
    }

    public function destroy(GminderRequest $request)
    {
        $gminderToDelete = $request->get('id');

        $currentUser = Auth::guard()->user()->id;
        $gminder = Gminder::where('user_id', $currentUser)
            ->where('id', $gminderToDelete);
        
            if ($gminder->delete()) {
                return 'Gminder deleted.';
            } else {
                return 'Gminder delete failed.';
            }
    }
}
