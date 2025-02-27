<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Tweet;

class WelcomeController extends Controller
{
    public function index(Request $request)
    {
        // 仮のユーザー情報（本来はセッションなどで管理）
        $user = User::where('user_id', 1)->first(); // 例として user_id=1 を取得
        
        if (!$user) {
            return redirect()->route('welcome')->withErrors('ユーザーが見つかりません');
        }

        $tweets = Tweet::where('user_id', $user->user_id)->latest()->get();

        return Inertia::render('Welcome', [
            'user' => $user,
            'events' => [], // ここにイベントのデータを取得して渡す
            'tweets' => $tweets,
        ]);
    }

    public function updateProfile(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'bio' => 'nullable|string|max:500',
        ]);

        $user = User::where('user_id', $request->user_id)->first();

        if (!$user) {
            return redirect()->route('welcome')->withErrors('ユーザーが見つかりません');
        }

        $user->update([
            'name' => $request->name,
            'bio' => $request->bio,
        ]);

        return redirect()->route('welcome');
    }
}
