<?php

namespace App\Http\Controllers;

use App\Models\GlobalProduct;
use App\Services\AdminActivityLogger;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{    /**
     * Display a listing of the products.
     */
    public function index(Request $request)
    {
        $search = $request->input('search');
        $filter = $request->input('filter');
        
        $query = GlobalProduct::query();
        
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
     */
    public function create()
    {
        return Inertia::render('Products/Create');
    }
    
    /**
     * Store a newly created product in storage.
     */    public function store(Request $request)
    {
        $validated = $request->validate([
            'kode_produk' => 'required|string|max:100|unique:global_products',
            'nama_produk' => 'required|string|max:255',
            'kategori' => 'nullable|string|max:255',
            'merek' => 'nullable|string|max:255',
            'deskripsi' => 'nullable|string',
            'gambar_produk' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);
          // Handling the image upload
        if ($request->hasFile('gambar_produk')) {
            try {
                // Simpan gambar dengan permission yang benar
                $file = $request->file('gambar_produk');
                $fileName = time() . '_' . $file->getClientOriginalName();
                $imagePath = $file->storeAs('global-products', $fileName, 'public');
                
                // Pastikan visibility publik
                \Storage::disk('public')->setVisibility($imagePath, 'public');
                
                $validated['gambar_produk'] = $imagePath;
            } catch (\Exception $e) {
                // Log error
                \Log::error('Error uploading product image: ' . $e->getMessage());
            }
        }
        
        $product = GlobalProduct::create($validated);
        
        // Log admin activity
        AdminActivityLogger::log(
            'products', 
            'created',
            "Membuat produk baru: {$product->nama_produk}",
            [
                'product_id' => $product->id,
                'kode_produk' => $product->kode_produk,
                'kategori' => $product->kategori,
                'merek' => $product->merek
            ]
        );
        
        return redirect()->route('products.index')
            ->with('success', 'Produk berhasil ditambahkan');
    }
    
    /**
     * Display the specified product.
     */
    public function show(GlobalProduct $product)
    {
        // Eager load the user products that are based on this global product
        $product->load('userProducts');
        
        return Inertia::render('Products/Show', [
            'product' => $product,
        ]);
    }
    
    /**
     * Show the form for editing the specified product.
     */
    public function edit(GlobalProduct $product)
    {
        return Inertia::render('Products/Edit', [
            'product' => $product,
        ]);
    }    /**
     * Update the specified product in storage.
     */    public function update(Request $request, GlobalProduct $product)
    {
        // Log data yang diterima untuk debugging
        \Log::info('Update Product Request RAW data:', $request->all());
        \Log::info('Current product data:', $product->toArray());
        
        // Periksa flag perubahan yang dikirim dari frontend
        // Gunakan kedua format flag untuk memastikan backward compatibility
        $isKodeChanged = $request->input('_kode_changed') === '1' || 
                         $request->input('_changed_kode_produk') === '1' || 
                         $request->input('kode_produk_changed') === 'YES';
                         
        $isNamaChanged = $request->input('_nama_changed') === '1' || 
                          $request->input('_changed_nama_produk') === '1' || 
                          $request->input('nama_produk_changed') === 'YES';
        
        // Periksa juga apakah nilai field sebenarnya berbeda dari nilai di database
        // Ini sebagai failsafe jika flag tidak dikirim dengan benar
        if (!$isKodeChanged && $request->filled('kode_produk') && 
            $request->input('kode_produk') !== $product->kode_produk) {
            $isKodeChanged = true;
            \Log::info('Kode produk terdeteksi berubah berdasarkan nilai baru vs database');
        }
        
        if (!$isNamaChanged && $request->filled('nama_produk') && 
            $request->input('nama_produk') !== $product->nama_produk) {
            $isNamaChanged = true;
            \Log::info('Nama produk terdeteksi berubah berdasarkan nilai baru vs database');
        }
        
        \Log::info('Field change status:', [
            'kode_produk_changed' => $isKodeChanged ? 'YES' : 'NO',
            'nama_produk_changed' => $isNamaChanged ? 'YES' : 'NO',
            'kode_sent' => $request->input('kode_produk'),
            'nama_sent' => $request->input('nama_produk')
        ]);
        
        // Siapkan data untuk validasi
        $dataToValidate = $request->all();
        $rules = [];
        
        // Tambahkan aturan validasi berdasarkan kebutuhan
        if ($isKodeChanged) {
            $rules['kode_produk'] = 'required|string|max:100|unique:global_products,kode_produk,'.$product->id;
            \Log::info('Will validate and update kode_produk:', ['value' => $dataToValidate['kode_produk']]);
        }
        
        if ($isNamaChanged) {
            $rules['nama_produk'] = 'required|string|max:255';
            \Log::info('Will validate and update nama_produk:', ['value' => $dataToValidate['nama_produk']]);
        }
        
        // Validasi field lainnya
        $rules['kategori'] = 'nullable|string|max:255';
        $rules['merek'] = 'nullable|string|max:255';
        $rules['deskripsi'] = 'nullable|string';
        $rules['is_active'] = 'sometimes|nullable';
          // Hanya validasi gambar jika ada file yang diunggah
        if ($request->hasFile('gambar_produk')) {
            // Support lebih banyak format gambar
            $rules['gambar_produk'] = 'image|mimes:jpeg,png,jpg,gif,webp,svg,bmp|max:2048';
            \Log::info('Gambar produk diunggah:', [
                'name' => $request->file('gambar_produk')->getClientOriginalName(),
                'type' => $request->file('gambar_produk')->getMimeType(),
                'size' => $request->file('gambar_produk')->getSize()
            ]);
        }try {
            // Validasi data
            $validator = \Illuminate\Support\Facades\Validator::make($dataToValidate, $rules);
            
            if ($validator->fails()) {
                \Log::error('Validation failed:', ['errors' => $validator->errors()]);
                return redirect()->back()
                    ->withErrors($validator)
                    ->withInput();
            }
            
            $validated = $validator->validated();
            \Log::info('Validation passed:', $validated);
              // Siapkan data untuk update
            $dataToUpdate = [];
            
            // PENTING: Hanya perbarui field yang benar-benar perlu diperbarui
            // Kode_produk dan nama_produk hanya diperbarui jika flag menunjukkan TRUE
            // atau jika nilai sebenarnya berbeda
            if ($isKodeChanged) {
                $dataToUpdate['kode_produk'] = $request->input('kode_produk');
                \Log::info('WILL UPDATE kode_produk to:', ['new_value' => $request->input('kode_produk')]);
            }
            
            if ($isNamaChanged) {
                $dataToUpdate['nama_produk'] = $request->input('nama_produk');
                \Log::info('WILL UPDATE nama_produk to:', ['new_value' => $request->input('nama_produk')]);
            }
            
            // Field lain selalu diupdate jika ada
            if ($request->has('kategori')) {
                $dataToUpdate['kategori'] = $request->input('kategori');
            }
            
            if ($request->has('merek')) {
                $dataToUpdate['merek'] = $request->input('merek');
            }
            
            if ($request->has('deskripsi')) {
                $dataToUpdate['deskripsi'] = $request->input('deskripsi');
            }
            
            // Pastikan is_active selalu boolean
            if ($request->has('is_active')) {
                $dataToUpdate['is_active'] = filter_var($request->input('is_active'), FILTER_VALIDATE_BOOLEAN);
                \Log::info('Set is_active to:', ['value' => $dataToUpdate['is_active']]);
            }
            
            // VERIFIKASI: Lakukan double-check apakah data akan berubah
            \Log::info('ORIGINAL DATA vs NEW DATA:', [
                'kode_produk' => [
                    'original' => $product->kode_produk,
                    'new' => $isKodeChanged ? $request->input('kode_produk') : $product->kode_produk,
                    'will_change' => $isKodeChanged
                ],
                'nama_produk' => [
                    'original' => $product->nama_produk,
                    'new' => $isNamaChanged ? $request->input('nama_produk') : $product->nama_produk,
                    'will_change' => $isNamaChanged
                ]
            ]);
            
        } catch (\Exception $e) {
            \Log::error('Error during validation:', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            return redirect()->back()
                ->with('error', 'Terjadi kesalahan saat validasi: ' . $e->getMessage())
                ->withInput();
        }// Handling the image upload
        if ($request->hasFile('gambar_produk')) {
            try {
                // Hapus gambar lama jika ada
                if ($product->gambar_produk) {
                    \Log::info('Deleting old image:', ['path' => $product->gambar_produk]);
                    \Storage::disk('public')->delete($product->gambar_produk);
                }
                
                // Simpan gambar baru dengan permission yang benar
                $file = $request->file('gambar_produk');
                $fileName = time() . '_' . $file->getClientOriginalName();
                $imagePath = $file->storeAs('global-products', $fileName, 'public');
                
                // Pastikan visibility publik
                \Storage::disk('public')->setVisibility($imagePath, 'public');
                
                \Log::info('New image saved:', ['path' => $imagePath]);
                $dataToUpdate['gambar_produk'] = $imagePath;
            } catch (\Exception $e) {
                // Log error
                \Log::error('Error uploading product image: ' . $e->getMessage());
            }
        }
        
        \Log::info('Final data to update:', $dataToUpdate);
          try {
            // Update produk dengan data yang telah disiapkan
            $product->update($dataToUpdate);
            \Log::info('Product updated successfully:', [
                'id' => $product->id,
                'updated_fields' => array_keys($dataToUpdate)
            ]);
            
            // Log admin activity if there were changes
            if (!empty($dataToUpdate)) {
                AdminActivityLogger::log(
                    'products', 
                    'updated',
                    "Mengubah produk: {$product->nama_produk}",
                    [
                        'product_id' => $product->id,
                        'kode_produk' => $product->kode_produk,
                        'updated_fields' => array_keys($dataToUpdate),
                        'changes' => $dataToUpdate
                    ]
                );
            }
            
            return redirect()->route('products.index')
                ->with('success', 'Produk berhasil diperbarui');
        } catch (\Exception $e) {
            \Log::error('Error updating product:', [
                'id' => $product->id,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return redirect()->route('products.edit', $product->id)
                ->with('error', 'Gagal memperbarui produk: ' . $e->getMessage());
        }
    }
    
    /**
     * Remove the specified product from storage.
     */    public function destroy(GlobalProduct $product)
    {
        // Check if product is used by any user products
        if ($product->userProducts()->count() > 0) {
            return redirect()->route('products.index')
                ->with('error', 'Produk tidak dapat dihapus karena sedang digunakan oleh pengguna');
        }
        
        $productInfo = [
            'id' => $product->id,
            'kode_produk' => $product->kode_produk,
            'nama_produk' => $product->nama_produk,
            'kategori' => $product->kategori,
            'merek' => $product->merek
        ];
        
        $product->delete();
        
        // Log admin activity
        AdminActivityLogger::log(
            'products', 
            'deleted',
            "Menghapus produk: {$productInfo['nama_produk']}",
            $productInfo
        );
        
        return redirect()->route('products.index')
            ->with('success', 'Produk berhasil dihapus');
    }
}
