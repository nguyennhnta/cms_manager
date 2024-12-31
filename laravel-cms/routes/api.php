<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;

//Route::get('/user', function (Request $request) {
//    return $request->user();
//})->middleware('auth:sanctum');

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
Route::group(['middleware' => ['auth:api']], function() {
    Route::get('user', [AuthController::class, 'user']);
    Route::resource('products', ProductController::class);
    Route::get('get_user_role', [AuthController::class, 'getUserRoles']);
});

Route::middleware('auth:api')->get('/auth/check-token', function () {
    return response()->json(['is_valid' => true]);
});

//Route::middleware(['role:Admin'])->group(function () {
//    Route::get('/admin', [AdminController::class, 'index']);
//});
Route::get('auth/google', [AuthController::class, 'redirectToGoogle']);
Route::get('auth/google/callback', [AuthController::class, 'handleGoogleCallback']);
