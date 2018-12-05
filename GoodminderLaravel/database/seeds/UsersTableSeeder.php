<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        DB::table('users')->insert([
            'name' => 'Admin',
            'nickname' => 'Standard',
            'email' => 'email@goodminder.com',
            'password' => '$2y$10$df1Wwa01vNxiVz5zQo48iOWx3//CvyDjSJeV5x3/LN6Ylh86o5.x2',
            'created_at' => date('Y-m-d H:i:s')
        ]);

        $this->command->info('Users table seeded.');
    }
}
