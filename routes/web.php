<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CommentController;
use Illuminate\Foundation\Application;
use App\Http\Controllers\PostController;
use App\Http\Controllers\TicketsController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' =>false,
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');



Route::get('/usuario/{id}', [UserController::class, 'show'])
    ->middleware(['auth', 'verified'])
    ->name('usuario');


    
Route::middleware('auth')->group(function () {

    //Editar Perfil
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    //Post
    Route::get('/dashboard', [PostController::class, 'index'])->name('dashboard');
    Route::post('/posts', [PostController::class, 'store'])->name('posts.store');
    Route::put('/posts/{post}', [PostController::class, 'update'])->name('posts.update');
    Route::delete('/posts/{post}', [PostController::class, 'destroy'])->name('posts.destroy');

    //Likes
    Route::get('/posts/{post}/likes', [PostController::class, 'getLikes']);
    Route::post('/posts/{post}/like', [PostController::class, 'like'])->name('posts.like');
    Route::get('/posts/likes', [PostController::class, 'getAllLikes']);

    //Comentarios
    Route::post('/posts/{post}/comments', [CommentController::class, 'store'])->name('comments.store');
    Route::get('/posts/{post}/comments', [CommentController::class, 'index'])->name('comments.index');
    Route::delete('/comments/{comment}', [CommentController::class, 'destroy'])->name('comments.destroy');
    Route::patch('/comments/{comment}', [CommentController::class, 'update'])->name('comments.update');

    //Tickets
    Route::get('/tickets/mis-tickets', [TicketsController::class, 'userTickets'])->name('tickets.userTickets');
    Route::resource('tickets', \App\Http\Controllers\TicketsController::class);
    
    //Usuarios
    Route::get('/usuarios', [UserController::class, 'index'])->middleware(['auth', 'verified']);

});


require __DIR__.'/auth.php';
