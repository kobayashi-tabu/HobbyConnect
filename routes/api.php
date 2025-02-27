<?php

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user/{id}', function ($id) {
    // 'user_id' を使って検索
    $user = User::where('user_id', $id)->first();
    if (!$user) {
        return response()->json(['error' => 'ユーザーが見つかりません'], 404);
    }
    return response()->json($user);
});
