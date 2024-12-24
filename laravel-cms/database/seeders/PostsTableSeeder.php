<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Post;
use App\Models\User;

class PostsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $userIds = User::pluck('id');
        foreach (range(1, 10) as $index) {
            Post::create([
                'title' => 'Bài viết số ' . $index,
                'content' => 'Nội dung của bài viết số ' . $index,
                'author_id' => $userIds->random(), // Chọn ngẫu nhiên 1 user làm tác giả
            ]);
        }
    }
}
