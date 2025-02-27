<?php

namespace App\Http\Controllers;

use App\Models\Tweet;
use Illuminate\Http\Request;

class TweetController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'content' => 'required|string|max:280', // ツイート内容が必要で、最大280文字
            'user_id' => 'required|exists:users,user_id', // ユーザーIDが必要で、usersテーブルに存在すること
        ]);

        // ツイートの保存
        Tweet::create([
            'user_id' => $request->user_id,
            'content' => $request->content,
        ]);

        // 成功した場合、リダイレクトする
        return redirect()->route('welcome');
    }
}