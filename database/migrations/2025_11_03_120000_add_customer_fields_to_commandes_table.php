<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('commandes', function (Blueprint $table) {
            // Coordonnées client pour la commande (sans modifier le profil)
            $table->string('nom')->nullable()->after('user_id');
            $table->string('prenom')->nullable()->after('nom');
            $table->string('email')->nullable()->after('prenom');
            $table->string('telephone', 20)->nullable()->after('email'); // E.164 max ~15 + marge
            $table->string('adresse')->nullable()->after('telephone');
            $table->string('ville')->nullable()->after('adresse');
            $table->string('quartier')->nullable()->after('ville');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('commandes', function (Blueprint $table) {
            $table->dropColumn([
                'nom', 'prenom', 'email', 'telephone', 'adresse', 'ville', 'quartier',
                'mode_paiement', 'notes'
            ]);
        });
    }
};


