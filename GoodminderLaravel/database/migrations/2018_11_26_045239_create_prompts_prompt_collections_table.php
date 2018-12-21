<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePromptsPromptCollectionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('prompts_prompt_collections', function (Blueprint $table) {
            $table->unsignedInteger('prompt_id')->index();
            $table->foreign('prompt_id')->references('id')->on('prompts')->onDelete('cascade');
            
            $table->unsignedInteger('prompt_collection_id')->index();
            $table->foreign('prompt_collection_id')->references('id')->on('prompt_collections')->onDelete('cascade');
            
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
        Schema::dropIfExists('prompts_prompt_collections');
    }
}
