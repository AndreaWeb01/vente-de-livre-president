<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Livre extends Model
{
    protected $fillable = [
        'titre',
        'auteur_id',
        'description',
        'page',
        'type',
        'langue',
        'photo',
        'livrepdf',
        'date_publication',
        'prix',
        'stock',
        'est_actif'
    ];
    public function auteur()
    {
        return $this->belongsTo(Auteur::class, 'auteur_id');
    }
}
