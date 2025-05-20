import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Sidebar from '@/Components/Dashboard/Sidebar';
import DashboardHeader from '@/Components/Dashboard/DashboardHeader';
import PageTransition from '@/Components/PageTransition';

export default function Show({ user, auth, customerDebts }) {
    return (
        <div className="min-h-screen bg-white">
            <Head title={`Pengguna - ${user.name}`} />
            
            {/* Header */}
            <DashboardHeader 
                pageTitle="Detail Pengguna" 
                breadcrumb={[
                    { label: 'Pengguna', url: route('users.index') },
                    { label: user.name }
                ]}
            />
            
            {/* Layout Utama */}
            <div className="flex min-h-screen pt-20">                
                <Sidebar />                {/* Konten Utama */}
                <main className="flex-1 ml-64 p-6 lg:p-8 overflow-y-auto bg-white">
                    <PageTransition>
                        <div className="overflow-hidden bg-white shadow sm:rounded-lg">
                            <div className="p-6">
                                <div className="mb-6 flex justify-between">
                                    <h3 className="text-xl font-semibold text-gray-800">Informasi Pengguna</h3>                                    <div className="flex space-x-2">
                                        <Link
                                            href={route('users.edit', user.id)}
                                            className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700 transition-colors duration-300 flex items-center"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                            Edit Pengguna
                                        </Link>
                                        <Link
                                            href={route('users.index')}
                                            className="rounded-md bg-gray-200 px-4 py-2 text-sm text-gray-700 hover:bg-gray-300 transition-colors duration-300"
                                        >
                                            Kembali
                                        </Link>
                                    </div>
                                </div>

                                <div className="overflow-hidden bg-white shadow sm:rounded-lg">
                                    <div className="border-t border-gray-200">
                                        <dl>
                                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                <dt className="text-sm font-medium text-gray-500">Nama</dt>
                                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{user.name}</dd>
                                            </div>
                                            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                <dt className="text-sm font-medium text-gray-500">Email</dt>
                                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{user.email}</dd>
                                            </div>
                                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                <dt className="text-sm font-medium text-gray-500">Nomor Telepon</dt>
                                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{user.phoneNumber}</dd>
                                            </div>
                                            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                <dt className="text-sm font-medium text-gray-500">Nama Toko</dt>
                                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{user.storeName}</dd>
                                            </div>
                                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                <dt className="text-sm font-medium text-gray-500">Alamat Toko</dt>
                                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{user.storeAddress}</dd>
                                            </div>
                                            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                <dt className="text-sm font-medium text-gray-500">Tanggal Bergabung</dt>
                                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                                    {new Date(user.created_at).toLocaleDateString('id-ID', {
                                                        day: 'numeric',
                                                        month: 'long',
                                                        year: 'numeric',
                                                    })}
                                                </dd>
                                            </div>
                                        </dl>
                                    </div>
                                </div>                            
                            </div>                        </div>

                        {/* Card Pelanggan */}
                        <div className="mt-6 overflow-hidden bg-white shadow sm:rounded-lg">
                            <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                                <div>
                                    <h3 className="text-lg font-medium leading-6 text-gray-900">Daftar Pelanggan</h3>
                                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                        Pelanggan yang terdaftar oleh pengguna ini.
                                    </p>
                                </div>
                            </div>
                            
                            <div className="border-t border-gray-200">
                                {user.customers && user.customers.length > 0 ? (
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Pelanggan</th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nomor Telepon</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {user.customers.map((customer, index) => (
                                                    <tr key={customer.id}>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{customer.nama_pelanggan}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.nomor_telepon || '-'}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <div className="px-6 py-4 text-center text-sm text-gray-500">
                                        Pengguna ini belum memiliki pelanggan.
                                    </div>
                                )}
                            </div>
                        </div>
                        
                        {/* Card Transaksi Terbaru */}
                        <div className="mt-6 overflow-hidden bg-white shadow sm:rounded-lg">
                            <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                                <div>
                                    <h3 className="text-lg font-medium leading-6 text-gray-900">Riwayat Transaksi Terbaru</h3>
                                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                        Transaksi terbaru yang dilakukan oleh pengguna ini.
                                    </p>
                                </div>
                            </div>
                            
                            <div className="border-t border-gray-200">
                                {user.transactions && user.transactions.length > 0 ? (
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pelanggan</th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Metode</th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {user.transactions.map((transaction, index) => (
                                                    <tr key={transaction.id}>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            {new Date(transaction.tanggal_transaksi).toLocaleDateString('id-ID', {
                                                                day: 'numeric',
                                                                month: 'short',
                                                                year: 'numeric',
                                                            })}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                            {transaction.customer ? transaction.customer.nama_pelanggan : 'Umum'}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                                                            Rp {parseInt(transaction.total_belanja).toLocaleString('id-ID')}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            {transaction.metode_pembayaran}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                                transaction.status_pembayaran === 'Lunas' 
                                                                    ? 'bg-green-100 text-green-800' 
                                                                    : 'bg-yellow-100 text-yellow-800'
                                                            }`}>
                                                                {transaction.status_pembayaran}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <div className="px-6 py-4 text-center text-sm text-gray-500">
                                        Pengguna ini belum memiliki transaksi.
                                    </div>
                                )}
                            </div>
                        </div>                        {/* Card Produk Pengguna */}
                        <div className="mt-6 overflow-hidden bg-white shadow sm:rounded-lg">
                            <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                                <div>
                                    <h3 className="text-lg font-medium leading-6 text-gray-900">Produk Pengguna</h3>
                                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                        Daftar produk yang dimiliki oleh pengguna ini.
                                    </p>
                                </div>
                            </div>
                            
                            <div className="border-t border-gray-200 p-4">
                                {user.products && user.products.length > 0 ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                        {user.products.map((product) => (
                                            <div key={product.id} className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                                <div className="aspect-w-3 aspect-h-2">
                                                    {product.gambar_produk ? (
                                                        <img 
                                                            src={`/storage/${product.gambar_produk}`} 
                                                            alt={product.nama_produk} 
                                                            className="w-full h-32 object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-32 bg-gray-100 flex items-center justify-center">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                            </svg>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="p-4">
                                                    <h4 className="text-sm font-medium text-gray-900 truncate mb-1">{product.nama_produk}</h4>
                                                    <div className="mt-1 flex justify-between items-center">
                                                        <span className="text-sm text-gray-500">{product.kode_produk}</span>
                                                        <span className="text-sm font-semibold text-blue-600">
                                                            {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(product.harga_jual)}
                                                        </span>
                                                    </div>
                                                    <div className="mt-2 text-xs flex items-center justify-between">
                                                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                                            Stok: {product.jumlah_produk}
                                                        </span>
                                                        <span className="text-gray-500">
                                                            Modal: {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(product.harga_modal)}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center text-sm text-gray-500 py-8">
                                        Pengguna ini belum memiliki produk.
                                    </div>
                                )}
                            </div>
                        </div>
                        
                        {/* Card Hutang Pelanggan */}
                        <div className="mt-6 overflow-hidden bg-white shadow sm:rounded-lg">
                            <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                                <div>
                                    <h3 className="text-lg font-medium leading-6 text-gray-900">Daftar Hutang Pelanggan</h3>
                                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                        Transaksi kredit yang belum lunas dari pelanggan pengguna ini.
                                    </p>
                                </div>
                            </div>
                            
                            <div className="border-t border-gray-200">
                                {customerDebts && customerDebts.length > 0 ? (
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pelanggan</th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jumlah Hutang</th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Metode</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {customerDebts.map((debt, index) => (
                                                    <tr key={debt.id}>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            {new Date(debt.tanggal_transaksi).toLocaleDateString('id-ID', {
                                                                day: 'numeric',
                                                                month: 'short',
                                                                year: 'numeric',
                                                            })}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                            {debt.customer ? debt.customer.nama_pelanggan : 'Umum'}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                                                            Rp {parseInt(debt.total_belanja).toLocaleString('id-ID')}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            {debt.metode_pembayaran}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <div className="px-6 py-4 text-center text-sm text-gray-500">
                                        Tidak ada hutang pelanggan yang tercatat.
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
