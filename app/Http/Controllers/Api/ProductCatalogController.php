<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\GlobalProduct;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ProductCatalogController extends Controller
{
    /**
     * Menampilkan katalog produk global yang tersedia untuk dipilih
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function listCatalog(Request $request)
    {
        // Filter katalog berdasarkan kategori, merek, atau pencarian
        $query = GlobalProduct::query();
        
        if ($request->has('kategori')) {
            $query->where('kategori', $request->kategori);
        }
        
        if ($request->has('merek')) {
            $query->where('merek', $request->merek);
        }
        
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('nama_produk', 'like', "%{$search}%")
                  ->orWhere('kode_produk', 'like', "%{$search}%")
                  ->orWhere('deskripsi', 'like', "%{$search}%");
            });
        }
        
        // Hanya ambil produk yang aktif
        $query->where('is_active', true);
        
        // Paginate hasil
        $products = $query->paginate(20);
        
        // Return katalog produk
        return response()->json([
            'success' => true,
            'products' => $products,
        ]);
    }
    
    /**
     * Ambil daftar kategori yang tersedia di katalog
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function getCategories()
    {
        $categories = GlobalProduct::where('is_active', true)
            ->select('kategori')
            ->distinct()
            ->orderBy('kategori')
            ->pluck('kategori');
            
        return response()->json([
            'success' => true,
            'categories' => $categories,
        ]);
    }
    
    /**
     * Ambil daftar merek yang tersedia di katalog
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function getBrands()
    {
        $brands = GlobalProduct::where('is_active', true)
            ->select('merek')
            ->distinct()
            ->orderBy('merek')
            ->pluck('merek');
            
        return response()->json([
            'success' => true,
            'brands' => $brands,
        ]);
    }
    
    /**
     * Tambahkan produk dari katalog ke inventaris toko pengguna
     * 
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function addProductToInventory(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'global_product_id' => 'required|exists:global_products,id',
            'harga_modal' => 'required|numeric|min:0',
            'harga_jual' => 'required|numeric|min:0',
            'jumlah_produk' => 'required|integer|min:0',
        ]);
        
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validasi gagal',
                'errors' => $validator->errors()
            ], 422);
        }
        
        // Ambil user yang sedang login
        $user = Auth::user();
        
        // Ambil produk global
        $globalProduct = GlobalProduct::find($request->global_product_id);
        if (!$globalProduct) {
            return response()->json([
                'success' => false,
                'message' => 'Produk global tidak ditemukan'
            ], 404);
        }
        
        // Periksa apakah produk sudah ada di inventaris
        $existingProduct = Product::where('id_pengguna', $user->id)
            ->where('global_product_id', $globalProduct->id)
            ->first();
            
        if ($existingProduct) {
            return response()->json([
                'success' => false,
                'message' => 'Produk sudah ada di inventaris Anda',
                'product' => $existingProduct
            ], 409);
        }
        
        // Buat kode produk unik untuk toko
        $storePrefix = strtoupper(substr(preg_replace('/[^a-zA-Z0-9]/', '', $user->storeName), 0, 2));
        if (empty($storePrefix)) {
            $storePrefix = 'ST';
        }
        $productCode = $storePrefix . '-' . $globalProduct->kode_produk;
        
        // Tambahkan produk ke inventaris
        $product = Product::create([
            'id_pengguna' => $user->id,
            'global_product_id' => $globalProduct->id,
            'nama_produk' => $globalProduct->nama_produk,
            'kode_produk' => $productCode,
            'jumlah_produk' => $request->jumlah_produk,
            'harga_modal' => $request->harga_modal,
            'harga_jual' => $request->harga_jual,
            'gambar_produk' => $globalProduct->gambar_produk
        ]);
        
        return response()->json([
            'success' => true,
            'message' => 'Produk berhasil ditambahkan ke inventaris',
            'product' => $product
        ]);
    }
}
