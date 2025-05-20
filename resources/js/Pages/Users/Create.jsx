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
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        phoneNumber: '',
        storeName: '',
        storeAddress: '',
        password: '',
        password_confirmation: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('users.store'));
    };    return (
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
                            </div>

                            <div className="mb-4">
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
                                <InputLabel value="Password" />
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
                                <InputLabel value="Konfirmasi Password" />
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
