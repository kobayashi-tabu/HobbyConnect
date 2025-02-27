<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\User;
use App\Models\Hobby;
use Illuminate\Support\Facades\Auth;
use inertia\inertia;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;

class UserHobbyController extends Controller
{
    public function update(Request $request): RedirectResponse
    {
        $user = Auth::user();
        $hobbyIds = $request->selectedHobbies;

        $request->validate([
            'selectedHobbies' => 'array|max:13',
            'selectedHobbies.*' => 'integer|exists:hobbies,id',
        ]);

        $user->hobbies()->sync($hobbyIds);

        return Redirect::route('profile.edit');

    }
}
