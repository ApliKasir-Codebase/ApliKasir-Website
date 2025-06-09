import React from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import Sidebar from '@/Components/Dashboard/Sidebar';
import DashboardHeader from '@/Components/Dashboard/DashboardHeader';
import PageTransition from '@/Components/PageTransition';
import FlashMessage from '@/Components/FlashMessage';

export default function Show({ product }) {
    const { flash } = usePage().props || {};
    
    const handleToggleStatus = () => {
        if (confirm(`Apakah Anda yakin ingin ${product.is_active ? 'menonaktifkan' : 'mengaktifkan'} produk global ini?`)) {
            router.patch(route('global-products.update', product.id), {
                is_active: !product.is_active,
            });
        }
    };
    
    return (
        <div className="min-h-screen bg-white">
            <Head title={`Detail Produk Global - ${product.nama_produk}`} />
            
            {/* Header */}
            <DashboardHeader 
                pageTitle="Detail Produk Global" 
                breadcrumb={[
                    { label: 'Produk Global', url: route('global-products.index') },
                    { label: product.nama_produk }
                ]}
            />
            
            {/* Layout Utama */}
            <div className="flex min-h-screen pt-20">
                <Sidebar />

                {/* Konten Utama */}
                <main className="flex-1 ml-64 p-6 lg:p-8 overflow-y-auto bg-white">
                    <PageTransition>
                        {flash && flash.success && (
                            <FlashMessage message={flash.success} type="success" className="mb-6" />
                        )}
                        
                        {flash && flash.error && (
                            <FlashMessage message={flash.error} type="error" className="mb-6" />
                        )}
                        
                        <div className="mb-6 flex justify-between items-center">
                            <h3 className="text-xl font-semibold text-gray-800">Detail Produk Global</h3>
                            <div className="flex space-x-3">
                                <Link
                                    href={route('global-products.edit', product.id)}
                                    className="px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors duration-300"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={handleToggleStatus}
                                    className={`px-4 py-2 text-white rounded-md transition-colors duration-300 ${product.is_active ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
                                >
                                    {product.is_active ? 'Nonaktifkan' : 'Aktifkan'}
                                </button>
                            </div>
                        </div>
                        
                        <div className="bg-white shadow-md rounded-lg overflow-hidden">
                            <div className="md:grid md:grid-cols-3">
                                {/* Gambar Produk */}
                                <div className="md:col-span-1 bg-gray-50 p-6 flex items-center justify-center">
                                    {product.gambar_produk ? (
                                        <img 
                                            src={`/storage/${product.gambar_produk}`} 
                                            alt={product.nama_produk}
                                            className="max-w-full h-auto rounded-lg object-contain max-h-80" 
                                        />
                                    ) : (
                                        <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                                            <span className="text-gray-500">Tidak ada gambar</span>
                                        </div>
                                    )}
                                </div>
                                
                                {/* Informasi Produk */}
                                <div className="md:col-span-2 p-6">
                                    <div className="mb-2 flex items-center">
                                        <h2 className="text-2xl font-bold text-gray-800">{product.nama_produk}</h2>
                                        <span className={`ml-3 px-3 py-1 text-xs font-semibold rounded-full ${product.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                            {product.is_active ? 'Aktif' : 'Tidak Aktif'}
                                        </span>
                                    </div>
                                    
                                    <div className="mt-6 space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <h4 className="text-sm font-medium text-gray-500">Kode Produk</h4>
                                                <p className="mt-1 text-lg font-medium">{product.kode_produk}</p>
                                            </div>
                                            
                                            <div>
                                                <h4 className="text-sm font-medium text-gray-500">Kategori</h4>
                                                <p className="mt-1 text-lg">{product.kategori || '-'}</p>
                                            </div>
                                            
                                            <div>
                                                <h4 className="text-sm font-medium text-gray-500">Merek</h4>
                                                <p className="mt-1 text-lg">{product.merek || '-'}</p>
                                            </div>
                                            
                                            <div>
                                                <h4 className="text-sm font-medium text-gray-500">Tanggal Dibuat</h4>
                                                <p className="mt-1 text-lg">{new Date(product.created_at).toLocaleDateString('id-ID', { 
                                                    day: 'numeric', 
                                                    month: 'long', 
                                                    year: 'numeric' 
                                                })}</p>
                                            </div>
                                        </div>
                                        
                                        <div className="pt-4">
                                            <h4 className="text-sm font-medium text-gray-500">Deskripsi</h4>
                                            <p className="mt-2 text-gray-700 whitespace-pre-wrap">{product.deskripsi || '-'}</p>
                                        </div>
                                        
                                        <div className="pt-4">
                                            <h4 className="text-sm font-medium text-gray-500">Penggunaan Produk</h4>
                                            <p className="mt-1 text-gray-700">
                                                Produk ini adalah bagian dari repositori produk global yang digunakan untuk verifikasi 
                                                produk pengguna. Kode produk ini dicocokkan dengan produk pengguna untuk validasi.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="mt-6">
                            <Link
                                href={route('global-products.index')}
                                className="text-blue-600 hover:text-blue-800 transition-colors duration-300"
                            >
                                &larr; Kembali ke daftar produk global
                            </Link>
                        </div>
                    </PageTransition>
                </main>
            </div>
        </div>
    );
}
