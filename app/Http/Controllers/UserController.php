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
            'role' => $user->role,
        ],
    ]);
    
}

public function index()
{
    // Devuelve todos los usuarios como respuesta JSON
    return response()->json(User::all());
}

public function store(Request $request)
{
    $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|string|email|max:255|unique:users',
        'password' => 'required|string|min:8|confirmed',
        'role' => 'required|string|in:admin,user,moderator',
    ]);

    $user = User::create([
        'name' => $request->name,
        'email' => $request->email,
        'password' => bcrypt($request->password),
        'role' => $request->role,
    ]);

    return redirect()->route('crearusuario')->with('success', 'Usuario creado exitosamente.');
}




}
