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
        'domaine',
        'date',
        'image',
        'url_video',
        'url_zoom',
        'est_actif',
        'prix'
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
