<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Commande extends Model
{
    protected $fillable = [
        'user_id',
        'total',
        'statut',
        'reference',
        'date_paiement',
        'mode_paiement',
        'notes',
    ];

    protected $casts = [
        'total' => 'decimal:2',
        'date_paiement' => 'datetime',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function achats(): HasMany
    {
        return $this->hasMany(Achat::class);
    }

    public function isPayee(): bool
    {
        return $this->statut === 'payee';
    }
}
