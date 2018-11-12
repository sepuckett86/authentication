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
        $currentUser = Auth::guard()->user()->id;
        
        $prompt = new Prompt;
        $promptText = $request->get('promptText');
        $collection = $request->get('collection');

        $prompt->user_id = $currentUser;
        $prompt->promptText = $promptText;
        $prompt->collection = $collection;
        $prompt->save();
        
        if ($prompt->save()) {
            return 'Prompt saved.';
        } else {
            return 'Prompt save failed.';
        }
    }

    public function update(PromptRequest $request, $id)
    { 
        $promptText = $request->get('promptText');

        $currentUser = Auth::guard()->user()->id;

        $prompt = Prompt::find($id);
        $prompt->promptText = $promptText;

        // Can't use strict equality because user_id can be a string or integer.
        $promptOwnedByUser = $prompt->user_id == $currentUser;
        
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
