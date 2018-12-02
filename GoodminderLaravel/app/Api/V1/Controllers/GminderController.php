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
use DB;

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
            
        $gminders = DB::table('gminders')
            ->leftJoin('prompts', 'gminders.prompt_id', '=', 'prompts.id')
            ->where('gminders.id', '=', $id)
            ->where('gminders.user_id', '=', $currentUser)
            ->select('gminders.*', 'prompts.promptText')
            ->get();

        return response()->json($gminders);
    }

    public function userGminders()
    {   
        $currentUser = Auth::guard()->user()->id;

        $gminders = DB::table('gminders')
            ->leftJoin('prompts', 'gminders.prompt_id', 'prompts.id')
            ->where('gminders.user_id', '=', $currentUser)
            ->select('gminders.*', 'prompts.promptText')
            ->get();

        return response()->json($gminders);
    }

    public function store(GminderRequest $request)
    {
        $gminder = new Gminder;
        $gminder->user_id = Auth::guard()->user()->id;
        $gminder->category = $request->get('category');

        if ($request->get('mainResponse') !== null) {
            $gminder->mainResponse = $request->get('mainResponse');
        }
        if ($request->get('author') !== null) {
            $gminder->author = $request->get('author');
        }
        if ($request->get('prompt_id') !== null) {
            $gminder->prompt_id = $request->get('prompt_id');
        }
        if ($request->get('reason') !== null) {
            $gminder->reason = $request->get('reason');
        }
        if ($request->get('source') !== null) {
            $gminder->source = $request->get('source');
        }
        if ($request->get('who') !== null) {
            $gminder->who = $request->get('who');
        }
        if ($request->get('rating') !== null) {
            $gminder->rating = $request->get('rating');
        }
        if ($request->get('eventDate') !== null) {
            $gminder->eventDate = $request->get('eventDate');
        }
        if ($request->get('collection') !== null) {
            $gminder->collection = $request->get('collection');
        }
        if ($request->get('publicFlag') !== null) {
            $gminder->publicFlag = $request->get('publicFlag');
        }
                
        if ($gminder->save()) {
            return 'Gminder saved.';
        } else {
            return 'Gminder save failed.';
        }
    }

    public function update(GminderRequest $request, $id)
    { 
        $currentUser = Auth::guard()->user()->id;
        $gminder = Gminder::find($id);

        if ($request->get('category') !== null) {
            $gminder->category = $request->get('category');
        }
        if ($request->get('mainResponse') !== null) {
            $gminder->mainResponse = $request->get('mainResponse');
        }
        if ($request->get('author') !== null) {
            $gminder->author = $request->get('author');
        }
        if ($request->get('prompt_id') !== null) {
            $gminder->prompt_id = $request->get('prompt_id');
        }
        if ($request->get('reason') !== null) {
            $gminder->reason = $request->get('reason');
        }
        if ($request->get('source') !== null) {
            $gminder->source = $request->get('source');
        }
        if ($request->get('who') !== null) {
            $gminder->who = $request->get('who');
        }
        if ($request->get('rating') !== null) {
            $gminder->rating = $request->get('rating');
        }
        if ($request->get('eventDate') !== null) {
            $gminder->eventDate = $request->get('eventDate');
        }
        if ($request->get('collection') !== null) {
            $gminder->collection = $request->get('collection');
        }
        if ($request->get('publicFlag') !== null) {
            $gminder->publicFlag = $request->get('publicFlag');
        }

        // User_id may be a string or integer.
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
