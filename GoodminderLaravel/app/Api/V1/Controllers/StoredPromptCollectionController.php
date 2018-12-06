<?php

namespace App\Api\V1\Controllers;

use Symfony\Component\HttpKernel\Exception\HttpException;
use Tymon\JWTAuth\JWTAuth;
use App\Api\V1\Requests\LoginRequest;
use Tymon\JWTAuth\Exceptions\JWTException;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Auth;
use App\StoredPromptCollection;
use App\Gminder;
use Dingo\Api\Routing\Helpers;
use Illuminate\Routing\Controller;
use App\Api\V1\Requests\PromptRequest;

class StoredPromptCollectionController extends Controller
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


    public function storedPromptCollections()
    {   
        $currentUser = Auth::guard()->user()->id;

        $storedPromptCollections = \DB::table('prompt_collections')
            ->leftJoin('stored_prompt_collections', 'prompt_collections.id', '=', 'stored_prompt_collections.prompt_collection_id')
            ->leftJoin('users', 'prompt_collections.creator_id', '=', 'users.id')
            ->where('stored_prompt_collections.user_id', '=', $currentUser)
            ->get([
                'prompt_collections.id', 'stored_prompt_collections.prompt_collection_id',
                'prompt_collections.creator_id', 'users.nickname', 'prompt_collections.collection',
                'prompt_collections.description', 'stored_prompt_collections.displayFlag',
                'prompt_collections.publicFlag', 'stored_prompt_collections.created_at',
                'stored_prompt_collections.updated_at'
            ]);

        return response()->json($storedPromptCollections);
    }

    public function store(PromptRequest $request)
    {
        $storedPromptCollection = new StoredPromptCollection;
        $storedPromptCollection->user_id = Auth::guard()->user()->id;
        $storedPromptCollection->prompt_collection_id = $request->get('promptCollectionID');
        
        if ($request->get('displayFlag') !== null) {
            $storedPromptCollection->displayFlag = $request->get('displayFlag');
        }
        
        $storedPromptCollection->save();
        
        if ($storedPromptCollection->save()) {
            return 'StoredPromptCollection saved.';
        } else {
            return 'StoredPromptCollection save failed.';
        }
    }

    /* 
     * Set displayFlag.
     */
    public function update(PromptRequest $request, $id)
    { 
        $storedPromptCollection = StoredPromptCollection::find($id);
        
        $storedPromptCollection->displayFlag = $request->get('displayFlag');
         
        $promptOwnedByUser = $storedPromptCollection->user_id === Auth::guard()->user()->id;
        
        if ($promptOwnedByUser && $storedPromptCollection->save()) {
            return 'Stored prompt collection updated.';
        } else {
           return 'Stored prompt collection update failed.';
        }
    }

    /*
    * Delete storedPromptCollection.
    */
    public function destroy($id)
    {
        $currentUser = Auth::guard()->user()->id;
        $storedPromptCollection = StoredPromptCollection::find($id);

        if ($storedPromptCollection->user_id === $currentUser) {
            $storedPromptCollection->delete();
            return 'Stored prompt collection deleted.';
        }
        
        return 'Stored prompt collection delete failed.';
    }
}
