<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateGmindersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('gminders', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('user_id');
            $table->mediumText('category');
            $table->text('mainResponse')->nullable();
            $table->mediumText('author')->nullable();
            $table->unsignedInteger('prompt_id')->nullable();
            $table->text('reason')->nullable();
            $table->mediumText('source')->nullable();
            $table->mediumText('who')->nullable();
            $table->smallInteger('rating')->nullable();
            $table->dateTime('eventDate')->nullable();
            $table->mediumText('collection')->nullable();
            $table->boolean('publicFlag')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('gminders');
    }
}
