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
            'password' => 'password',
            'created_at' => date('Y-m-d H:i:s')
        ]);

        $this->command->info('Users table seeded.');
    }
}
