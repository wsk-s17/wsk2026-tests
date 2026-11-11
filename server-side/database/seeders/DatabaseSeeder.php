<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $demo = User::create([
            'name' => 'Demo',
            'email' => 'demo@test.wsk',
            'password' => 'demopass',
        ]);

        $demo->notes()->create([
            'title' => 'Welcome',
            'body' => 'This note was created by the seeder.',
        ]);
    }
}
