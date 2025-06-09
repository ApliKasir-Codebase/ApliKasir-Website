import React, { useState, useEffect } from 'react';
import { Head, useForm, Link, usePage } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import Sidebar from '@/Components/Dashboard/Sidebar';
import DashboardHeader from '@/Components/Dashboard/DashboardHeader';
import FlashMessage from '@/Components/FlashMessage';

export default function Edit({ user, auth, qrCodeDataUri }) {
    const { flash = {} } = usePage().props;
    const [profileImagePreview, setProfileImagePreview] = useState(() => {
        // Gunakan default image jika profileImagePath tidak tersedia atau kosong
        if (!user.profileImagePath || user.profileImagePath.includes('default_avatar')) {
            return '/images/default_avatar.png';
        }
        
        // Gunakan profile image path yang disediakan
        return user.profileImagePath;
    });
    const [originalData, setOriginalData] = useState({});
    const [imageSelected, setImageSelected] = useState(false);
    
    const { data, setData, put, processing, errors } = useForm({
        name: user.name || '',
        email: user.email || '',
        phoneNumber: user.phoneNumber || '',
        storeName: user.storeName || '',
        storeAddress: user.storeAddress || '',
        kodeQR: user.kodeQR || '',
        profileImage: null,
        password: '',
        password_confirmation: '',
    });

    // Simpan data awal untuk perbandingan nanti
    useEffect(() => {
        setOriginalData({
            name: user.name || '',
            email: user.email || '',
            phoneNumber: user.phoneNumber || '',
            storeName: user.storeName || '',
            storeAddress: user.storeAddress || '',
            kodeQR: user.kodeQR || '',
        });
    }, [user]);
      const handleSubmit = (e) => {
        e.preventDefault();
        
        // Create FormData object
        const formData = new FormData();
        
        // Selalu sertakan semua field yang ada dengan data yang sudah ada
        formData.append('name', data.name || user.name || '');
        formData.append('email', data.email || user.email || '');
        formData.append('phoneNumber', data.phoneNumber || user.phoneNumber || '');
        formData.append('storeName', data.storeName || user.storeName || '');
        formData.append('storeAddress', data.storeAddress || user.storeAddress || '');
        formData.append('kodeQR', data.kodeQR || user.kodeQR || '');
        
        // Tambahkan flag untuk memudahkan deteksi
        formData.append('_is_edit_form', 'true');
        
        // Add profile image if selected with explicit flag
        if (data.profileImage) {
            // CRITICAL: This flag must be set to 'true' for proper image detection
            formData.append('has_profile_image', 'true');
            
            console.log('Adding profile image to form:', {
                name: data.profileImage.name,
                type: data.profileImage.type,
                size: Math.round(data.profileImage.size / 1024) + 'KB'
            });
            
            // IMPORTANT: Append the file with the exact fieldname expected by the backend
            formData.append('profileImage', data.profileImage);
        }
        
        // Add password fields if provided
        if (data.password) {
            formData.append('password', data.password);
            formData.append('password_confirmation', data.password_confirmation || '');
        }
        
        // Submit the form with debugging info
        put(route('users.update', user.id), formData, {
            forceFormData: true,
            preserveScroll: true,
            preserveState: true, 
            resetOnSuccess: false,
            onBefore: () => {
                console.log('Form data being submitted:', 
                    Array.from(formData.entries())
                    .map(pair => pair[0] === 'profileImage' ? 
                        ['profileImage', '[FILE]'] : pair)
                );
            },
            headers: {
                'X-File-Upload': data.profileImage ? 'true' : 'false',
                'X-Requested-With': 'XMLHttpRequest',
                'Accept': 'application/json',
                // Adding additional header to ensure server recognizes the request
                'X-Has-Image': data.profileImage ? 'true' : 'false'
            },
            onSuccess: (page) => {
                console.log('Success: User updated!');
                
                // Refresh page if image was uploaded to show new image
                if (data.profileImage) {
                    window.location.reload();
                }
                
                // Gunakan flash message dari page props daripada alert
                if (!page.props.flash?.success) {
                    alert('Pengguna berhasil diperbarui');
                }
            },
            onError: (errors) => {
                console.error('Error updating user:', errors);
            },
            onFinish: () => {
                console.log('Form submission completed');
            }
        });
    };    // File input handling
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        
        if (file) {
            // Validasi file sebelum dikirim
            if (file.size > 5 * 1024 * 1024) {
                alert('File terlalu besar. Maksimal 5MB.');
                e.target.value = '';
                return;
            }
            
            const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/bmp', 'image/jpg'];
            if (!allowedTypes.includes(file.type)) {
                alert(`Format file tidak didukung. Gunakan JPG, PNG, GIF, WEBP, atau BMP. Tipe terdeteksi: ${file.type}`);
                e.target.value = '';
                return;
            }
            
            // Set file ke state
            setData('profileImage', file);
            setImageSelected(true);
            
            // Generate preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
            
            // Enhanced logging for debugging
            console.log('File selected successfully:', {
                name: file.name,
                size: Math.round(file.size / 1024) + 'KB',
                type: file.type,
                lastModified: new Date(file.lastModified).toISOString()
            });
        }
    };

    return (
        <div className="min-h-screen bg-white">
            <Head title="Edit Pengguna" />
            
            {/* Header */}            <DashboardHeader 
                pageTitle="Edit Pengguna" 
                breadcrumb={[
                    { label: 'Pengguna', url: route('users.index') },
                    { label: user.name, url: route('users.show', user.id) },
                    { label: 'Edit' }
                ]}
            />
              {/* Layout Utama */}            <div className="flex min-h-screen pt-20">
                <Sidebar />

                {/* Konten Utama */}
                <main className="flex-1 ml-64 p-6 lg:p-8 overflow-y-auto bg-white">                    {flash?.success && (
                        <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                            {flash.success}
                        </div>
                    )}
                    
                    {flash?.error && (
                        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                            {flash.error}
                        </div>
                    )}
                    
                    {flash?.info && (
                        <div className="mb-6 p-4 bg-blue-100 border border-blue-400 text-blue-700 rounded">
                            {flash.info}
                        </div>
                    )}
                
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <form onSubmit={handleSubmit} className="p-6">
                            <div className="mb-4">
                                <InputLabel value="Nama" />
                                <TextInput
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('name', e.target.value)}
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
                                    onChange={(e) => setData('email', e.target.value)}
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
                                />
                                <InputError message={errors.phoneNumber} className="mt-2" />
                            </div>

                            <div className="mb-4">
                                <InputLabel value="Nama Toko" />
                                <TextInput
                                    type="text"
                                    name="storeName"
                                    value={data.storeName}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('storeName', e.target.value)}
                                />
                                <InputError message={errors.storeName} className="mt-2" />
                            </div>                            <div className="mb-4">
                                <InputLabel value="Alamat Toko" />
                                <textarea
                                    name="storeAddress"
                                    value={data.storeAddress}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    rows={3}
                                    onChange={(e) => setData('storeAddress', e.target.value)}
                                ></textarea>
                                <InputError message={errors.storeAddress} className="mt-2" />
                            </div>
                              <div className="mb-4">
                                <InputLabel value="Kode QR" />
                                <TextInput
                                    type="text"
                                    name="kodeQR"
                                    value={data.kodeQR}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('kodeQR', e.target.value)}
                                />                                <p className="mt-1 text-sm text-gray-500">
                                    Kode QR unik akan digunakan untuk identifikasi pengguna dalam pembayaran QRIS. 
                                    Nilai ini disimpan di database dan digunakan untuk generate QR code visual.
                                    {user.kodeQR && " Kode QR saat ini: "} 
                                    {user.kodeQR && <span className="font-medium">{user.kodeQR}</span>}
                                </p>
                                {qrCodeDataUri && (
                                    <div className="mt-3">
                                        <img 
                                            src={qrCodeDataUri} 
                                            alt={`QR Code untuk ${user.name}`} 
                                            className="h-32 w-32 border border-gray-200" 
                                        />
                                        <p className="mt-1 text-sm text-gray-500">Preview kode QR</p>
                                    </div>
                                )}
                                <InputError message={errors.kodeQR} className="mt-2" />
                            </div>                              <div className="mb-4">
                                <InputLabel value="Foto Profil" />                                <input
                                    type="file"
                                    name="profileImage"
                                    className="mt-1 block w-full text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                    onChange={handleFileChange}
                                    accept="image/jpeg,image/png,image/gif,image/webp,image/bmp"
                                />
                                <p className="mt-1 text-sm text-gray-500">
                                    Upload foto profil (Maks. 2MB). Format yang didukung: JPG, PNG, GIF, WEBP, BMP.
                                </p>
                                <InputError message={errors.profileImage} className="mt-2" />
                                  {profileImagePreview && (
                                    <div className="mt-4">
                                        <p className="text-sm text-gray-600 mb-2">Preview:</p>                                        <img 
                                            src={profileImagePreview} 
                                            alt="Preview" 
                                            className="w-32 h-32 object-cover rounded-full border-2 border-gray-200"
                                            onError={(e) => {
                                                console.error('Error loading preview image', profileImagePreview);
                                                // Gunakan gambar avatar default
                                                e.target.src = '/images/default_avatar.png';
                                                // Mencegah infinite error loop jika gambar default juga gagal
                                                e.target.onerror = null;
                                            }}
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="mb-4">
                                <InputLabel value="Password Baru (kosongkan jika tidak ingin mengubah)" />
                                <TextInput
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('password', e.target.value)}
                                />
                                <InputError message={errors.password} className="mt-2" />
                            </div>

                            <div className="mb-6">
                                <InputLabel value="Konfirmasi Password Baru" />
                                <TextInput
                                    type="password"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                />
                            </div>

                            <div className="flex items-center gap-4">
                                <PrimaryButton disabled={processing}>
                                    Simpan
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
