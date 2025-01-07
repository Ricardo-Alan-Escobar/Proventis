<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot()
{
    Inertia::share([
        'auth' => function () {
            if (Auth::check()) {
                return [
                    'user' => [
                        'id' => Auth::id(),
                        'role' => Auth::user()->role,
                    ],
                ];
            }
            return null;
        },
    ]);
}
}
