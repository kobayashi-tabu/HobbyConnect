<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Region;
use App\Models\Hobby;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use inertia\inertia;

class SearchController extends Controller
{
    public function indexbyregion()
    {
        $regions = Region::all();
        return Inertia::render('SearchByRegion', ['regions' => $regions]);
    }

    public function searchbyregion(Request $request)
    {
        $user = Auth::user();
        $currentUserId = Auth::id();
        $regions = Region::all();
        $regionId = $request->region;
        $searchedUsers = User::where('region_id', $regionId)
        ->where('id', '!=', $currentUserId)
        ->get();
        $searchedUsers->each(function ($otherUser) use ($user) {
            $followers = $user->followers->pluck('id')->toArray();
            $following = $user->following->pluck('id')->toArray();

            $otherUser->isFollowing = in_array($otherUser->id, $following);
            $otherUser->isFollowed = in_array($otherUser->id, $followers);
            $otherUser->postsCount = $otherUser->posts->count();
            $otherUser->followingsCount = $otherUser->following->count();
            $otherUser->followersCount = $otherUser->followers->count();
        });

        return Inertia::render('SearchByRegion', [
            'searchedUsers' => $searchedUsers,
            'regions' => $regions
        ]);
    }

    public function indexbyhobby()
    {
        $hobbies = Hobby::all();
        return Inertia::render('SearchByHobby', ['hobbies' => $hobbies]);
    }

    public function searchbyhobby(Request $request)
    {
        $user = Auth::user();
        $currentUserId = Auth::id();
        $hobbies = Hobby::all();
        $hobbyId = $request->hobby;
        $searchedUsers = User::whereHas('hobbies', function ($query) use ($hobbyId) {
            $query->where('hobbies.id', $hobbyId);
        })
        ->where('id', '!=', $currentUserId)
        ->get();
        $searchedUsers->each(function ($otherUser) use ($user) {
            $followers = $user->followers->pluck('id')->toArray();
            $following = $user->following->pluck('id')->toArray();

            $otherUser->isFollowing = in_array($otherUser->id, $following);
            $otherUser->isFollowed = in_array($otherUser->id, $followers);
            $otherUser->postsCount = $otherUser->posts->count();
            $otherUser->followingsCount = $otherUser->following->count();
            $otherUser->followersCount = $otherUser->followers->count();
        });

        return Inertia::render('SearchByHobby', [
            'searchedUsers' => $searchedUsers,
            'hobbies' => $hobbies
        ]);
    }
}
