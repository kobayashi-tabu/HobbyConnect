<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('event_participants_relations', function (Blueprint $table) {
            $table->unsignedBigInteger('event_id');  // 修正：unsignedBigInteger に変更
            $table->unsignedBigInteger('user_id');   // 修正：unsignedBigInteger に変更

            $table->foreign('event_id')->references('event_id')->on('events')->onDelete('cascade');
            $table->foreign('user_id')->references('user_id')->on('users')->onDelete('cascade');

            $table->timestamps();
            $table->primary(['event_id', 'user_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('event_participants_relations');
    }
};
