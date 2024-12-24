<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PostController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
Route::group(['middleware' => ['auth:api']], function() {
    Route::post('user', [AuthController::class, 'user']);
    Route::resource('posts', PostController::class);
});

Route::middleware('auth:api')->get('/auth/check-token', function () {
    return response()->json(['is_valid' => true]);
});

//Route::middleware(['role:Admin'])->group(function () {
//    Route::get('/admin', [AdminController::class, 'index']);
//});
