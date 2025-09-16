<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\BrandController;

Route::prefix('v1')->group(function () {
    Route::apiResource('brands', BrandController::class);
    Route::get('brands/country/{country_code}', [BrandController::class, 'getByCountry']);
});

Route::get('/test', function () {
    return response()->json([
        'message' => 'API is working!',
        'timestamp' => now()
    ]);
});