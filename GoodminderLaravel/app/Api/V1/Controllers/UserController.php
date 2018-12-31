<?php

namespace App\Api\V1\Controllers;

use Symfony\Component\HttpKernel\Exception\HttpException;
use Tymon\JWTAuth\JWTAuth;
use App\Http\Controllers\Controller;
use App\Api\V1\Requests\LoginRequest;
use App\Api\V1\Requests\UserRequest;
use Tymon\JWTAuth\Exceptions\JWTException;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Auth;
use App\User;
use App\Gminder;
use App\StoredPromptCollection;
use App\PromptCollection;
use App\Prompt;
use DB;

class UserController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('jwt.auth', []);
    }

    /**
     * Get the authenticated User
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json(Auth::guard()->user());
    }

    public function nickname($id)
    {
        return response()->json(User::where('id', '=', $id)->get(['nickname']));
    }

    public function update(UserRequest $request, $id)
    {
        $user = User::find($id);
        $userIsOwnedByUser = $user->id === Auth::guard()->user()->id;

        if ($request->get('name') !== null) {
            $user->name = $request->get('name');
        }

        if ($request->get('nickname') !== null) {
            $user->nickname = $request->get('nickname');
        }

        if ($userIsOwnedByUser && $user->save()) {
            return response()->json([
                'name' => $user->name,
                'nickname' => $user->nickname
            ]);
        } else {
            return "User info update failed.";
        }
    }

    /*
    * Delete user from users table, user's goodminders, user's storedPromptCollections,
    * and all user's promptCollections. Finally, delete user's prompts if
    * not being used by anyone, otherwise, set prompt creatorDeleted = 1. For clean up,
    * remove all the deleted prompt_ids from the prompts_prompt_collections table.
    */
    public function destroy($id)
    {
        $userID = (int)Auth::guard()->user()->id;

        if ((int)$id !== $userID) {
            return response()->json('Sorry, must be logged in to account being deleted.');
        }

        User::find($userID)->delete();

        Gminder::where('user_id', '=', $userID)->delete();

        StoredPromptCollection::where('user_id', '=', $userID)->delete();

        $promptCollections = PromptCollection::where('creator_id', '=', $userID);
        $deletedPromptCollectionIDs = array_map(function ($value) {
                return $value['id'];
            }, $promptCollections->get(['id'])->toArray());
        $promptCollections->delete();

        // Determine if prompt_id is found in gminders table.
        $usedPromptIDs = DB::table('gminders')->select('prompt_id')->distinct()
            ->get()->toArray();
        $usedPromptIDs = array_map(function ($value)
            { return $value->prompt_id;}, $usedPromptIDs);
        $prompts = Prompt::whereNotIn('id', $usedPromptIDs);
        $deletedPromptIDs = array_map(function($value) {
                return $value['id'];
            }, $prompts->get(['id'])->toArray());
        $prompts->delete();
        Prompt::whereIn('id', $usedPromptIDs)->update(['creatorDeleted' => 1]);

        // Clean up prompts_prompt_collections table
        DB::table('prompts_prompt_collections')
            ->whereIn('prompt_id', $deletedPromptIDs)
            ->orWhereIn('prompt_collection_id', $deletedPromptCollectionIDs)
            ->delete();

        return response("Deleted userID $userID and associated with the user, the gminders, promptCollections, storedPromptCollections, prompts not used for other users' gminders, and prompts_prompt_collections. Also updated creatorDeleted = 1 for prompts being used by other users' gminders.");
    }
}
