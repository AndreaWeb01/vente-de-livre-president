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
        Schema::create('livres', function (Blueprint $table) {
            $table->id();
            $table->string('titre');
            $table->foreignId('auteur_id')->constrained('auteurs')->onDelete('cascade');
            $table->text('description');
            $table->integer('page');
            $table->enum('type', ['physique', 'numerique']);
            $table->string('langue');
            $table->string('photo')->nullable();
            $table->string('livrepdf')->nullable();
            $table->date('date_publication');
            $table->decimal('prix', 8, 2);
            $table->unsignedInteger('stock');
            $table->boolean('est_actif')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('livres');
    }
};
