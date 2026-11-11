<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\NoteController;
use Illuminate\Support\Facades\Route;

Route::redirect('/', '/notes');

Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthController::class, 'form']);
    Route::post('/login', [AuthController::class, 'login']);
});

Route::middleware('auth')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/notes', [NoteController::class, 'index']);
    Route::get('/notes/new', [NoteController::class, 'create']);
    Route::post('/notes/new', [NoteController::class, 'store']);
    Route::post('/notes/{note}/delete', [NoteController::class, 'destroy']);
});
