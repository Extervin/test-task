<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Brand;

class BrandSeeder extends Seeder
{
    public function run(): void
    {
        Brand::create([
            'brand_name' => 'Test Casino 1',
            'brand_image' => 'https://placehold.co/150/007acc/ffffff?text=Test+1',
            'rating' => 5,
            'country_code' => 'default'
        ]);

        Brand::create([
            'brand_name' => 'Test Casino 2',
            'brand_image' => 'https://placehold.co/150/6a1b9a/ffffff?text=Test+2',
            'rating' => 4,
            'country_code' => 'default'
        ]);

        Brand::create([
            'brand_name' => 'Test Casino 3',
            'brand_image' => 'https://placehold.co/150/2e7d32/ffffff?text=Test+3',
            'rating' => 5,
            'country_code' => 'default'
        ]);

        Brand::create([
            'brand_name' => 'Test Casino 4',
            'brand_image' => 'https://placehold.co/150/9c27b0/ffffff?text=Test+4',
            'rating' => 3,
            'country_code' => 'default'
        ]);
        Brand::create([
            'brand_name' => 'BG Test Casino 1',
            'brand_image' => 'https://placehold.co/150/d32f2f/ffffff?text=BG+Test+1',
            'rating' => 4,
            'country_code' => 'bg'
        ]);

        Brand::create([
            'brand_name' => 'BG Test Casino 2',
            'brand_image' => 'https://placehold.co/150/1976d2/ffffff?text=BG+Test+2',
            'rating' => 5,
            'country_code' => 'bg'
        ]);

        Brand::create([
            'brand_name' => 'BG Test Casino 3',
            'brand_image' => 'https://placehold.co/150/388e3c/ffffff?text=BG+Test+3',
            'rating' => 3,
            'country_code' => 'bg'
        ]);
        Brand::create([
            'brand_name' => 'US Test Casino 1',
            'brand_image' => 'https://placehold.co/150/ff5722/ffffff?text=US+Test+1',
            'rating' => 4,
            'country_code' => 'us'
        ]);

        Brand::create([
            'brand_name' => 'FR Test Casino 1',
            'brand_image' => 'https://placehold.co/150/3f51b5/ffffff?text=FR+Test+1',
            'rating' => 4,
            'country_code' => 'fr'
        ]);
    }
}