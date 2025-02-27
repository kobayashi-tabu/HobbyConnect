<?php

// app/Http/Controllers/EventController.php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class EventController extends Controller
{
    // createメソッドの定義
    public function create()
    {
        return view('events.create');  // イベント作成ページを返す
    }
}