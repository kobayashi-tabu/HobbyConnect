<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Hobby;

class HobbiesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $hobbies = [
            ['name' => '読書', 'code' => '01'],
            ['name' => '映画', 'code' => '02'],
            ['name' => 'スポーツ', 'code' => '03'],
            ['name' => '料理', 'code' => '04'],
            ['name' => '農業', 'code' => '05'],
            ['name' => 'アウトドア', 'code' => '06'],
            ['name' => 'ゲーム', 'code' => '07'],
            ['name' => '写真', 'code' => '08'],
            ['name' => 'ペット', 'code' => '09'],
            ['name' => '温泉・サウナ', 'code' => '10'],
            ['name' => 'フィットネス', 'code' => '11'],
            ['name' => '音楽', 'code' => '12'],
            ['name' => 'その他', 'code' => '13'],
        ];

        Hobby::insert($hobbies);
    }
}
