<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response; 

class ProfileController extends Controller
{ 
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'user' => [
                'id' => $request->user()->id,
                'name' => $request->user()->name,
                'email' => $request->user()->email,
                'emailVerified' => $request->user()->email_verified_at !== null,
                'bio' => $request->user()->bio,
                'location' => $request->user()->location,
                'education' => $request->user()->education,
                'work' => $request->user()->work,
                'phone' => $request->user()->phone,
                'website' => $request->user()->website,
                'occupation' => $request->user()->occupation,
                'role' => $request->user()->role,
            ],
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->bio = $request->input('bio'); 
        $request->user()->location = $request->input('location');
        $request->user()->education = $request->input('education');
        $request->user()->work = $request->input('work');
        $request->user()->phone = $request->input('phone');
        $request->user()->website = $request->input('website');
        $request->user()->occupation = $request->input('occupation');
        $request->user()->role = $request->input('role');

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/login');
    }
}
