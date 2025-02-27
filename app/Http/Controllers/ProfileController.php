<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProfileController extends Controller
{
    // プロフィールの更新
    public function update(Request $request)
    {
        // バリデーション
        $request->validate([
            'user_id' => 'required|exists:users,user_id', // user_id で検索
            'name' => 'required|string|max:255',
            'bio' => 'nullable|string',
            'profile_image' => 'nullable|image|max:2048', // 画像は2MBまで
        ]);

        // `user_id` でユーザーを検索
        $user = User::where('user_id', $request->user_id)->first();

        // ユーザーが存在しない場合のエラーハンドリング
        if (!$user) {
            return response()->json(['error' => 'ユーザーが見つかりません'], 404);
        }

        // データを更新
        $user->name = $request->input('name');
        $user->bio = $request->input('bio');

        // プロフィール画像の更新処理
        if ($request->hasFile('profile_image')) {
            // 以前の画像を削除
            if ($user->profile_image_url) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $user->profile_image_url));
            }

            // 新しい画像を保存
            $imagePath = $request->file('profile_image')->store('profile_images', 'public');
            $user->profile_image_url = '/storage/' . $imagePath;
        }

        // 更新を保存
        $user->save();

        // 成功メッセージとともにInertiaレスポンスを返す
        return Inertia::render('Profile/Show', [
            'user' => $user,
            'success' => 'プロフィールが更新されました'
        ]);
    }
}
