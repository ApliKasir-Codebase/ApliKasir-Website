import React, { useEffect } from 'react';
import { Head, useForm } from '@inertiajs/react';
import Sidebar from '@/Components/Dashboard/Sidebar';
import DashboardHeader from '@/Components/Dashboard/DashboardHeader';
import axios from 'axios';

export default function EditUser({ auth, id }) {
    // In a real app, you would fetch the user data based on the ID
    const { data, setData, put, processing, errors } = useForm({
        name: 'fuad amba maximof',
        email: 'fuadambamaximof123@gmail.com',
        username: 'Fuad_Ambatron',
        phone: '087336523465',
    });

    // Define breadcrumb data
    const breadcrumb = [
        { label: 'Pengguna', url: route('users.index') },
        { label: 'Edit Pengguna' }
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Buat objek FormData
        const formData = new FormData();
        
        // Tambahkan data fields
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('username', data.username);
        formData.append('phone', data.phone);
        
        // Tambahkan file jika ada
        // if (profileImageFile) {
        //     formData.append('profileImage', profileImageFile);
            
        //     // Log file untuk debug
        //     console.log('Appending profile image to form data:', {
        //         name: profileImageFile.name,
        //         size: profileImageFile.size,
        //         type: profileImageFile.type
        //     });
        // }
        
        // Tetapkan method dan headers dengan benar
        axios.put(`/users/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
        .then(response => {
            // Handle success
            console.log('Update success', response);
            alert('Data pengguna berhasil diperbarui');
        })
        .catch(error => {
            // Handle error
            console.error('Update error', error);
            alert('Error saat mengupdate: ' + (error.response?.data?.message || 'Terjadi kesalahan'));
        });
    };

    return (
        <div className="min-h-screen bg-white">
            <Head title="Edit Pengguna - Aplikasir" />
            
            {/* Header */}
            <DashboardHeader 
                pageTitle="Edit Pengguna" 
                breadcrumb={breadcrumb}
            />
            
            {/* Layout Utama */}
            <div className="flex min-h-screen pt-20">
                <Sidebar />

                {/* Konten Utama */}
                <main className="flex-1 ml-64 p-6 lg:p-8 overflow-y-auto bg-white">
                    <div className="bg-white shadow-md rounded-xl p-6 mt-2">
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nama Lengkap</label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                    />
                                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                                </div>
                                
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                    />
                                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                                </div>
                                
                                <div>
                                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                                    <input
                                        type="text"
                                        id="username"
                                        value={data.username}
                                        onChange={(e) => setData('username', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                    />
                                    {errors.username && <p className="mt-1 text-sm text-red-600">{errors.username}</p>}
                                </div>
                                
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">No. Telepon</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        value={data.phone}
                                        onChange={(e) => setData('phone', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                    />
                                    {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                                </div>
                                
                                <div className="col-span-1 md:col-span-2">
                                    <div className="flex items-center">
                                        <input
                                            id="change_password"
                                            name="change_password"
                                            type="checkbox"
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        />
                                        <label htmlFor="change_password" className="ml-2 block text-sm font-medium text-gray-700">
                                            Ubah Password
                                        </label>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="mt-6 flex items-center justify-end">
                                <button
                                    type="button"
                                    onClick={() => window.history.back()}
                                    className="mr-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                >
                                    {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                                </button>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </div>
    );
}
