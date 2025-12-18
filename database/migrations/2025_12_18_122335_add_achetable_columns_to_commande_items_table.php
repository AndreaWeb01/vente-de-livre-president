<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
        Schema::table('achatinviters', function (Blueprint $table) {
            $table->string('achetable_type')->after('id');
            $table->unsignedBigInteger('achetable_id')->after('achetable_type');
            $table->unsignedBigInteger('commandeinviter_id')->after('achetable_id');
            $table->decimal('prix', 10, 2)->after('commandeinviter_id');
        });
    }

    public function down(): void    
    {
        Schema::table('commande_items', function (Blueprint $table) {
            $table->dropColumn(['achetable_type', 'achetable_id']);
        });
    }
};
