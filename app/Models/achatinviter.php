<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class achatinviter extends Model
{
    /** @use HasFactory<\Database\Factories\AchatinviterFactory> */
    use HasFactory;
    protected $fillable = [
        'commandeinviter_id',
        'achetable_type',
        'achetable_id',
        'prix',
    ];

    protected $casts = [
        'prix' => 'decimal:2',
    ];
    public function achetable()
    {
        return $this->morphTo();
    }
    public function commandeinviter()
    {
        return $this->belongsTo(Commandeinviter::class);
    }
    

}
