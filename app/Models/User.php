<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'account_name',
        'name',
        'profile_image',
        'password',
        'region_id',
        'bio', // bioを追加
    ];

    // 主キーを user_id に設定
    protected $primaryKey = 'user_id'; // これを追加
    public $incrementing = false; // 自動インクリメントを無効にする（user_id が文字列の場合）

    // リレーション
    public function regions()
    {
        return $this->belongsTo(Region::class);
    }

    public function posts()
    {
        return $this->hasMany(Post::class);
    }

    public function hobbies()
    {
        return $this->belongsToMany(Hobby::class, 'user_hobby');
    }

    public function following()
    {
        return $this->belongsToMany(self::class, 'followers', 'following_id', 'followed_id');
    }

    public function followers()
    {
        return $this->belongsToMany(self::class, 'followers', 'followed_id', 'following_id');
    }

    public function tweets()
    {
        return $this->hasMany(Tweet::class, 'user_id', 'user_id');
    }
}
