<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class phothotheque extends Model
{
    protected $table = 'phothotheques';
    protected $fillable = ['titre', 'date', 'description', 'photo'];
}
