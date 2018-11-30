<?php

use Dingo\Api\Routing\Router;

/** @var Router $api */
$api = app(Router::class);

$api->version('v1', function (Router $api) {
    $api->group(['prefix' => 'auth'], function(Router $api) {
        $api->post('signup', 'App\\Api\\V1\\Controllers\\SignUpController@signUp');
        $api->post('login', 'App\\Api\\V1\\Controllers\\LoginController@login');

        $api->post('recovery', 'App\\Api\\V1\\Controllers\\ForgotPasswordController@sendResetEmail');
        $api->post('reset', 'App\\Api\\V1\\Controllers\\ResetPasswordController@resetPassword');

        $api->post('logout', 'App\\Api\\V1\\Controllers\\LogoutController@logout');
        $api->post('refresh', 'App\\Api\\V1\\Controllers\\RefreshController@refresh');
        $api->get('me', 'App\\Api\\V1\\Controllers\\UserController@me');
    });

    $api->group(['middleware' => 'jwt.auth'], function(Router $api) {
        $api->get('protected', function() {
            return response()->json([
                'message' => 'Access to protected resources granted! You are seeing this text as you provided the token correctly.'
            ]);
        });
            
        $api->get('gminders/{id}', 'App\\Api\\V1\\Controllers\\GminderController@userGminder');
        $api->post('gminders', 'App\\Api\\V1\\Controllers\\GminderController@store');
        $api->put('gminders/{id}', 'App\\Api\\V1\\Controllers\\GminderController@update');
        $api->delete('gminders/{id}', 'App\\Api\\V1\\Controllers\\GminderController@destroy');
        $api->get('gminders', 'App\\Api\\V1\\Controllers\\GminderController@userGminders');
        
        $api->get('prompts/{id}', 'App\\Api\\V1\\Controllers\\PromptController@userPrompt');
        $api->post('prompts', 'App\\Api\\V1\\Controllers\\PromptController@store');
        $api->put('prompts/{id}', 'App\\Api\\V1\\Controllers\\PromptController@update');
        $api->delete('prompts/{id}', 'App\\Api\\V1\\Controllers\\PromptController@destroy');
        $api->get('prompts', 'App\\Api\\V1\\Controllers\\PromptController@userPrompts');

        $api->get('users/{id}', 'App\\Api\\V1\\Controllers\\UserController@nickname');

        $api->get('storedPromptCollections', 'App\\Api\\V1\\Controllers\\StoredPromptCollectionController@storedPromptCollections');
        $api->post('storedPromptCollections', 'App\\Api\\V1\\Controllers\\StoredPromptCollectionController@store');
        $api->put('storedPromptCollections/{id}', 'App\\Api\\V1\\Controllers\\StoredPromptCollectionController@update');
        $api->delete('storedPromptCollections/{id}', 'App\\Api\\V1\\Controllers\\StoredPromptCollectionController@destroy');

        $api->get('refresh', [
            'middleware' => 'jwt.refresh',
            function() {
                return response()->json([
                    'message' => 'By accessing this endpoint, you can refresh your access token at each request. Check out this response headers!'
                    ]);
                }
        ]);
    });
});

