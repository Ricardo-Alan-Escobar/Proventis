<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{

    use HasFactory;
    // Definir la relación con el modelo User
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    
    public function likes()
{
    return $this->belongsToMany(User::class, 'likes');
}
public function comments()
{
    return $this->hasMany(Comment::class);
}
}
