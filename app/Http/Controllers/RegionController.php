<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Region;
use inertia\inertia;

class RegionController extends Controller
{
    public function index()
    {
        $regions = Region::all();
        return Inertia::render('Test', ['regions' => $regions]);
    }
}
