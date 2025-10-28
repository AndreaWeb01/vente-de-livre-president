<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Admin\FormationController as AdminFormationController;
use App\Http\Controllers\Admin\LivreController as AdminLivreController;
use App\Http\Controllers\Admin\UserController as AdminUserController;
use App\Http\Controllers\Admin\AuteurController as AdminAuteurController;
use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Public\FormationController as PublicFormationController;
use App\Http\Controllers\Public\LivreController as PublicLivreController;
use App\Http\Controllers\Public\PanierController as PublicPanierController;
use App\Http\Controllers\Public\CommandeController as PublicCommandeController;
use App\Http\Controllers\AccessController;
use App\Http\Controllers\Public\AuthenticatedPublicController;
Route::get('/', function () {
    return Inertia::render('Accueil');
})->name('home');
Route::prefix('public')->name('public.')->group(function () {
    Route::get('formations', [PublicFormationController::class, 'index'])->name('formations.index');
    Route::get('formations/{id}', [PublicFormationController::class, 'show'])->name('formations.show');
    Route::get('livres', [PublicLivreController::class, 'index'])->name('livres.index');
    Route::get('livres/{id}', [PublicLivreController::class, 'show'])->name('livres.show');
    // Routes d'authentification gérées par Fortify
    // Les routes Fortify sont automatiquement disponibles : /login, /register, /logout, etc.
    Route::get('auteurs', [App\Http\Controllers\Public\AuteurController::class, 'index'])->name('auteurs.index');
    Route::get('auteurs/{id}', [App\Http\Controllers\Public\AuteurController::class, 'show'])->name('auteurs.show');
    Route::get('webinaires', [App\Http\Controllers\Public\WebinaireController::class, 'index'])->name('webinaires.index');
    Route::get('webinaires/{id}', [App\Http\Controllers\Public\WebinaireController::class, 'show'])->name('webinaires.show');
    Route::get('phototheque', [App\Http\Controllers\Public\PhotothequeController::class, 'index'])->name('phototheque.index');
});

// Routes publiques sans préfixe (pour la compatibilité avec la navbar)
Route::get('formations', [PublicFormationController::class, 'index'])->name('formations.index');
Route::get('formations/{id}', [PublicFormationController::class, 'show'])->name('formations.show');
Route::get('livres', [PublicLivreController::class, 'index'])->name('livres.index');
Route::get('livres/{id}', [PublicLivreController::class, 'show'])->name('livres.show');
Route::get('auteurs', [App\Http\Controllers\Public\AuteurController::class, 'index'])->name('auteurs.index');
Route::get('auteurs/{id}', [App\Http\Controllers\Public\AuteurController::class, 'show'])->name('auteurs.show');
Route::get('webinaires', [App\Http\Controllers\Public\WebinaireController::class, 'index'])->name('webinaires.index');
Route::get('webinaires/{id}', [App\Http\Controllers\Public\WebinaireController::class, 'show'])->name('webinaires.show');
Route::get('phototheque', [App\Http\Controllers\Public\PhotothequeController::class, 'index'])->name('phototheque.index');

// Routes de paiement
Route::get('paieproduitphysique', function () {
    return Inertia::render('PaieProduitPhysique');
})->name('paie.produit-physique');

Route::get('paieproduitnumerique', function () {
    return Inertia::render('PaieProduitNumerique');
})->name('paie.produit-numerique');

Route::prefix('public')->name('public.')->middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [App\Http\Controllers\Public\DashboardController::class, 'index'])->name('dashboard');
    Route::get('panier', [PublicPanierController::class, 'index'])->name('panier.index');
    Route::post('panier/livres/{id}', [PublicPanierController::class, 'addLivre'])->name('panier.add-livre');
    Route::post('panier/formations/{id}', [PublicPanierController::class, 'addFormation'])->name('panier.add-formation');

    Route::post('acheter/livres/{id}', [PublicPanierController::class, 'buyLivreDirect'])->name('buy.livre-direct');
    Route::post('acheter/formations/{id}', [PublicPanierController::class, 'buyFormationDirect'])->name('buy.formation-direct');
    Route::put('panier/{id}', [PublicPanierController::class, 'update'])->name('panier.update');
    Route::delete('panier/{id}', [PublicPanierController::class, 'destroy'])->name('panier.destroy');
    Route::delete('panier', [PublicPanierController::class, 'clear'])->name('panier.clear');
    Route::get('commande/create', [PublicCommandeController::class, 'create'])->name('commande.create');
    Route::post('commande', [PublicCommandeController::class, 'store'])->name('commande.store');
    Route::get('commande/{id}/success', [PublicCommandeController::class, 'success'])->name('commande.success');
    Route::get('commande/{id}', [PublicCommandeController::class, 'show'])->name('commande.show');
    Route::get('commandes', [PublicCommandeController::class, 'index'])->name('commandes.index');
});
Route::prefix('admin')->name('admin.')->middleware(['auth', 'verified', 'role:admin'])->group(function () {
    Route::get('admin/dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');
    Route::resource('users', AdminUserController::class);
    Route::resource('auteurs', AdminAuteurController::class);
    Route::resource('formations', AdminFormationController::class);
    Route::resource('livres', AdminLivreController::class);
    Route::get('commandes', [App\Http\Controllers\Admin\CommandeController::class, 'index'])->name('commandes.index');
    Route::get('commandes/{id}', [App\Http\Controllers\Admin\CommandeController::class, 'show'])->name('commandes.show');
    Route::put('commandes/{id}/status', [App\Http\Controllers\Admin\CommandeController::class, 'updateStatus'])->name('commandes.update-status');
});
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('mes-formations', [AccessController::class, 'mesFormations'])->name('mes.formations');
    Route::get('mes-livres', [AccessController::class, 'mesLivres'])->name('mes.livres');
    Route::get('formation/{id}', [AccessController::class, 'voirFormation'])
        ->middleware('check.formation.access')
        ->name('formation.show');
    Route::get('livre/{id}', [AccessController::class, 'voirLivre'])
        ->middleware('check.livre.access')
        ->name('livre.show');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
