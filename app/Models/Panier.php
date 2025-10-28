<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Panier extends Model
{
    protected $fillable = [
        'user_id',
        'achetable_type',
        'achetable_id',
        'quantite',
        'prix_unitaire',
        'prix_total',
    ];

    protected $casts = [
        'prix_unitaire' => 'decimal:2',
        'prix_total' => 'decimal:2',
    ];

    /**
     * Relation avec l'utilisateur
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Relation polymorphique avec les éléments achetables (Livre ou Formation)
     */
    public function achetable(): MorphTo
    {
        return $this->morphTo();
    }

    /**
     * Calculer le prix total automatiquement
     */
    protected static function boot()
    {
        parent::boot();

        static::saving(function ($panier) {
            $panier->prix_total = $panier->prix_unitaire * $panier->quantite;
        });
    }
}
