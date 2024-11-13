<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tickets', function (Blueprint $table) {
            $table->id();
            $table->string('Nombre', 60);
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('Departamento', 50);
            $table->string('Problema', 150);
            $table->string('Prioridad', 20);
            $table->string('Estado', 20);  
            $table->string('Creacion', 20);
            $table->string('Termino', 20);
            $table->timestamps();
        });
    }

    
    public function down(): void
    {
        Schema::dropIfExists('tickets');
    }
};
