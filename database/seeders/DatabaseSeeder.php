<?php

namespace Database\Seeders;

use App\Models\Region;
use App\Models\Hobby;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(HobbiesTableSeeder::class);

        $this->call(RegionsTableSeeder::class);
    }
}
