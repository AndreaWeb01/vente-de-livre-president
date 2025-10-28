<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Achat extends Model
{
    protected $fillable = [
        'commande_id',
        'user_id',
        'achetable_type',
        'achetable_id',
        'prix',
    ];

    protected $casts = [
        'prix' => 'decimal:2',
    ];

    public function commande(): BelongsTo
    {
        return $this->belongsTo(Commande::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function achetable(): MorphTo
    {
        return $this->morphTo();
    }
}
