<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use function Pest\Laravel\{actingAs, get, post, delete};

uses(RefreshDatabase::class);

it('can show a user', function () { $user = User::factory()->create(); 
    // Autenticar al usuario
     actingAs($user);
      // Realizar la solicitud GET
       $response = get(route('usuario', $user->id));
        // Verificar que el estado de la respuesta es 200
         $response->assertStatus(200)
          ->assertInertia(fn ($page) => $page
           ->component('Usuario')
            ->where('user.id', $user->id)
             ->where('user.name', $user->name)
              ->where('user.email', $user->email)
               ->where('user.bio', $user->bio)
                ->where('user.location', $user->location) 
                ->where('user.education', $user->education)
                 ->where('user.work', $user->work)
                  ->where('user.phone', $user->phone) 
                  ->where('user.website', $user->website) 
                  ->where('user.occupation', $user->occupation)
                   ->where('user.departamento', $user->departamento)
                    ->where('user.role', $user->role) );
                 });

it('can list all users', function () {
    $admin = User::factory()->create(['role' => 'admin']);

    actingAs($admin);

    $response = get('/usuarios');

    $response->assertStatus(200)
             ->assertJson(User::all()->toArray());
});

it('can create a user', function () {
    $admin = User::factory()->create(['role' => 'admin']);

    actingAs($admin);

    $userData = [
        'name' => 'John Doe',
        'email' => 'john@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
        'role' => 'user',
    ];

    $response = post(route('usuarios.store'), $userData);

    $response->assertRedirect(route('crearusuario'))
             ->assertSessionHas('success', 'Usuario creado exitosamente.');

    $this->assertDatabaseHas('users', [
        'name' => 'John Doe',
        'email' => 'john@example.com',
    ]);
});

it('can delete a user', function () {
    $admin = User::factory()->create(['role' => 'admin']);
    $user = User::factory()->create();

    actingAs($admin);

    $response = delete(route('usuarios.destroy', $user->id));

    $response->assertStatus(200)
             ->assertJson(['message' => 'Usuario eliminado exitosamente.']);

    $this->assertDatabaseMissing('users', ['id' => $user->id]);
});
