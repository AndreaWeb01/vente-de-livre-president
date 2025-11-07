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
        Schema::create('formations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('titre');
            $table->string('type');
            $table->string('formateur');
            $table->text('description');
            $table->string('url_video')->nullable();
            $table->string('photo');
            $table->date('date');
            $table->string('url_zoom')->nullable(); 
            $table->decimal('prix', 8, 2);
            $table->unsignedInteger('stock');
            $table->boolean('est_actif')->default(true);
            $table->timestamps();   
        });
        
    }

    public function down(): void
    {
        Schema::dropIfExists('formations');
    }
};
