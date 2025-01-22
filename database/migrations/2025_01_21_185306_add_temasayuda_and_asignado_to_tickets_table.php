<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddTemasayudaAndAsignadoToTicketsTable extends Migration
{
    public function up()
    {
        Schema::table('tickets', function (Blueprint $table) {
            $table->string('TemasAyuda', 100)->nullable()->after('Estado'); // Columna para temas de ayuda
            $table->string('Asignado', 100)->nullable()->after('TemasAyuda'); // Columna para el usuario asignado
        });
    }

    public function down()
    {
        Schema::table('tickets', function (Blueprint $table) {
            $table->dropColumn(['TemasAyuda', 'Asignado']);
        });
    }
}
