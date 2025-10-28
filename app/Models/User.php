<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, TwoFactorAuthenticatable, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'nom',
        'prenom',
        'telephone',
        'adresse',
        'ville',
        'quartier',
        'email',
        'password',
    ];
    public function auteur()
    {
        return $this->hasMany(Auteur::class);
    }

    public function commandes()
    {
        return $this->hasMany(Commande::class);
    }

    public function achats()
    {
        return $this->hasMany(Achat::class);
    }

    public function formationsAchetees()
    {
        return $this->morphedByMany(Formation::class, 'achetable', 'achats');
    }

    public function livresAchetes()
    {
        return $this->morphedByMany(Livre::class, 'achetable', 'achats');
    }

    public function panier()
    {
        return $this->hasMany(Panier::class);
    }


    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
}
