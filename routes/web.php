<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Tweet;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TweetController;
use App\Http\Controllers\EventController;

// ホームページのルート
Route::get('/', function () {
    $userID = 1; // 仮のログインユーザーID
    $user = User::where('user_id', $userID)->first();
    
    // ログインしているユーザーのツイートを取得
    $tweets = Tweet::where('user_id', $userID)->latest()->get();

    return Inertia::render('Welcome', [
        'user' => $user ?? null,
        'tweets' => $tweets, // ツイートを追加
    ]);
})->name('welcome');

// プロフィール関連
Route::get('/profile/edit', [ProfileController::class, 'edit'])->name('profile.edit');
Route::get('/profile/{id}', [ProfileController::class, 'show'])->name('profile.show');
Route::post('/profile/update', [ProfileController::class, 'update'])->name('profile.update');

// 投稿（ツイート）関連
Route::get('/tweets/create', [TweetController::class, 'create'])->name('tweets.create');
Route::get('/tweets', [TweetController::class, 'index'])->name('tweets.index');
Route::post('/tweets', [TweetController::class, 'store'])->name('tweets.store');
Route::put('/tweets/{id}', [TweetController::class, 'update'])->name('tweets.update');
Route::delete('/tweets/{id}', [TweetController::class, 'destroy'])->name('tweets.destroy');

// イベント関連
Route::get('/events/create', [EventController::class, 'create'])->name('events.create');
