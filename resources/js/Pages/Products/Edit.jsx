import React, { useState, useEffect } from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import Sidebar from '@/Components/Dashboard/Sidebar';
import DashboardHeader from '@/Components/Dashboard/DashboardHeader';
import PageTransition from '@/Components/PageTransition';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import TextArea from '@/Components/TextArea';
import Checkbox from '@/Components/Checkbox';
import FlashMessage from '@/Components/FlashMessage';

export default function Edit({ product }) {
    const { errors } = usePage().props;
    const [previewImage, setPreviewImage] = useState(product.gambar_produk ? `/storage/${product.gambar_produk}` : null);
    const [formErrors, setFormErrors] = useState({});
    
    const { data, setData, put, processing } = useForm({
        kode_produk: product.kode_produk || '',
        nama_produk: product.nama_produk || '',
        kategori: product.kategori || '',
        merek: product.merek || '',
        deskripsi: product.deskripsi || '',
        gambar_produk: null,
        is_active: product.is_active || false,
    });
    
    const originalValues = {
        kode_produk: product.kode_produk || '',
        nama_produk: product.nama_produk || ''
    };
    
    useEffect(() => {
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            console.log("Server validation errors updated:", errors);
        }
    }, [errors]);
    
    useEffect(() => {
        if (!data.kode_produk) {
            setData('kode_produk', product.kode_produk || '');
        }
        if (!data.nama_produk) {
            setData('nama_produk', product.nama_produk || '');
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form data before submit:", data);

        const clientErrors = {};
        if (!data.kode_produk) {
            clientErrors.kode_produk = 'Kode produk tidak boleh kosong';
        }
        if (!data.nama_produk) {
            clientErrors.nama_produk = 'Nama produk tidak boleh kosong';
        }
        if (data.gambar_produk) {
            const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp'];
            if (!validTypes.includes(data.gambar_produk.type)) {
                clientErrors.gambar_produk = 'File harus berupa gambar (JPG, JPEG, PNG, GIF, atau WEBP)';
            }
            if (data.gambar_produk.size > 2 * 1024 * 1024) {
                clientErrors.gambar_produk = 'Ukuran gambar maksimal 2MB';
            }
        }
        if (Object.keys(clientErrors).length > 0) {
            setFormErrors(clientErrors);
            return;
        }

        const isKodeChanged = String(data.kode_produk).trim().toLowerCase() !== String(product.kode_produk).trim().toLowerCase();
        const isNamaChanged = String(data.nama_produk).trim() !== String(product.nama_produk).trim();
        const isGambarChanged = !!data.gambar_produk;

        console.log("Field changes detected:", {
            kode_original: product.kode_produk,
            kode_current: data.kode_produk,
            kode_changed: isKodeChanged,
            nama_original: product.nama_produk,
            nama_current: data.nama_produk,
            nama_changed: isNamaChanged,
            gambar_changed: isGambarChanged,
            gambar_type: data.gambar_produk ? data.gambar_produk.type : null
        });

        const formData = new FormData();
        formData.append('kode_produk', data.kode_produk);
        formData.append('nama_produk', data.nama_produk);
        formData.append('kategori', data.kategori || '');
        formData.append('merek', data.merek || '');
        formData.append('deskripsi', data.deskripsi || '');
        formData.append('is_active', data.is_active ? '1' : '0');
        formData.append('_changed_kode_produk', isKodeChanged ? '1' : '0');
        formData.append('_changed_nama_produk', isNamaChanged ? '1' : '0');
        formData.append('_changed_gambar_produk', isGambarChanged ? '1' : '0');
        if (isGambarChanged) {
            formData.append('gambar_produk', data.gambar_produk);
        }

        put(route('products.update', product.id), formData, {
            forceFormData: true,
            onSuccess: (page) => {
                console.log("Update berhasil!");
            },
            onError: (errors) => {
                console.error("Server validation errors:", errors);
                setFormErrors(errors);
            },
            preserveScroll: true,
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFormErrors({ ...formErrors, gambar_produk: null });
        if (!file) {
            setData('gambar_produk', null);
            setPreviewImage(product.gambar_produk ? `/storage/${product.gambar_produk}` : null);
            return;
        }
        const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp'];
        if (!validTypes.includes(file.type)) {
            setData('gambar_produk', null);
            setFormErrors({ ...formErrors, gambar_produk: 'File harus berupa gambar (JPG, JPEG, PNG, GIF, atau WEBP)' });
            return;
        }
        if (file.size > 2 * 1024 * 1024) {
            setData('gambar_produk', null);
            setFormErrors({ ...formErrors, gambar_produk: 'Ukuran gambar maksimal 2MB' });
            return;
        }
        setData('gambar_produk', file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewImage(reader.result);
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className="min-h-screen bg-white">
            <Head title={`Edit Produk - ${product.nama_produk}`} />
            
            <FlashMessage position="top-right" />
            
            <DashboardHeader 
                pageTitle="Edit Produk" 
                breadcrumb={[
                    { label: 'Produk', url: route('products.index') },
                    { label: product.nama_produk, url: route('products.show', product.id) },
                    { label: 'Edit' }
                ]}
            />
            
            <div className="flex min-h-screen pt-20">
                <Sidebar />

                <main className="flex-1 ml-64 p-6 lg:p-8 overflow-y-auto bg-white">
                    <PageTransition>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            {Object.keys(formErrors).length > 0 && (
                                <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
                                    <h3 className="font-bold mb-2">Ada kesalahan validasi:</h3>
                                    <ul className="list-disc pl-5">
                                        {Object.entries(formErrors).map(([field, error]) => (
                                            <li key={field}>{error}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>                                        
                                        <InputLabel htmlFor="kode_produk" value="Kode Produk" required />
                                        <TextInput
                                            id="kode_produk"
                                            type="text"
                                            className={`mt-1 block w-full ${formErrors.kode_produk ? 'border-red-500' : ''}`}
                                            value={data.kode_produk}
                                            onChange={(e) => {
                                                setData('kode_produk', e.target.value);
                                                if (formErrors.kode_produk) {
                                                    setFormErrors({...formErrors, kode_produk: null});
                                                }
                                            }}
                                        />
                                        <InputError message={formErrors.kode_produk} className="mt-2" />
                                        <p className="mt-1 text-xs text-gray-500">
                                            Kode produk harus unik dan tidak boleh kosong.
                                            <br />
                                            Kode produk saat ini: <strong>{product.kode_produk}</strong>
                                        </p>
                                    </div>                                    <div>                                        <InputLabel htmlFor="nama_produk" value="Nama Produk" required />
                                        <TextInput
                                            id="nama_produk"
                                            type="text"
                                            className={`mt-1 block w-full ${formErrors.nama_produk ? 'border-red-500' : ''}`}
                                            value={data.nama_produk}
                                            onChange={(e) => {
                                                setData('nama_produk', e.target.value);
                                                if (formErrors.nama_produk) {
                                                    setFormErrors({...formErrors, nama_produk: null});
                                                }
                                            }}
                                        />
                                        <InputError message={formErrors.nama_produk} className="mt-2" />
                                        <p className="mt-1 text-xs text-gray-500">
                                            Nama produk tidak boleh kosong.
                                            <br />
                                            Nama produk saat ini: <strong>{product.nama_produk}</strong>
                                        </p>
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

                                    <div>
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

                                    <div>
                                        <div className="flex items-center mt-4">
                                            <Checkbox
                                                id="is_active"
                                                checked={data.is_active}
                                                onChange={(e) => setData('is_active', e.target.checked)}
                                            />
                                            <InputLabel htmlFor="is_active" value="Produk Aktif" className="ml-2" />
                                        </div>
                                        <p className="text-sm text-gray-500 mt-1">
                                            Produk yang tidak aktif tidak akan muncul di aplikasi kasir.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-end space-x-3">
                                    <Link
                                        href={route('products.show', product.id)}
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
