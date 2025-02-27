<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    public function show($id)
    {
        // IDを元にユーザーを取得
        $user = User::where('user_id', $id)->first();

        if (!$user) {
            return redirect('/'); // ユーザーが見つからなければトップページにリダイレクト
        }

        // ユーザー情報をInertiaを使ってReactに渡す
        return Inertia::render('Welcome', [
            'user' => $user
        ]);
    }

    public function update(Request $request)
    {
        // バリデーション
        $request->validate([
            'user_id' => 'required|exists:users,user_id', // user_id で確認
            'name' => 'required|string|max:255',
            'bio' => 'nullable|string',
            'profile_image' => 'nullable|image|max:2048', // 画像は2MBまで
        ]);

        // ユーザー情報を取得
        $user = User::where('user_id', $request->user_id)->firstOrFail();

        // ユーザー情報を更新
        $user->name = $request->name;
        $user->bio = $request->bio;

        // プロフィール画像の処理
        if ($request->hasFile('profile_image')) {
            // 以前の画像を削除
            if ($user->profile_image_url) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $user->profile_image_url));
            }

            // 新しい画像を保存
            $imagePath = $request->file('profile_image')->store('profile_images', 'public');
            $user->profile_image_url = '/storage/' . $imagePath;
        }

        $user->save();

        return response()->json(['message' => 'プロフィールが更新されました', 'user' => $user]);
    }
}
