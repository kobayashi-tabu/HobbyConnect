<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Region;

class RegionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $regions = [
            ['name' => '足寄町', 'code' => '01'],
            ['name' => '池田町', 'code' => '02'],
            ['name' => '浦幌町', 'code' => '03'],
            ['name' => '音更町', 'code' => '04'],
            ['name' => '帯広市', 'code' => '05'],
            ['name' => '上士幌町', 'code' => '06'],
            ['name' => '更別村', 'code' => '07'],
            ['name' => '鹿追町', 'code' => '08'],
            ['name' => '士幌町', 'code' => '09'],
            ['name' => '清水町', 'code' => '10'],
            ['name' => '新得町', 'code' => '11'],
            ['name' => '大樹町', 'code' => '12'],
            ['name' => '豊頃町', 'code' => '13'],
            ['name' => '中札内村', 'code' => '14'],
            ['name' => '広尾町', 'code' => '15'],
            ['name' => '本別村', 'code' => '16'],
            ['name' => '幕別町', 'code' => '17'],
            ['name' => '芽室町', 'code' => '18'],
            ['name' => '陸別町', 'code' => '19'],
        ];

        Region::insert($regions);
    }
}
