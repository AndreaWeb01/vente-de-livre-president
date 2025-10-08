<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\FormationController;
use App\Http\Controllers\LivreController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuteurController;
Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::resource('formations', FormationController::class);
Route::resource('livres', LivreController::class);

// Routes protégées par permissions
Route::middleware(['auth', 'verified'])->group(function () {
    // Routes spécifiques d'abord (sans paramètres)
    Route::middleware('permission:view users')->group(function () {
        Route::get('users', [UserController::class, 'index'])->name('users.index');
    });

    Route::middleware('permission:create users')->group(function () {
        Route::get('users/create', [UserController::class, 'create'])->name('users.create');
        Route::post('users', [UserController::class, 'store'])->name('users.store');
    });

    Route::middleware('permission:view auteurs')->group(function () {
        Route::get('auteurs', [AuteurController::class, 'index'])->name('auteurs.index');
    });

    Route::middleware('permission:create auteurs')->group(function () {
        Route::get('auteurs/create', [AuteurController::class, 'create'])->name('auteurs.create');
        Route::post('auteurs', [AuteurController::class, 'store'])->name('auteurs.store');
    });

    // Routes avec paramètres après les routes spécifiques
    Route::middleware('permission:view users')->group(function () {
        Route::get('users/{user}', [UserController::class, 'show'])->name('users.show');
    });

    Route::middleware('permission:edit users')->group(function () {
        Route::get('users/{user}/edit', [UserController::class, 'edit'])->name('users.edit');
        Route::put('users/{user}', [UserController::class, 'update'])->name('users.update');
        Route::patch('users/{user}', [UserController::class, 'update']);
    });

    Route::middleware('permission:delete users')->group(function () {
        Route::delete('users/{user}', [UserController::class, 'destroy'])->name('users.destroy');
    });

    Route::middleware('permission:view auteurs')->group(function () {
        Route::get('auteurs/{auteur}', [AuteurController::class, 'show'])->name('auteurs.show');
    });

    Route::middleware('permission:edit auteurs')->group(function () {
        Route::get('auteurs/{auteur}/edit', [AuteurController::class, 'edit'])->name('auteurs.edit');
        Route::put('auteurs/{auteur}', [AuteurController::class, 'update'])->name('auteurs.update');
        Route::patch('auteurs/{auteur}', [AuteurController::class, 'update']);
    });

    Route::middleware('permission:delete auteurs')->group(function () {
        Route::delete('auteurs/{auteur}', [AuteurController::class, 'destroy'])->name('auteurs.destroy');
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
