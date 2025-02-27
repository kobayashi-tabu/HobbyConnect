<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Hobby extends Model
{
    protected $fillable = ['name', 'code'];

    public function users()
    {
        return $this->belongsToMany(User::class, 'user_hobby');
    }
}