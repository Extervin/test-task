<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Brand extends Model
{
    use HasFactory;

    protected $primaryKey = 'brand_id';
    
    protected $fillable = [
        'brand_name',
        'brand_image', 
        'rating',
        'country_code'
    ];

    protected $casts = [
        'rating' => 'integer'
    ];

    public static function getByCountry($country_code)
    {
        $brands = self::where('country_code', $country_code)
                     ->orderBy('rating', 'desc')
                     ->get();
        
        if ($brands->isEmpty()) {
            $brands = self::where('country_code', 'default')
                         ->orderBy('rating', 'desc')
                         ->get();
        }
        
        return $brands;
    }
}