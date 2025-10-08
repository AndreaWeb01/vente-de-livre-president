<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Auteur extends Model
{
    protected $fillable = ['user_id', 'biographie'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function livres()
    {
        return $this->hasMany(Livre::class, 'auteur_id');
    }
}
