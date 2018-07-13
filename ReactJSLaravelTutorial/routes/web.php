<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('app');
});

// This is essential to allow React Router to work
// But it creates a DevTools console error.
// require('./bootstrap'); leads to this error in app.js
Route::get( '/{path?}', function(){
    return view( 'app' );
} )->where('path', '.*');
