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
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\Admin\PhotothequeController as AdminPhothothequeController;
use App\Http\Controllers\Public\AuthenticatedPublicController;
use App\Http\Controllers\Public\DashboardController as PublicDashboardController;
use App\Models\Formation;
use DebugBar\Storage\StorageInterface;
use Illuminate\Support\Facades\Storage;

Route::get('/', function () {
    return Inertia::render('Accueil');
})->name('home');

Route::prefix('public')->name('public.')->group(function () {
    Route::get('formations', [PublicFormationController::class, 'index'])->name('formations.index');
    Route::get('formations/{formation}', [PublicFormationController::class, 'show'])->name('formations.show');
    Route::get('livres', [PublicLivreController::class, 'index'])->name('livres.index');
    Route::get('livres/{id}', [PublicLivreController::class, 'show'])->name('livres.show');
    Route::get('auteurs', [App\Http\Controllers\Public\AuteurController::class, 'index'])->name('auteurs.index');
    Route::get('auteurs/{id}', [App\Http\Controllers\Public\AuteurController::class, 'show'])->name('auteurs.show');
    Route::get('webinaires', [App\Http\Controllers\Public\WebinaireController::class, 'index'])->name('webinaires.index');
    Route::get('webinaires/{id}', [App\Http\Controllers\Public\WebinaireController::class, 'show'])->name('webinaires.show');
    Route::get('phototheque', [App\Http\Controllers\Public\PhotothequeController::class, 'index'])->name('phototheque.index');

});

// Routes publiques sans préfixe (pour la compatibilité avec la navbar)
Route::get('inscription', [AuthenticatedPublicController::class, 'create'])->name('inscription');
Route::post('inscription', [AuthenticatedPublicController::class, 'store']);
Route::get('login', [AuthenticatedPublicController::class, 'showLoginForm'])->name('login');
Route::post('public/login', [AuthenticatedPublicController::class, 'login'])->name('public.login.store');
Route::post('logout', [AuthenticatedPublicController::class, 'logout'])->name('public.logout');
Route::get('formations', [PublicFormationController::class, 'index'])->name('formations.index');
Route::get('formations/{formation}', [PublicFormationController::class, 'show'])->name('formations.show');
Route::get('livres', [PublicLivreController::class, 'index'])->name('livres.index');
Route::get('livres/{id}', [PublicLivreController::class, 'show'])->name('livres.show');
Route::get('auteurs', [App\Http\Controllers\Public\AuteurController::class, 'index'])->name('auteurs.index');
Route::get('auteurs/{id}', [App\Http\Controllers\Public\AuteurController::class, 'show'])->name('auteurs.show');
Route::get('webinaires', [App\Http\Controllers\Public\WebinaireController::class, 'index'])->name('webinaires.index');
Route::get('webinaires/{id}', [App\Http\Controllers\Public\WebinaireController::class, 'show'])->name('webinaires.show');
Route::get('phototheque', [App\Http\Controllers\Public\PhotothequeController::class, 'index'])->name('phototheque.index');


Route::get('/pay', [PaymentController::class, 'initPayment'])->name('payment.init');
Route::get('/payment/callback', [PaymentController::class, 'callback'])->name('payment.callback');

// Routes de paiement
/*Route::get('paieproduitphysique', function () {
    return Inertia::render('PaieProduitPhysique');
})->name('paie.produit-physique');
Route::get('paieproduitnumerique', function () {
    return Inertia::render('PaieProduitNumerique');
})->name('paie.produit-numerique');*/

Route::post('panier/livres/{id}', [PublicPanierController::class, 'addLivre'])->name('panier.add.livre');
Route::prefix('public')->name('public.')->middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [PublicDashboardController::class, 'index'])->name('dashboard');
    Route::get('panier', [PublicPanierController::class, 'index'])->name('panier.index');
    Route::post('panier/livres/{id}', [PublicPanierController::class, 'addLivre'])->name('panier.add.livre');
    Route::post('panier/formations/{id}', [PublicPanierController::class, 'addFormation'])->name('panier.add.formation');
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
    Route::resource('phototheque', AdminPhothothequeController::class);
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
    Route::get('read-book/{id}', [AccessController::class, 'voirLivre'])
        ->middleware('check.livre.access')
        ->name('read-book');
    Route::get('mes-webinaire', [AccessController::class, 'mesWebinaire'])->name('mes.webinaire');
    
    Route::get('/video-formation/{id}', [AccessController::class, 'voirVideoFormation'])
        ->middleware('check.formation.access')
        ->name('video-formation');
});

Route::get('/video-stream/{id}', function ($id) {
    $formation = Formation::findOrFail($id);

    // Le chemin stocké dans la BD (ex: formations/videos/nom.mp4)
    $path = $formation->video_path ?? $formation->url_video;

    if (!$path || !Storage::disk('public')->exists($path)) {
        abort(404, 'Vidéo introuvable');
    }

    // Retourne le fichier vidéo via la réponse HTTP (sans exposer son chemin)
    return response()->file(storage_path('app/public/' . $path));
})->name('video.stream');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
