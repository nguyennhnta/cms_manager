<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\User;

class ProductsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach (range(1, 125) as $index) {
            Product::create([
                'name' => 'Product  '. $index ,
                'description' => 'Lorem ipsum dolor sit amet. Est perferendis dolorem et cupiditate vitae in Quis voluptatem. Et natus ipsum id praesentium veritatis et autem expedita et sapiente aliquam.' ,
                'status' => 'Active',
                'price' => '$499.99',
                'quantity' => '2',
            ]);
        }
    }
}
