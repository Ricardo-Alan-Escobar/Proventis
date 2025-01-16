<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddProfileFieldsToUsersTable extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->text('bio')->nullable(); // Para la biografía
            $table->string('location')->nullable(); // Para la ubicación
            $table->string('education')->nullable(); // Para la educación
            $table->string('work')->nullable(); // Para el trabajo
            $table->string('phone', 15)->nullable(); // Para el teléfono
            $table->string('website')->nullable(); // Para el sitio web
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['bio', 'location', 'education', 'work', 'phone', 'website']);
        });
    }
}
