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
use App\User;
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
        $promptCollection = PromptCollection::where('publicFlag', '=', 1)->get();
        
        $promptCollection = \DB::table('users')
            ->leftJoin('prompt_collections', 'prompt_collections.creator_id', '=', 'users.id')
            ->where('prompt_collections.publicFlag', '=', 1)
            ->get([
                'prompt_collections.id', 'prompt_collections.creator_id',
                'users.nickname', 'prompt_collections.collection', 'prompt_collections.description'
            ]);

        return response()->json($promptCollection);
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
            return 'PromptCollectionID ' . $promptCollection->id . ' created and saved to StoredPromptCollection.';
        } else {
            return 'PromptCollection create and save to StoredPromptCollection failed.';
        }
    }

    /* 
    * Add array of prompts to user's own prompt collection. Verify prompts are
    * owned by user before adding them.
    */
    public function add(PromptRequest $request)
    {
        $currentUser = Auth::guard()->user()->id;
        $promptCollection = $request->get('promptCollectionID');

        if (
            PromptCollection::where('id', '=', $promptCollection)
            ->where('creator_id', '=', $currentUser)
            ->exists()
        ) {
            $usersPromptCollection = PromptCollection::where('id', '=', $promptCollection)
                ->where('creator_id', '=', $currentUser)
                ->get()
                ->toArray();
        } else {
            return "Error: promptCollection isn't the user's.";
        }

        $prompts = explode(',', $request->get('prompts'));
        $usersPrompts = Prompt::where('creator_id', '=', $currentUser)
            ->whereIn('id', $prompts)
            ->get(['id'])
            ->toArray();

        $usersPrompts = array_map(function($value) {
            return $value['id'];
        }, $usersPrompts);

        $usersPromptsCount = count($usersPrompts);
        if ($usersPromptsCount <= 0) {
            return 'Error: None of the prompts can be added.';
        }

        for ($i=0; $i<$usersPromptsCount; $i++) {
            if (
                \DB::table('prompts_prompt_collections')
                    ->where('prompt_id', $usersPrompts[$i])
                    ->where('prompt_collection_id', $promptCollection)
                    ->doesntExist()
            ) {
                \DB::table('prompts_prompt_collections')->insert([
                    'prompt_id' => $usersPrompts[$i],
                    'prompt_collection_id' => $promptCollection
                ]);
            }
        }

        return 'Prompts are in the collection.';
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
