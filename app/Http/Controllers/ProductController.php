<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Services\AdminActivityLogger;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProductController extends Controller
{    /**
     * Display a listing of the products.
     * For non-admin users, shows only the catalog (global products) and their own products.
     * For admin users, shows all products with the option to filter by user.
     */
    public function index(Request $request)
    {
        $search = $request->input('search');
        $filter = $request->input('filter');
        $scope = $request->input('scope', 'all'); // 'all', 'catalog', 'my'
        
        $query = Product::query();
        
        // Apply scope
        if ($scope === 'catalog') {
            $query->catalog(); // Only global catalog products
        } elseif ($scope === 'my') {
            $query->ownedBy(auth()->id()); // Only current user's products
        } else {
            // For regular users: show only global products and their own
            if (!auth()->user()->isAdmin) {
                $query->where(function($q) {
                    $q->whereNull('user_id')
                      ->orWhere('user_id', auth()->id());
                });
            }
            // For admin: show all products
        }
        
        // Apply search if provided
        if ($search) {
            $query->where(function($q) use ($search) {
                $q->where('nama_produk', 'like', "%{$search}%")
                  ->orWhere('kode_produk', 'like', "%{$search}%")
                  ->orWhere('kategori', 'like', "%{$search}%")
                  ->orWhere('merek', 'like', "%{$search}%");
            });
        }
        
        // Apply filters if provided
        if ($filter) {
            if ($filter === 'active') {
                $query->where('is_active', true);
            } elseif ($filter === 'inactive') {
                $query->where('is_active', false);
            } elseif (in_array($filter, ['kategori', 'merek'])) {
                $query->whereNotNull($filter)->orderBy($filter);
            }
        }
        
        $products = $query->orderBy('nama_produk')
            ->paginate(10)
            ->withQueryString();
              return Inertia::render('Products/Index', [
            'products' => $products,
            'filters' => [
                'search' => $search,
                'filter' => $filter,
            ],
        ]);
    }
      /**
     * Show the form for creating a new product.
     * For admin users: creates a catalog product (global)
     * For regular users: creates a user-specific product
     */
    public function create()
    {
        // Load catalog products for reference when creating user products
        $catalogProducts = [];
        if (!auth()->user()->isAdmin) {
            $catalogProducts = Product::catalog()->orderBy('nama_produk')->get();
        }
        
        return Inertia::render('Products/Create', [
            'catalogProducts' => $catalogProducts
        ]);
    }
    
    /**
     * Store a newly created product in storage.
     */
    public function store(Request $request)
    {
        $user = auth()->user();
        $isAdmin = $user->isAdmin;
        
        // Different validation rules for admins (catalog products) and users (user products)
        if ($isAdmin) {
            // Admin creating a catalog product
            $validated = $request->validate([
                'kode_produk' => 'required|string|max:100|unique:products',
                'nama_produk' => 'required|string|max:255',
                'kategori' => 'nullable|string|max:255',
                'merek' => 'nullable|string|max:255',
                'deskripsi' => 'nullable|string',
                'gambar_produk' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            ]);
        } else {
            // Regular user creating their own product
            $validated = $request->validate([
                'kode_produk' => 'nullable|string|max:100',
                'nama_produk' => 'required|string|max:255',
                'jumlah_produk' => 'required|integer|min:0',
                'harga_modal' => 'required|numeric|min:0',
                'harga_jual' => 'required|numeric|min:0',
                'catalog_product_id' => 'nullable|exists:products,id', // Optional reference to a catalog product
                'gambar_produk' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            ]);
            
            // Set user_id for user-specific product
            $validated['user_id'] = $user->id;
            
            // If selecting from catalog, copy some details
            if (!empty($validated['catalog_product_id'])) {
                $catalogProduct = Product::find($validated['catalog_product_id']);
                if ($catalogProduct) {
                    // If no product code provided, generate one based on catalog
                    if (empty($validated['kode_produk']) && !empty($catalogProduct->kode_produk)) {
                        $storePrefix = strtoupper(substr(preg_replace('/[^a-zA-Z0-9]/', '', $user->storeName), 0, 2));
                        if (empty($storePrefix)) $storePrefix = 'ST';
                        $validated['kode_produk'] = $storePrefix . '-' . $catalogProduct->kode_produk;
                    }
                    
                    // Copy image if not uploading a new one
                    if (!$request->hasFile('gambar_produk') && !empty($catalogProduct->gambar_produk)) {
                        $validated['gambar_produk'] = $catalogProduct->gambar_produk;
                    }
                }
                
                // Remove catalog_product_id from validated data (not in database)
                unset($validated['catalog_product_id']);
            }
        }
        
        // Handling the image upload
        if ($request->hasFile('gambar_produk')) {
            try {
                // Save image with correct permissions
                $file = $request->file('gambar_produk');
                $fileName = time() . '_' . $file->getClientOriginalName();
                $folderName = $isAdmin ? 'catalog-products' : 'user-products';
                $imagePath = $file->storeAs($folderName, $fileName, 'public');
                
                // Ensure public visibility
                Storage::disk('public')->setVisibility($imagePath, 'public');
                
                $validated['gambar_produk'] = $imagePath;
            } catch (\Exception $e) {
                // Log error
                Log::error('Error uploading product image: ' . $e->getMessage());
            }
        }
          $product = Product::create($validated);
        
        if (auth()->user()->isAdmin) {
            // Log admin activity for catalog products
            AdminActivityLogger::log(
                'products', 
                'created',
                "Membuat produk katalog baru: {$product->nama_produk}",
                [
                    'product_id' => $product->id,
                    'kode_produk' => $product->kode_produk,
                    'kategori' => $product->kategori ?? null,
                    'merek' => $product->merek ?? null
                ]
            );
        }
          
        return redirect()->route('products.index')
            ->with('success', 'Produk berhasil ditambahkan');
    }
      /**
     * Display the specified product.
     */
    public function show(Product $product)
    {        // Load transactions that reference this product
        $product->load('transactions');        return Inertia::render('Products/Show', [
            'product' => $product,
        ]);
    }
      /**
     * Show the form for editing the specified product.
     */
    public function edit(Product $product)
    {        return Inertia::render('Products/Edit', [
            'product' => $product,
        ]);
    }
      /**
     * Update the specified product in storage.
     */
    public function update(Request $request, Product $product)
    {
        // Validate request
        $validatedData = $request->validate([
            'kode_produk' => 'required|string|max:100|unique:products,kode_produk,' . $product->id,
            'nama_produk' => 'required|string|max:255',
            'kategori' => 'nullable|string|max:255',
            'merek' => 'nullable|string|max:255',
            'deskripsi' => 'nullable|string',
            'is_active' => 'sometimes|boolean',
            'gambar_produk' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);
        
        // Handle image upload
        if ($request->hasFile('gambar_produk')) {
            try {                // Delete old image if exists
                if ($product->gambar_produk) {
                    Storage::disk('public')->delete($product->gambar_produk);
                }
                
                // Save new image
                $file = $request->file('gambar_produk');
                $fileName = time() . '_' . $file->getClientOriginalName();
                $imagePath = $file->storeAs('global-products', $fileName, 'public');
                  // Ensure public visibility
                Storage::disk('public')->setVisibility($imagePath, 'public');
                
                $validatedData['gambar_produk'] = $imagePath;
            } catch (\Exception $e) {
                Log::error('Error uploading product image: ' . $e->getMessage());
            }
        }
        
        // Update the product
        $product->update($validatedData);
        
        // Log admin activity
        AdminActivityLogger::log(
            'products', 
            'updated',
            "Memperbarui produk: {$product->nama_produk}",
            [
                'product_id' => $product->id,
                'kode_produk' => $product->kode_produk,
                'kategori' => $product->kategori,
                'merek' => $product->merek
            ]
        );
          return redirect()->route('products.index')
            ->with('success', 'Produk berhasil diperbarui');
    }
      /**
     * Remove the specified product from storage.
     */
    public function destroy(Product $product)
    {        // Store product info for logs before deletion
        $productInfo = [
            'id' => $product->id,
            'nama' => $product->nama_produk,
            'kode' => $product->kode_produk
        ];
        
        // Delete image if exists
        if ($product->gambar_produk) {
            Storage::disk('public')->delete($product->gambar_produk);
        }
        
        // Delete the product
        $product->delete();
        
        // Log admin activity
        AdminActivityLogger::log(
            'products', 
            'deleted',
            "Menghapus produk: {$productInfo['nama']}",
            [
                'product_id' => $productInfo['id'],
                'kode_produk' => $productInfo['kode']
            ]
        );
          return redirect()->route('products.index')
            ->with('success', 'Produk berhasil dihapus');
    }
    
    /**
     * Verify a product code against global products
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function verifyProductCode(Request $request)
    {
        $request->validate([
            'kode_produk' => 'required|string|max:100',
        ]);
          $kodeProduct = $request->input('kode_produk');
        $product = Product::verifyProductCode($kodeProduct);
          if ($product) {
            return response()->json([
                'success' => true,
                'message' => 'Kode produk valid dan terverifikasi',
                'product' => $product
            ]);
        }
        
        return response()->json([
            'success' => false,
            'message' => 'Kode produk tidak valid atau tidak aktif'
        ]);
    }
}
