<?php

use App\Http\Controllers\Api\ProductCatalogController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and assigned the "api" middleware
| group. Enjoy building your API!
|
*/

// Route untuk katalog produk global
Route::prefix('catalog')->group(function () {
    Route::get('/', [ProductCatalogController::class, 'listCatalog']);
    Route::get('/categories', [ProductCatalogController::class, 'getCategories']);
    Route::get('/brands', [ProductCatalogController::class, 'getBrands']);
    Route::post('/add-to-inventory', [ProductCatalogController::class, 'addProductToInventory']);
});

// Fallback route untuk API
Route::fallback(function(){
    return response()->json([
        'success' => false,
        'message' => 'Endpoint tidak ditemukan. Silahkan periksa URL dan metode permintaan Anda.'
    ], 404);
});
