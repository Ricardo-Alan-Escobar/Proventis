<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;

class UserController extends Controller
{
    public function show(Request $request, $id)
{
    $user = User::findOrFail($id); // Asegúrate de importar el modelo User
    
    return Inertia::render('Usuario', [
        'user' => [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email, 
            'bio' => $user->bio,
            'location' => $user->location,
            'education' => $user->education,
            'work' => $user->work,
            'phone' => $user->phone,
            'website' => $user->website,
            'occupation' => $user->occupation,
        ],
    ]);
    
}

public function index()
{
    // Devuelve todos los usuarios como respuesta JSON
    return response()->json(User::all());
}

}
