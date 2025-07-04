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

export default function Edit({ product }) {
    const { errors } = usePage().props;
    const [previewImage, setPreviewImage] = useState(product.gambar_produk ? `/storage/${product.gambar_produk}` : null);
    
    const { data, setData, post, processing } = useForm({
        _method: 'PATCH',
        kode_produk: product.kode_produk || '',
        nama_produk: product.nama_produk || '',
        kategori: product.kategori || '',
        merek: product.merek || '',
        deskripsi: product.deskripsi || '',
        gambar_produk: null,
        is_active: product.is_active,
        _delete_image: false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('global-products.update', product.id), {
            forceFormData: true,
        });
    };
    
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        
        if (!file) {
            setData('gambar_produk', null);
            return;
        }
        
        // Validate file type
        const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (!validTypes.includes(file.type)) {
            setData('gambar_produk', null);
            const error = {
                gambar_produk: 'File harus berupa gambar (JPG, PNG, GIF, atau WEBP)'
            };
            usePage().props.errors = error;
            return;
        }
        
        // Validate file size (max 2MB)
        if (file.size > 2 * 1024 * 1024) {
            setData('gambar_produk', null);
            const error = {
                gambar_produk: 'Ukuran gambar maksimal 2MB'
            };
            usePage().props.errors = error;
            return;
        }
        
        setData('gambar_produk', file);
        
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewImage(reader.result);
        };
        reader.readAsDataURL(file);
    };
    
    const handleDeleteImage = () => {
        if (confirm('Apakah Anda yakin ingin menghapus gambar produk ini?')) {
            setData('_delete_image', true);
            setPreviewImage(null);
        }
    };

    return (
        <div className="min-h-screen bg-white">
            <Head title={`Edit Produk Global - ${product.nama_produk}`} />
            
            {/* Header */}
            <DashboardHeader 
                pageTitle="Edit Produk Global" 
                breadcrumb={[
                    { label: 'Produk Global', url: route('global-products.index') },
                    { label: product.nama_produk, url: route('global-products.show', product.id) },
                    { label: 'Edit' }
                ]}
            />
            
            {/* Layout Utama */}
            <div className="flex min-h-screen pt-20">
                <Sidebar />

                {/* Konten Utama */}
                <main className="flex-1 ml-64 p-6 lg:p-8 overflow-y-auto bg-white">
                    <PageTransition>
                        <FlashMessage />

                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <InputLabel htmlFor="kode_produk" value="Kode Produk" required />
                                        <TextInput
                                            id="kode_produk"
                                            type="text"
                                            className="mt-1 block w-full"
                                            value={data.kode_produk}
                                            onChange={(e) => setData('kode_produk', e.target.value)}
                                        />
                                        <InputError message={errors.kode_produk} className="mt-2" />
                                        <p className="mt-1 text-sm text-gray-500">
                                            Kode produk harus unik dan digunakan untuk verifikasi produk pengguna.
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
                                        <InputLabel htmlFor="is_active" value="Status" />
                                        <div className="mt-2">
                                            <label className="inline-flex items-center">
                                                <input
                                                    type="checkbox"
                                                    className="form-checkbox h-5 w-5 text-blue-600"
                                                    checked={data.is_active}
                                                    onChange={(e) => setData('is_active', e.target.checked)}
                                                />
                                                <span className="ml-2 text-gray-700">Aktif</span>
                                            </label>
                                            <p className="mt-1 text-sm text-gray-500">
                                                Hanya produk global yang aktif yang dapat digunakan untuk verifikasi produk pengguna.
                                            </p>
                                        </div>
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
                                        
                                        {previewImage && !data._delete_image && (
                                            <div className="mt-2 mb-4">
                                                <img src={previewImage} alt="Preview" className="max-w-xs h-auto rounded-md" />
                                                <button 
                                                    type="button" 
                                                    onClick={handleDeleteImage}
                                                    className="mt-2 px-3 py-1 text-sm text-red-600 border border-red-600 rounded-md hover:bg-red-50 transition-colors duration-300"
                                                >
                                                    Hapus Gambar
                                                </button>
                                            </div>
                                        )}
                                        
                                        <input
                                            id="gambar_produk"
                                            type="file"
                                            className="mt-2 block w-full text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                            onChange={handleImageChange}
                                            accept="image/*"
                                        />
                                        <InputError message={errors.gambar_produk} className="mt-2" />
                                    </div>
                                </div>

                                <div className="flex items-center justify-end space-x-3">
                                    <Link
                                        href={route('global-products.show', product.id)}
                                        className="px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none transition-colors duration-300"
                                    >
                                        Batal
                                    </Link>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none transition-colors duration-300"
                                        disabled={processing}
                                    >
                                        {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
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
