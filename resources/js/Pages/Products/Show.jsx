import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Sidebar from '@/Components/Dashboard/Sidebar';
import DashboardHeader from '@/Components/Dashboard/DashboardHeader';
import PageTransition from '@/Components/PageTransition';

export default function Show({ product }) {
    return (
        <div className="min-h-screen bg-white">
            <Head title={`Produk - ${product.nama_produk}`} />
            
            {/* Header */}
            <DashboardHeader 
                pageTitle="Detail Produk" 
                breadcrumb={[
                    { label: 'Produk', url: route('products.index') },
                    { label: product.nama_produk }
                ]}
            />
            
            {/* Layout Utama */}
            <div className="flex min-h-screen pt-20">                
                <Sidebar />                
                
                {/* Konten Utama */}
                <main className="flex-1 ml-64 p-6 lg:p-8 overflow-y-auto bg-white">
                    <PageTransition>
                        <div className="overflow-hidden bg-white shadow sm:rounded-lg">
                            <div className="p-6">
                                <div className="mb-6 flex justify-between">
                                    <h3 className="text-xl font-semibold text-gray-800">Informasi Produk</h3>                                    <div className="flex space-x-2">
                                        <Link
                                            href={route('products.edit', product.id)}
                                            className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700 transition-colors duration-300 flex items-center"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                            Edit Produk
                                        </Link>
                                        <Link
                                            href={route('products.index')}
                                            className="rounded-md bg-gray-200 px-4 py-2 text-sm text-gray-700 hover:bg-gray-300 transition-colors duration-300"
                                        >
                                            Kembali
                                        </Link>
                                    </div>
                                </div>                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div className="overflow-hidden shadow-sm border border-gray-200 rounded-lg">
                                            <div className="p-6 space-y-4">
                                                <div>
                                                    <h4 className="text-sm font-medium text-gray-500">KODE PRODUK</h4>
                                                    <p className="mt-1 text-lg font-medium text-gray-900">{product.kode_produk}</p>
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-medium text-gray-500">NAMA PRODUK</h4>
                                                    <p className="mt-1 text-lg font-medium text-gray-900">{product.nama_produk}</p>
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-medium text-gray-500">KATEGORI</h4>
                                                    <p className="mt-1 text-lg font-medium text-gray-900">{product.kategori || '-'}</p>
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-medium text-gray-500">MEREK</h4>
                                                    <p className="mt-1 text-lg font-medium text-gray-900">{product.merek || '-'}</p>
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-medium text-gray-500">STATUS</h4>
                                                    <p className="mt-1">
                                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${product.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                            {product.is_active ? 'Aktif' : 'Tidak Aktif'}
                                                        </span>
                                                    </p>
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-medium text-gray-500">TANGGAL DIBUAT</h4>
                                                    <p className="mt-1 text-lg font-medium text-gray-900">
                                                        {new Date(product.created_at).toLocaleDateString('id-ID', {
                                                            day: 'numeric',
                                                            month: 'long',
                                                            year: 'numeric',
                                                        })}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        {product.userProducts && product.userProducts.length > 0 && (
                                            <div className="overflow-hidden shadow-sm border border-gray-200 rounded-lg">
                                                <div className="p-6 space-y-4">
                                                    <div>
                                                        <h4 className="text-sm font-medium text-gray-500">PRODUK PENGGUNA</h4>
                                                        <div className="mt-3 space-y-3">
                                                            {product.userProducts.map((userProduct, index) => (
                                                                <div key={userProduct.id} className="bg-gray-50 p-3 rounded-lg">
                                                                    <div className="flex justify-between items-center">
                                                                        <span className="font-medium text-gray-900">
                                                                            {userProduct.user ? userProduct.user.storeName : '-'}
                                                                        </span>
                                                                        <span className="text-sm text-blue-600 font-semibold">
                                                                            {userProduct.harga_jual ? 
                                                                                new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(userProduct.harga_jual) : 
                                                                                '-'
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                    <div className="mt-1 flex justify-between text-xs text-gray-500">
                                                                        <span>Stok: {userProduct.stok || 0}</span>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-4">                                        <div className="overflow-hidden shadow-sm border border-gray-200 rounded-lg">
                                            <div className="p-6 space-y-4">
                                                <div>
                                                    <h4 className="text-sm font-medium text-gray-500">GAMBAR PRODUK</h4>
                                                    {product.gambar_produk ? (
                                                        <div className="mt-1">
                                                            <img 
                                                                src={`/storage/${product.gambar_produk}`} 
                                                                alt={product.nama_produk} 
                                                                className="w-full h-auto rounded-lg shadow-md" 
                                                            />
                                                        </div>
                                                    ) : (
                                                        <div className="mt-1 w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                                                            Tidak ada gambar
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>                                        <div className="overflow-hidden shadow-sm border border-gray-200 rounded-lg">
                                            <div className="p-6 space-y-4">
                                                <div>
                                                    <h4 className="text-sm font-medium text-gray-500">DESKRIPSI</h4>
                                                    <p className="mt-1 text-gray-700 whitespace-pre-line">
                                                        {product.deskripsi || 'Tidak ada deskripsi'}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {product.userProducts && product.userProducts.length > 0 && (
                                    <div className="mt-8">
                                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Produk Pengguna</h3>
                                        <div className="overflow-x-auto rounded-lg shadow">
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead className="bg-gray-50">
                                                    <tr>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Toko</th>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Harga Jual</th>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stok</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    {product.userProducts.map((userProduct, index) => (
                                                        <tr key={userProduct.id} className="hover:bg-gray-50 transition-colors duration-200">
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                                {userProduct.user ? userProduct.user.storeName : '-'}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                {userProduct.harga_jual ? 
                                                                    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(userProduct.harga_jual) : 
                                                                    '-'
                                                                }
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{userProduct.stok || 0}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </PageTransition>
                </main>
            </div>
        </div>
    );
}
