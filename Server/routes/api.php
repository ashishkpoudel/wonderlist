<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\EntryController;
use App\Http\Controllers\MediaController;
use App\Http\Controllers\TagController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('login', [UserController::class, 'login'])->name('users.login');
Route::post('register', [UserController::class, 'register'])->name('users.register');
Route::get('me', [UserController::class, 'me'])->name('users.me');
Route::post('logout', [UserController::class, 'logout'])->name('users.logout');

Route::patch('users/{user}/update-password', [UserController::class, 'updatePassword'])->name('users.updatePassword');
Route::patch('users/{user}/update-profile', [UserController::class, 'updateProfile'])->name('users.updateProfile');

Route::get('entries', [EntryController::class, 'index'])->name('entries.index');
Route::post('entries', [EntryController::class, 'store'])->name('entries.store');
Route::get('entries/{entry}', [EntryController::class, 'show'])->name('entries.show');
Route::patch('entries/{entry}', [EntryController::class, 'update'])->name('entries.update');
Route::put('entries/{entry}/restore', [EntryController::class, 'restore'])->name('entries.restore');
Route::delete('entries/{entry}', [EntryController::class, 'delete'])->name('entries.delete');

Route::get('tags', [TagController::class, 'index'])->name('tags.index');
Route::post('tags', [TagController::class, 'store'])->name('tags.store');
Route::patch('tags/{tag}', [TagController::class, 'update'])->name('tags.update');
Route::delete('tags/{tag}', [TagController::class, 'delete'])->name('tags.delete');

Route::post('media', [MediaController::class, 'store'])->name('media.store');
Route::delete('media/{media}', [MediaController::class, 'delete'])->name('media.delete');
