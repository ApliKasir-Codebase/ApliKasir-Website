import React, { useState } from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import Sidebar from '@/Components/Dashboard/Sidebar';
import DashboardHeader from '@/Components/Dashboard/DashboardHeader';
import PageTransition from '@/Components/PageTransition';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import TextArea from '@/Components/TextArea';
import FlashMessage from '@/Components/FlashMessage';

export default function Create() {
    const { errors } = usePage().props;
    const [previewImage, setPreviewImage] = useState(null);
    const [verificationStatus, setVerificationStatus] = useState(null);
    const [verifying, setVerifying] = useState(false);
    
    const { data, setData, post, processing } = useForm({
        kode_produk: '',
        nama_produk: '',
        kategori: '',
        merek: '',
        deskripsi: '',
        gambar_produk: null,
        global_product_id: null,
    });    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('products.store'), {
            forceFormData: true,
        });
    };
    
    const verifyProductCode = () => {
        if (!data.kode_produk || data.kode_produk.trim() === '') {
            setVerificationStatus({
                status: 'error',
                message: 'Kode produk tidak boleh kosong'
            });
            return;
        }
        
        setVerifying(true);
        setVerificationStatus(null);
          // Call the API to verify the product code
        fetch(route('products.verify-code'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
            },
            body: JSON.stringify({ kode_produk: data.kode_produk }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                setVerificationStatus({
                    status: 'success',
                    message: data.message,
                    product: data.product
                });
                
                // If verification is successful, we can pre-fill some fields
                if (data.product) {
                    setData(prevData => ({
                        ...prevData,
                        global_product_id: data.product.id,
                        nama_produk: data.product.nama_produk,
                        kategori: data.product.kategori || prevData.kategori,
                        merek: data.product.merek || prevData.merek,
                    }));
                }
            } else {
                setVerificationStatus({
                    status: 'error',
                    message: data.message || 'Kode produk tidak valid'
                });
            }
        })
        .catch(error => {
            console.error('Error verifying product code:', error);
            setVerificationStatus({
                status: 'error',
                message: 'Terjadi kesalahan saat verifikasi kode produk'
            });
        })
        .finally(() => {
            setVerifying(false);
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        
        // Validate file type
        const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (file && !validTypes.includes(file.type)) {
            setData('gambar_produk', null);
            const error = {
                gambar_produk: 'File harus berupa gambar (JPG, PNG, GIF, atau WEBP)'
            };
            usePage().props.errors = error;
            return;
        }
        
        // Validate file size (max 2MB)
        if (file && file.size > 2 * 1024 * 1024) {
            setData('gambar_produk', null);
            const error = {
                gambar_produk: 'Ukuran gambar maksimal 2MB'
            };
            usePage().props.errors = error;
            return;
        }
        
        setData('gambar_produk', file);
        
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setPreviewImage(null);
        }
    };

    return (
        <div className="min-h-screen bg-white">
            <Head title="Tambah Produk" />
            
            {/* Header */}            <DashboardHeader 
                pageTitle="Tambah Produk" 
                breadcrumb={[
                    { label: 'Produk', url: route('products.index') },
                    { label: 'Tambah Produk' }
                ]}
            />
            
            {/* Layout Utama */}
            <div className="flex min-h-screen pt-20">
                <Sidebar />

                {/* Konten Utama */}
                <main className="flex-1 ml-64 p-6 lg:p-8 overflow-y-auto bg-white">
                    <PageTransition>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <InputLabel htmlFor="kode_produk" value="Kode Produk" required />
                                        <div className="flex mt-1">
                                            <TextInput
                                                id="kode_produk"
                                                type="text"
                                                className="block w-full rounded-r-none"
                                                value={data.kode_produk}
                                                onChange={(e) => {
                                                    setData('kode_produk', e.target.value);
                                                    setVerificationStatus(null);
                                                }}
                                            />
                                            <button 
                                                type="button" 
                                                className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 transition-colors duration-300 flex items-center"
                                                onClick={verifyProductCode}
                                                disabled={verifying || !data.kode_produk}
                                            >
                                                {verifying ? (
                                                    <span>Memverifikasi...</span>
                                                ) : (
                                                    <span>Verifikasi</span>
                                                )}
                                            </button>
                                        </div>
                                        
                                        {verificationStatus && (
                                            <div className={`mt-2 p-2 text-sm rounded-md ${
                                                verificationStatus.status === 'success' 
                                                    ? 'bg-green-50 text-green-700 border border-green-200' 
                                                    : 'bg-red-50 text-red-700 border border-red-200'
                                            }`}>
                                                {verificationStatus.message}
                                            </div>
                                        )}
                                        
                                        <InputError message={errors.kode_produk} className="mt-2" />
                                        <p className="mt-1 text-sm text-gray-500">
                                            Kode produk akan diverifikasi dengan repositori produk global.
                                        </p>
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="nama_produk" value="Nama Produk" required />
                                        <TextInput
                                            id="nama_produk"
                                            type="text"
                                            className="mt-1 block w-full"
                                            value={data.nama_produk}
                                            onChange={(e) => setData('nama_produk', e.target.value)}
                                        />
                                        <InputError message={errors.nama_produk} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="kategori" value="Kategori" />
                                        <TextInput
                                            id="kategori"
                                            type="text"
                                            className="mt-1 block w-full"
                                            value={data.kategori}
                                            onChange={(e) => setData('kategori', e.target.value)}
                                        />
                                        <InputError message={errors.kategori} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="merek" value="Merek" />
                                        <TextInput
                                            id="merek"
                                            type="text"
                                            className="mt-1 block w-full"
                                            value={data.merek}
                                            onChange={(e) => setData('merek', e.target.value)}
                                        />
                                        <InputError message={errors.merek} className="mt-2" />
                                    </div>

                                    <div className="md:col-span-2">
                                        <InputLabel htmlFor="deskripsi" value="Deskripsi" />
                                        <TextArea
                                            id="deskripsi"
                                            className="mt-1 block w-full"
                                            value={data.deskripsi}
                                            onChange={(e) => setData('deskripsi', e.target.value)}
                                        />
                                        <InputError message={errors.deskripsi} className="mt-2" />
                                    </div>

                                    <div className="md:col-span-2">
                                        <InputLabel htmlFor="gambar_produk" value="Gambar Produk" />
                                        <input
                                            id="gambar_produk"
                                            type="file"
                                            className="mt-1 block w-full text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                            onChange={handleImageChange}
                                            accept="image/*"
                                        />
                                        <InputError message={errors.gambar_produk} className="mt-2" />
                                        
                                        {previewImage && (
                                            <div className="mt-4">
                                                <p className="text-sm text-gray-600 mb-2">Preview:</p>
                                                <img src={previewImage} alt="Preview" className="max-w-xs rounded-md" />
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center justify-end space-x-3">                                    <Link
                                        href={route('products.index')}
                                        className="px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none transition-colors duration-300"
                                    >
                                        Batal
                                    </Link>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none transition-colors duration-300"
                                        disabled={processing}
                                    >
                                        {processing ? 'Menyimpan...' : 'Simpan'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </PageTransition>
                </main>
            </div>
        </div>
    );
}
