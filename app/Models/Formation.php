<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Formation extends Model
{
    protected $fillable = [
        'user_id',
        'titre',
        'type',
        'formateur',
        'description',
        'date',
        'photo',
        'url_video',
        'url_zoom',
        'est_actif',
        'prix',
        'stock'
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function achats()
    {
        return $this->morphMany(Achat::class, 'achetable');
    }
}
