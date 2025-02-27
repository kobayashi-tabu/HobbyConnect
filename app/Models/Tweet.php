<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tweet extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'content'];

    // 追加でタイムスタンプを使う設定がデフォルトなので省略します

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }

}