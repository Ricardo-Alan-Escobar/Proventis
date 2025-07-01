<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;

//Creacion de controlador para manejar las operaciones relacionadas con los usuarios
class UserController extends Controller
{
    public function show(Request $request, $id)
{
    $user = User::findOrFail($id); 
    // Check if the user is authenticated and has permission to view the profile 
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
            'departamento' => $user->departamento,
            'role' => $user->role,
        ],
    ]);
    
}

public function index(Request $request)
{
    $query = User::query();

    if ($request->has('search')) {
        $search = $request->input('search');
        $query->where('name', 'LIKE', "%{$search}%")
              ->orWhere('email', 'LIKE', "%{$search}%");
    }

    return response()->json($query->get());
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

public function destroy($id)
{
    $user = User::findOrFail($id);
    $user->delete();

    return response()->json(['message' => 'Usuario eliminado exitosamente.'], 200);
}


}
