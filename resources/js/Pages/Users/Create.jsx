import React, { useState } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import Sidebar from '@/Components/Dashboard/Sidebar';
import DashboardHeader from '@/Components/Dashboard/DashboardHeader';

export default function Create({ auth }) {
    const [profileImagePreview, setProfileImagePreview] = useState(null);
    
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        phoneNumber: '',
        storeName: '',
        storeAddress: '',
        profileImage: null,
        password: '',
        password_confirmation: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Gunakan FormData untuk mengirim file
        const formData = new FormData();
        Object.keys(data).forEach(key => {
            if (key === 'profileImage' && data[key]) {
                formData.append(key, data[key]);
            } else if (key !== 'profileImage') {
                formData.append(key, data[key] || '');
            }
        });
        
        post(route('users.store'), formData, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                // Reset form setelah berhasil
                reset();
                setProfileImagePreview(null);
            },
            headers: {
                'X-File-Upload': 'true',
                'X-Requested-With': 'XMLHttpRequest',
                'Accept': 'application/json',
            },
        });
    };

    const validateFileUpload = (file) => {
        // Validasi ukuran file (max 2MB)
        if (file.size > 2 * 1024 * 1024) {
            alert('Ukuran file terlalu besar. Maksimal 2MB.');
            return false;
        }
        
        // Validasi tipe file dengan lebih spesifik
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/bmp', 'image/jpg'];
        if (!allowedTypes.includes(file.type)) {
            alert(`Format file tidak didukung. Gunakan JPG, PNG, GIF, WEBP, atau BMP. Tipe terdeteksi: ${file.type}`);
            return false;
        }
        
        return true;
    };

    return (
        <div className="min-h-screen bg-white">
            <Head title="Tambah Pengguna" />
            
            {/* Header */}
            <DashboardHeader 
                pageTitle="Tambah Pengguna Baru" 
                breadcrumb={[
                    { label: 'Pengguna', url: route('users.index') },
                    { label: 'Tambah' }
                ]}
            />
            
            {/* Layout Utama */}
            <div className="flex min-h-screen pt-20">
                <Sidebar />

                {/* Konten Utama */}
                <main className="flex-1 ml-64 p-6 lg:p-8 overflow-y-auto bg-white">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <form onSubmit={handleSubmit} className="p-6">
                            <div className="mb-4">
                                <InputLabel value="Nama" />
                                <TextInput
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    className="mt-1 block w-full"
                                    autoComplete="name"
                                    isFocused={true}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                />
                                <InputError message={errors.name} className="mt-2" />
                            </div>

                            <div className="mb-4">
                                <InputLabel value="Email" />
                                <TextInput
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full"
                                    autoComplete="email"
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                />
                                <InputError message={errors.email} className="mt-2" />
                            </div>

                            <div className="mb-4">
                                <InputLabel value="Nomor Telepon" />
                                <TextInput
                                    type="text"
                                    name="phoneNumber"
                                    value={data.phoneNumber}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('phoneNumber', e.target.value)}
                                    required
                                />
                                <InputError message={errors.phoneNumber} className="mt-2" />
                                <p className="mt-1 text-sm text-gray-500">Format: 08xxxxxxxxxx (Tanpa spasi atau karakter khusus)</p>
                            </div>

                            <div className="mb-4">
                                <InputLabel value="Nama Toko" />
                                <TextInput
                                    type="text"
                                    name="storeName"
                                    value={data.storeName}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('storeName', e.target.value)}
                                    required
                                />
                                <InputError message={errors.storeName} className="mt-2" />
                            </div>
                            
                            <div className="mb-4">
                                <InputLabel value="Alamat Toko" />
                                <textarea
                                    name="storeAddress"
                                    value={data.storeAddress}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    rows={3}
                                    onChange={(e) => setData('storeAddress', e.target.value)}
                                    required
                                ></textarea>
                                <InputError message={errors.storeAddress} className="mt-2" />
                            </div>
                            
                            <div className="mb-4">
                                <InputLabel value="Foto Profil" />
                                <input
                                    type="file"
                                    name="profileImage"
                                    className="mt-1 block w-full text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (file) {
                                            // Validasi file
                                            if (validateFileUpload(file)) {
                                                setData('profileImage', file);
                                                // Buat URL preview
                                                const reader = new FileReader();
                                                reader.onloadend = () => {
                                                    setProfileImagePreview(reader.result);
                                                };
                                                reader.onerror = (error) => {
                                                    console.error('Error reading file:', error);
                                                    alert('Gagal membaca file gambar. Silakan coba lagi.');
                                                };
                                                reader.readAsDataURL(file);
                                            } else {
                                                // Reset input jika validasi gagal
                                                e.target.value = '';
                                            }
                                        }
                                    }}
                                    accept="image/jpeg,image/png,image/gif,image/webp,image/bmp"
                                />
                                <InputError message={errors.profileImage} className="mt-2" />
                                <p className="mt-1 text-sm text-gray-500">Ukuran maksimal 2MB. Format: JPG, PNG, GIF, WEBP, BMP</p>
                                
                                {profileImagePreview && (
                                    <div className="mt-4">
                                        <p className="text-sm text-gray-600 mb-2">Preview:</p>
                                        <img 
                                            src={profileImagePreview} 
                                            alt="Preview" 
                                            className="w-32 h-32 object-cover rounded-full border-2 border-gray-200"
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="mb-4">
                                <InputLabel value="Password" />
                                <TextInput
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="mt-1 block w-full"
                                    autoComplete="new-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                    required
                                />
                                <InputError message={errors.password} className="mt-2" />
                                <p className="mt-1 text-sm text-gray-500">Minimal 8 karakter</p>
                            </div>

                            <div className="mb-6">
                                <InputLabel value="Konfirmasi Password" />
                                <TextInput
                                    type="password"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    className="mt-1 block w-full"
                                    autoComplete="new-password"
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    required
                                />
                                <InputError message={errors.password_confirmation} className="mt-2" />
                            </div>

                            <div className="flex items-center gap-4">
                                <PrimaryButton disabled={processing}>
                                    {processing ? 'Menyimpan...' : 'Simpan'}
                                </PrimaryButton>
                                <Link href={route('users.index')}>
                                    <SecondaryButton type="button">
                                        Batal
                                    </SecondaryButton>
                                </Link>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </div>
    );
}
