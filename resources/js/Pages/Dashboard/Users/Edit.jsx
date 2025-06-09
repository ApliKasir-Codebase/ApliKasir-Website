import React, { useEffect, useState } from 'react';
import { Head, useForm, Link, usePage, router } from '@inertiajs/react';
import Sidebar from '@/Components/Dashboard/Sidebar';
import DashboardHeader from '@/Components/Dashboard/DashboardHeader';

export default function EditUser({ auth, user }) {  // Accept user as a prop
    const [profileImagePreview, setProfileImagePreview] = useState(user.profileImagePath || null);
    
    // Initialize form with user data
    const { data, setData, processing, errors } = useForm({
        name: user.name || '',
        email: user.email || '',
        phoneNumber: user.phoneNumber || '',  // Match backend field name (not 'phone')
        storeName: user.storeName || '',
        storeAddress: user.storeAddress || '',
        kodeQR: user.kodeQR || '',
        profileImage: null,
        password: '',
        password_confirmation: '',
    });

    // Define breadcrumb data
    const breadcrumb = [
        { label: 'Pengguna', url: route('users.index') },
        { label: user.name, url: route('users.show', user.id) },
        { label: 'Edit' }
    ];

    // File input handler
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file 
            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                alert('File terlalu besar. Maksimal 5MB.');
                return;
            }
            
            // Log file details for debugging
            console.log('Selected file:', {
                name: file.name,
                type: file.type,
                size: Math.round(file.size / 1024) + 'KB',
                lastModified: new Date(file.lastModified).toISOString()
            });
            
            // Set file to form data
            setData('profileImage', file);
            
            // Generate preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Create FormData for submission
        const formDataToSubmit = new FormData();
        
        // Add indicator that this is a multipart request with image upload
        formDataToSubmit.append('_file_upload_attempt', 'true');
        
        // PERBAIKAN: Pastikan semua field terisi dengan data yang ada
        // Hapus operator || '' karena bisa menyebabkan string kosong dikirim sebagai nilai
        formDataToSubmit.append('name', data.name);
        formDataToSubmit.append('email', data.email);
        formDataToSubmit.append('phoneNumber', data.phoneNumber);
        formDataToSubmit.append('storeName', data.storeName);
        formDataToSubmit.append('storeAddress', data.storeAddress);
        formDataToSubmit.append('kodeQR', data.kodeQR || ''); // Kode QR boleh kosong

        // Add the image file if changed
        if (data.profileImage) {
            formDataToSubmit.append('profileImage', data.profileImage);
            // Tambahkan flag bahwa ini adalah upload gambar
            formDataToSubmit.append('has_profile_image', 'true');
        }

        // Add password fields if provided
        if (data.password) {
            formDataToSubmit.append('password', data.password);
            formDataToSubmit.append('password_confirmation', data.password_confirmation || '');
        }

        // Set method to PUT for updates
        formDataToSubmit.append('_method', 'PUT');

        // Log data yang akan dikirim (untuk debugging)
        console.log('Sending form data with fields:', 
            Array.from(formDataToSubmit.keys()).map(key => 
                key === 'profileImage' ? `${key}: [File]` : `${key}: ${formDataToSubmit.get(key)}`
            )
        );        // Submit the form
        router.post(route('users.update', user.id), formDataToSubmit, {
            forceFormData: true, // Penting untuk memastikan FormData digunakan
            preserveScroll: true,
            preserveState: true,
            resetOnSuccess: false,
            onBefore: () => {
                console.log('Form data being submitted:', 
                    Array.from(formDataToSubmit.entries())
                    .map(pair => pair[0] === 'profileImage' ? 
                        ['profileImage', '[FILE]'] : pair)
                );
                
                // Check if we have a profileImage file
                if (data.profileImage) {
                    console.log('Profile image details:', {
                        name: data.profileImage.name,
                        type: data.profileImage.type,
                        size: Math.round(data.profileImage.size / 1024) + 'KB'
                    });
                }
            },
            headers: {
                'X-File-Upload': data.profileImage ? 'true' : 'false',
                'X-Requested-With': 'XMLHttpRequest',
                'Accept': 'application/json',
            },
            onSuccess: (page) => {
                if (page.props.flash?.success) {
                    alert(page.props.flash.success);
                } else {
                    alert('Pengguna berhasil diperbarui!');
                }
                
                // Reload the page to show updated profile image
                if (data.profileImage) {
                    window.location.reload();
                }
            },
            onError: (errors) => {
                console.error('Error memperbarui pengguna:', errors);
            }
        });
    };

    useEffect(() => {
        console.log('Current form data:', {
            ...data,
            profileImage: data.profileImage ? 'File selected' : null
        });
        
        console.log('Current errors:', errors);
    }, [data, errors]);

    return (
        <div className="min-h-screen bg-white">
            <Head title={`Edit ${user.name} - Aplikasir`} />
            
            {/* Header */}
            <DashboardHeader 
                pageTitle={`Edit Pengguna: ${user.name}`} 
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
                                {/* Nama */}
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nama Lengkap</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                    />
                                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                                </div>
                                
                                {/* Email */}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                    />
                                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                                </div>
                                
                                {/* Phone Number (match backend field name) */}
                                <div>
                                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">No. Telepon</label>
                                    <input
                                        type="tel"
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        value={data.phoneNumber}
                                        onChange={(e) => setData('phoneNumber', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                    />
                                    {errors.phoneNumber && <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>}
                                </div>
                                
                                {/* Store Name */}
                                <div>
                                    <label htmlFor="storeName" className="block text-sm font-medium text-gray-700">Nama Toko</label>
                                    <input
                                        type="text"
                                        id="storeName"
                                        name="storeName"
                                        value={data.storeName}
                                        onChange={(e) => setData('storeName', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                    />
                                    {errors.storeName && <p className="mt-1 text-sm text-red-600">{errors.storeName}</p>}
                                </div>
                                
                                {/* Store Address */}
                                <div className="md:col-span-2">
                                    <label htmlFor="storeAddress" className="block text-sm font-medium text-gray-700">Alamat Toko</label>
                                    <textarea
                                        id="storeAddress"
                                        name="storeAddress"
                                        value={data.storeAddress}
                                        onChange={(e) => setData('storeAddress', e.target.value)}
                                        rows="3"
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                    ></textarea>
                                    {errors.storeAddress && <p className="mt-1 text-sm text-red-600">{errors.storeAddress}</p>}
                                </div>
                                
                                {/* QR Code */}
                                <div>
                                    <label htmlFor="kodeQR" className="block text-sm font-medium text-gray-700">Kode QR</label>
                                    <input
                                        type="text"
                                        id="kodeQR"
                                        name="kodeQR"
                                        value={data.kodeQR}
                                        onChange={(e) => setData('kodeQR', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                    />
                                    {errors.kodeQR && <p className="mt-1 text-sm text-red-600">{errors.kodeQR}</p>}
                                </div>
                                
                                {/* Profile Image */}
                                <div>
                                    <label htmlFor="profileImage" className="block text-sm font-medium text-gray-700">Foto Profil</label>
                                    <input
                                        type="file"
                                        id="profileImage"
                                        name="profileImage"
                                        onChange={handleFileChange}
                                        accept="image/*"
                                        className="mt-1 block w-full text-sm text-gray-500
                                               file:mr-4 file:py-2 file:px-4
                                               file:rounded-md file:border-0
                                               file:text-sm file:font-semibold
                                               file:bg-blue-50 file:text-blue-700
                                               hover:file:bg-blue-100"
                                    />
                                    {errors.profileImage && <p className="mt-1 text-sm text-red-600">{errors.profileImage}</p>}
                                    
                                    {/* Image preview */}
                                    {profileImagePreview && (
                                        <div className="mt-2">
                                            <img 
                                                src={profileImagePreview} 
                                                alt="Preview" 
                                                className="h-20 w-20 object-cover rounded-full border border-gray-200"
                                            />
                                        </div>
                                    )}
                                </div>
                                
                                {/* Password fields - only show if checkbox is checked */}
                                <div className="md:col-span-2">
                                    <div className="flex items-center mb-4">
                                        <input
                                            id="change_password"
                                            type="checkbox"
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                            onChange={(e) => {
                                                if (!e.target.checked) {
                                                    setData('password', '');
                                                    setData('password_confirmation', '');
                                                }
                                            }}
                                        />
                                        <label htmlFor="change_password" className="ml-2 block text-sm font-medium text-gray-700">
                                            Ubah Password
                                        </label>
                                    </div>
                                    
                                    {/* Password fields here if needed */}
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
