<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Panierinviter extends Model
{
    /** @use HasFactory<\Database\Factories\PanierinviterFactory> */
    use HasFactory;

    protected $fillable = [
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

    protected static function boot()
    {
        parent::boot();

        static::saving(function ($panier) {
            $panier->prix_total = $panier->prix_unitaire * $panier->quantite;
        });
    }
    public function achetable()
    {
        return $this->morphTo();
    }

}
