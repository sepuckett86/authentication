<?php

namespace App\Api\V1\Controllers;

use Symfony\Component\HttpKernel\Exception\HttpException;
use Tymon\JWTAuth\JWTAuth;
use App\Api\V1\Requests\LoginRequest;
use Tymon\JWTAuth\Exceptions\JWTException;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Auth;
use App\Prompt;
use Dingo\Api\Routing\Helpers;
use Illuminate\Routing\Controller;
use App\Api\V1\Requests\PromptRequest;

class PromptController extends Controller
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

    public function userPrompt($id)
    {   
        $currentUser = Auth::guard()->user()->id;

        $prompts = Prompt::where('user_id', $currentUser)
            ->where('id', $id)
            ->get();

        return response()->json($prompts);
    }

    public function userPrompts()
    {   
        $currentUser = Auth::guard()->user()->id;

        $prompts = Prompt::where('user_id', $currentUser)->get();

        return response()->json($prompts);
    }

    public function store(PromptRequest $request)
    {
        $prompt = new Prompt;
        $prompt->user_id = Auth::guard()->user()->id;
        $prompt->collection = $request->get('collection');
        $prompt->promptText = $request->get('promptText');

        if ($request->get('publicFlag') !== null) {
            $prompt->publicFlag = $request->get('publicFlag');
        }

        $prompt->save();
        
        if ($prompt->save()) {
            return 'Prompt saved.';
        } else {
            return 'Prompt save failed.';
        }
    }

    public function update(PromptRequest $request, $id)
    { 
        $prompt = Prompt::find($id);
        if ($request->get('collection') !== null) {
            $prompt->collection = $request->get('collection');
        }

        if ($request->get('promptText') !== null) {
            $prompt->promptText = $request->get('promptText');
        }

        if ($request->get('publicFlag') !== null) {
            $prompt->publicFlag = $request->get('publicFlag');
        }

        // User_id may be a string or integer.
        $promptOwnedByUser = $prompt->user_id == Auth::guard()->user()->id;
        
        if ($promptOwnedByUser && $prompt->save()) {
            return 'Prompt updated.';
        } else {
           return 'Prompt update failed.';
        }
    }

    public function destroy($id)
    {
        $currentUser = Auth::guard()->user()->id;
        $prompt = Prompt::where('user_id', $currentUser)
            ->where('id', $id);
        
            if ($prompt->delete()) {
                return 'Prompt deleted.';
            } else {
                return 'Prompt delete failed.';
            }
    }
}
