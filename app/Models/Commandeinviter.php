<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Commandeinviter extends Model
{
    /** @use HasFactory<\Database\Factories\CommandeinviterFactory> */
    use HasFactory;
    protected $fillable = [
        'nom',
        'prenom',
        'email',
        'telephone',
        'adresse',
        'ville',
        'pays',
        'quartier',
        'total',
        'statut',
        'reference',
        'mode_paiement',
        'notes',
        'date_paiement',
    ];
    protected $casts = [
        'total' => 'decimal:2',
    ];
    public function achats()
    {
        return $this->hasMany(achatinviter::class);
    }
  
    public function panierinviter()
    {
        return $this->hasMany(Panierinviter::class);
    }
}
