<?php

namespace App\Api\V1\Controllers;

use Symfony\Component\HttpKernel\Exception\HttpException;
use Tymon\JWTAuth\JWTAuth;
use App\Api\V1\Requests\LoginRequest;
use Tymon\JWTAuth\Exceptions\JWTException;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Auth;
use App\Prompt;
use App\Gminder;
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

    /*
    * From stored_prompts table, get creator_id & promptCollection matching user_id.
    * From prompts table, get all the prompt_ids that match the unique combo.
    * Ensure the prompts are public before sending. 
    */
    public function userPrompts()
    {   
        $currentUser = Auth::guard()->user()->id;
        $prompts = Prompt::where('user_id', $currentUser)->get();

        $storedPrompts = \DB::table('prompts')
            ->leftJoin('stored_prompts', function($join)
            {
                $join->on('prompts.user_id', '=', 'stored_prompts.creator_id');
                $join->on('prompts.collection', '=', 'stored_prompts.promptCollection');
            })
            ->where('prompts.publicFlag', '=', 1)
            ->where('stored_prompts.user_id', '=', $currentUser)
            ->get([
                'prompts.id', 'prompts.user_id', 'collection', 'promptText',
                'publicFlag', 'prompts.created_at', 'prompts.updated_at'
            ]);

        return response()->json([
            'user prompts' =>$prompts,
            'stored prompts' => $storedPrompts
            ]);
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
        
        $promptOwnedByUser = $prompt->user_id === Auth::guard()->user()->id;
        
        if ($promptOwnedByUser && $prompt->save()) {
            return 'Prompt updated.';
        } else {
           return 'Prompt update failed.';
        }
    }

    /*
    * Only delete the prompt if no gminder is associated with it. If there is a gminder,
    * (even if it is the creator's) don't delete, but set the prompts.creatorDeleted=1.
    */
    public function destroy($id)
    {
        $currentUser = Auth::guard()->user()->id;
        $prompt = Prompt::find($id);

        // Is the prompt id being used by any gminder,
        // including the user's own gminders?
        $gminders = Gminder::where('prompt_id', '=', $id)->get();

        if (count($gminders) > 0) {
            $prompt->creatorDeleted = 1;
            $prompt->save();
            return 'Prompt used by gminders; set creatorDeleted = 1';
        } 
            
        // Prompt is not being used by any gminder and it is owned
        // by the user. Go ahead and delete it from the prompts table.
        if ($prompt->creator_id === $currentUser) {
            $prompt->delete();
            return 'Prompt deleted.';
        }
        
        return 'Prompt delete failed.';
    }
}
