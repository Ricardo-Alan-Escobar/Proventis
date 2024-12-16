<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function show(Request $request)
    {
        return Inertia::render('Usuario', [
            'user' => [
                'id' => $request->user()->id,
                'name' => $request->user()->name,
                'email' => $request->user()->email,
                'bio' => $request->user()->bio,
                'location' => $request->user()->location,
                'education' => $request->user()->education,
                'work' => $request->user()->work,
                'phone' => $request->user()->phone,
                'website' => $request->user()->website,
                'occupation' => $request->user()->occupation,
            ],
        ]);
    }
}
