<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class BrandController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $country_code = $request->header('CF-IPCountry', 'default');

        if ($country_code === 'default' && $request->ip() !== '127.0.0.1') {
        }
        
        $brands = Brand::getByCountry(strtolower($country_code));
        
        return response()->json([
            'success' => true,
            'country' => $country_code,
            'data' => $brands
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'brand_name' => 'required|string|max:255',
            'brand_image' => 'required|url',
            'rating' => 'required|integer|min:1|max:5',
            'country_code' => 'required|string|size:2'
        ]);

        $brand = Brand::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Brand created successfully',
            'data' => $brand
        ], 201);
    }

    public function show(Brand $brand): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => $brand
        ]);
    }

    public function update(Request $request, Brand $brand): JsonResponse
    {
        $validated = $request->validate([
            'brand_name' => 'sometimes|string|max:255',
            'brand_image' => 'sometimes|url',
            'rating' => 'sometimes|integer|min:1|max:5',
            'country_code' => 'sometimes|string|size:2'
        ]);

        $brand->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Brand updated successfully',
            'data' => $brand->fresh()
        ]);
    }

    public function destroy(Brand $brand): JsonResponse
    {
        $brand->delete();

        return response()->json([
            'success' => true,
            'message' => 'Brand deleted successfully'
        ]);
    }

    public function getByCountry($country_code): JsonResponse
    {
        $brands = Brand::getByCountry($country_code);

        return response()->json([
            'success' => true,
            'country' => $country_code,
            'data' => $brands
        ]);
    }
}