<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\EntryController;

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

Route::get('entries', [EntryController::class, 'index'])->name('entries.index');
Route::post('entries', [EntryController::class, 'store'])->name('entries.store');
Route::get('entries/{entry}', [EntryController::class, 'show'])->name('entries.show');
Route::patch('entries/{entry}', [EntryController::class, 'update'])->name('entries.update');
Route::delete('entries/{entry}', [EntryController::class, 'delete'])->name('entries.delete');
