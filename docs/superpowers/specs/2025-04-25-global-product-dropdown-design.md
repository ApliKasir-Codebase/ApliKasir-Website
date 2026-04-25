# Design Spec: Global Product Dropdown & Inventory Action

## Context
Branch `feature/rakha-global-product` already implements the requested feature on the Products index page.

## Current Implementation

### UI Changes (Products/Index.jsx)
- Line 75-106: Dropdown button "Tambah Produk" with two actions:
  - "Tambah Produk ke Inventori" → route `products.create`
  - "Tambah Produk Global" → route `global-products.create`
- Click-outside-to-close behavior already implemented.
- No changes needed — already matches requirement.

### Global Product Form (GlobalProducts/Create.jsx)
Fields:
- `kode_produk` — required, unique
- `nama_produk` — required
- `kategori` — required
- `merek` — optional (nullable string)
- `deskripsi` — optional
- `gambar_produk` — optional image upload
- `is_active` — checkbox (default true)

Backend validation (GlobalProductController@store) enforces:
- `kode_produk` required, unique
- `nama_produk` required
- `kategori` required
- `merek` nullable string

### "Add to Inventory" (Products/Create.jsx)
Existing form allows selecting a global product from dropdown and auto-fills fields. Store (`user_id`) selection is required. Submission creates a Product associated with that store.

### Filtering (GlobalProducts/Index.jsx)
- Select dropdowns for `kategori` and `merek` populated with distinct values from `global_products`.
- Search and status filters also available.
- Matches "filter global product" requirement.

## Test Coverage (already present)

GlobalProductTest.php:
- `admin can create global product` — POST with valid data succeeds
- `admin cannot create global product without required fields` — validation fails when nama/kategori missing
- `admin cannot create global product with duplicate kode_produk` — unique constraint enforced
- `admin can list and filter global products by kategori` — category filter works
- `admin can filter global products by merek` — brand filter works

ProductInventoryTest.php:
- `admin can add global product to inventory for a store` — links global product to store via Product creation
- `admin can verify global product code via API` — verification endpoint works
- `admin can create inventory product without global product reference` — standalone product creation works

## Deliverables Status

| Item | Status |
|------|--------|
| Dropdown on product page | ✅ Implemented (Products/Index.jsx:75-106) |
| Tambah Produk ke Inventori | ✅ Works (Products/Create.jsx) |
| Tambah Produk Global form | ✅ Works (GlobalProducts/Create.jsx) |
| Test tambah global product berhasil | ✅ GlobalProductTest line 7 |
| Test validasi global product gagal | ✅ GlobalProductTest line 33 |
| Test filter global product | ✅ GlobalProductTest lines 82 & 120 |
| Test add global product ke inventory | ✅ ProductInventoryTest line 8 |
| Screenshots | ⚠️ Manual: user must capture |
| Pull request | ⚠️ Manual: user must create PR from branch |

## Notes
- No code changes required; feature is already complete on this branch.
- Linting/typechecking not configured beyond PHP; PHPStan/Pint not found in composer.json.
- All PHP tests pass: `php artisan test` returns green.
