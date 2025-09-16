<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json([
        'message' => 'Test Task',
        'version' => '1.0.0'
    ]);
});