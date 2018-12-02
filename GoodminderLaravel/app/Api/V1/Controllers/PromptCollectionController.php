<?php

namespace App\Api\V1\Controllers;

use Symfony\Component\HttpKernel\Exception\HttpException;
use Tymon\JWTAuth\JWTAuth;
use App\Api\V1\Requests\LoginRequest;
use Tymon\JWTAuth\Exceptions\JWTException;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Auth;
use App\StoredPromptCollection;
use App\PromptCollection;
use App\Prompt;
use Dingo\Api\Routing\Helpers;
use Illuminate\Routing\Controller;
use App\Api\V1\Requests\PromptRequest;

class PromptCollectionController extends Controller
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

    /* 
    * Get all the promptTexts in a public prompt collection.
    */
    public function promptCollection($id)
    {   
        $promptCollection = PromptCollection::where([
            ['id', '=', $id],
            ['publicFlag', '=', 1]
        ])->orWhere([
            ['id', '=', $id],
            ['creator_id', '=', Auth::guard()->user()->id]
        ])->get();

        if (empty(count($promptCollection))) {
            return 'PromptCollection is either not public and/or is not owned by user.';
        }

        $prompts = \DB::table('prompts')
            ->leftJoin('prompts_prompt_collections', 'prompts.id', '=', 'prompts_prompt_collections.prompt_id')
            ->where('prompts_prompt_collections.prompt_collection_id', '=', $id)
            ->get(['prompts.id','prompts.promptText']);
        
        return response()->json($prompts);
    }

    /* 
    * Get public prompt collections, regardless of user.
    */
    public function promptCollections()
    {   
        return response()->json(PromptCollection::where('publicFlag', '=', 1)->get());
    }

    /* 
    * Save a prompt collection as well as put it in the stored prompt collections for user.
    */
    public function store(PromptRequest $request)
    {
        $currentUser = Auth::guard()->user()->id;
        
        $promptCollection = new PromptCollection;
        $promptCollection->creator_id = $currentUser;
        $promptCollection->collection = $request->get('collection');
        $promptCollection->description = $request->get('description');
        if ($request->get('publicFlag') !== null) {
            $promptCollection->publicFlag = $request->get('publicFlag');
        }
        
        $promptCollection->save();

        $storedPromptCollection = new StoredPromptCollection;
        $storedPromptCollection->user_id = $currentUser;
        $storedPromptCollection->displayFlag = 1;
        $storedPromptCollection->prompt_collection_id = $promptCollection->id;

        if ($storedPromptCollection->save()) {
            return 'PromptCollection created and saved to StoredPromptCollection.';
        } else {
            return 'PromptCollection create and save to StoredPromptCollection failed.';
        }
    }

    /* 
     * Update user's own collection.
     */
    public function update(PromptRequest $request, $id)
    { 
        $promptCollection = PromptCollection::find($id);
        $ownedByUser = $promptCollection->creator_id === Auth::guard()->user()->id;

        if (!$ownedByUser) {
            return 'PromptCollection is not owned by user. Update failed.';
        }
        
        if ($request->get('collection') !== null) {
            $promptCollection->collection = $request->get('collection');
        }
        if ($request->get('description') !== null) {
            $promptCollection->description = $request->get('description');
        }
        if ($request->get('publicFlag') !== null) {
            $promptCollection->publicFlag = $request->get('publicFlag');
        }
        
        if ($promptCollection->save()) {
            return 'Prompt collection updated.';
        } else {
           return 'Prompt collection update failed.';
        }
    }

    /*
    * Delete prompt collection as well as entry in stored prompt collection table.
    */
    public function destroy($id)
    {
        $promptCollection = PromptCollection::find($id);
        $currentUser = Auth::guard()->user()->id; 
        $ownedByUser = $currentUser === $promptCollection->creator_id;

        if (!$ownedByUser) {
            return 'Prompt collection is not owned by user; delete failed.';
        }
        
        $storedPromptCollection = StoredPromptCollection::where('prompt_collection_id', '=', $id)
            -> where('stored_prompt_collections.user_id', '=', $currentUser);

        if ($promptCollection->delete() && $storedPromptCollection->delete()) {
            return 'Prompt collection and associated stored prompt collection deleted.';
        }
        
        return 'Prompt collection and associated stored prompt collection deletion failed.';
    }
}