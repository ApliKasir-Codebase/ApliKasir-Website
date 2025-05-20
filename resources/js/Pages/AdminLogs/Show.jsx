import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import Sidebar from '@/Components/Dashboard/Sidebar';
import DashboardHeader from '@/Components/Dashboard/DashboardHeader';
import PageTransition from '@/Components/PageTransition';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

export default function Show({ log, auth }) {
    const formatDateTime = (dateString) => {
        try {
            return format(new Date(dateString), 'dd MMMM yyyy, HH:mm:ss', { locale: id });
        } catch (error) {
            return dateString;
        }
    };

    const getModuleLabel = (module) => {
        const modules = {
            'users': 'Pengguna',
            'products': 'Produk',
            // Add other modules as needed
        };
        return modules[module] || module;
    };

    const getActionLabel = (action) => {
        const actions = {
            'created': 'Dibuat',
            'updated': 'Diperbarui',
            'deleted': 'Dihapus',
            // Add other actions as needed
        };
        return actions[action] || action;
    };

    const getActionClass = (action) => {
        switch (action) {
            case 'created':
                return 'bg-green-100 text-green-800';
            case 'updated':
                return 'bg-blue-100 text-blue-800';
            case 'deleted':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    // Function to format the details object into a human-readable format
    const formatDetails = (details) => {
        if (!details) return null;
        
        // If details is a plain object with simple key-value pairs
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                {Object.entries(details).map(([key, value]) => {
                    // Skip rendering for certain keys like 'changes' which will be rendered separately
                    if (key === 'changes' || key === 'updated_fields') return null;
                    
                    // Format the key to be more readable
                    const formattedKey = key
                        .replace(/_/g, ' ')
                        .replace(/\b\w/g, c => c.toUpperCase());
                    
                    // Format the value based on its type
                    let formattedValue = value;
                    if (value === null || value === undefined) {
                        formattedValue = '-';
                    } else if (typeof value === 'boolean') {
                        formattedValue = value ? 'Ya' : 'Tidak';
                    } else if (Array.isArray(value)) {
                        formattedValue = value.join(', ');
                    } else if (typeof value === 'object') {
                        return (
                            <div key={key} className="col-span-1 md:col-span-2 p-3 bg-gray-50 rounded-md">
                                <p className="font-medium text-sm text-gray-700 mb-2">{formattedKey}:</p>
                                <pre className="text-xs overflow-x-auto">{JSON.stringify(value, null, 2)}</pre>
                            </div>
                        );
                    }
                    
                    return (
                        <div key={key} className="flex flex-col">
                            <span className="text-sm text-gray-500">{formattedKey}</span>
                            <span className="font-medium">{formattedValue}</span>
                        </div>
                    );
                })}
            </div>
        );
    };

    // Function to format changes for 'update' action
    const formatChanges = (details) => {
        if (!details || !details.changes || !details.updated_fields) return null;
        
        return (
            <div className="mt-6">
                <h4 className="text-lg font-medium text-gray-800 mb-3">Perubahan yang Dilakukan</h4>
                <div className="bg-gray-50 p-4 rounded-md">
                    <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-1 text-sm font-medium text-gray-500">Field</div>
                        <div className="col-span-2 text-sm font-medium text-gray-500">Nilai Baru</div>
                    </div>
                    <div className="mt-2 divide-y divide-gray-200">
                        {Object.entries(details.changes).map(([key, value]) => {
                            // Format the key to be more readable
                            const formattedKey = key
                                .replace(/_/g, ' ')
                                .replace(/\b\w/g, c => c.toUpperCase());
                            
                            // Format the value based on its type
                            let formattedValue = value;
                            if (value === null || value === undefined) {
                                formattedValue = '-';
                            } else if (typeof value === 'boolean') {
                                formattedValue = value ? 'Ya' : 'Tidak';
                            } else if (Array.isArray(value)) {
                                formattedValue = value.join(', ');
                            } else if (typeof value === 'object') {
                                formattedValue = (
                                    <pre className="text-xs overflow-x-auto">{JSON.stringify(value, null, 2)}</pre>
                                );
                            }
                            
                            return (
                                <div key={key} className="grid grid-cols-3 gap-4 py-3">
                                    <div className="col-span-1 font-medium text-gray-700">{formattedKey}</div>
                                    <div className="col-span-2">{formattedValue}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-white">
            <Head title={`Detail Log - ${log.description}`} />
            
            {/* Header */}
            <DashboardHeader 
                pageTitle="Detail Log Aktivitas" 
                breadcrumb={[
                    { label: 'Log Aktivitas', url: route('admin-logs.index') },
                    { label: 'Detail Log' }
                ]}
            />
            
            {/* Layout Utama */}
            <div className="flex min-h-screen pt-20"> 
                <Sidebar />

                {/* Konten Utama */}
                <main className="flex-1 ml-64 p-6 lg:p-8 overflow-y-auto bg-white">
                    <PageTransition>
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-semibold text-gray-800">Detail Log Aktivitas</h3>
                            <Link
                                href={route('admin-logs.index')}
                                className="px-4 py-2 text-gray-600 text-sm border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none transition-colors duration-300"
                            >
                                Kembali
                            </Link>
                        </div>
                        
                        <div className="bg-white rounded-xl shadow-md overflow-hidden">
                            <div className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <h4 className="text-lg font-medium text-gray-800 mb-4">Informasi Log</h4>
                                        
                                        <div className="space-y-4">
                                            <div>
                                                <span className="block text-sm text-gray-500">Deskripsi</span>
                                                <span className="font-medium">{log.description}</span>
                                            </div>
                                            
                                            <div>
                                                <span className="block text-sm text-gray-500">Admin</span>
                                                <span className="font-medium">{log.admin ? log.admin.name : '-'}</span>
                                            </div>
                                            
                                            <div>
                                                <span className="block text-sm text-gray-500">Modul</span>
                                                <span className="font-medium">{getModuleLabel(log.module)}</span>
                                            </div>
                                            
                                            <div>
                                                <span className="block text-sm text-gray-500">Aksi</span>
                                                <span className={`inline-block px-2 py-1 rounded-full text-xs capitalize ${getActionClass(log.action)}`}>
                                                    {getActionLabel(log.action)}
                                                </span>
                                            </div>
                                            
                                            <div>
                                                <span className="block text-sm text-gray-500">Waktu</span>
                                                <span className="font-medium">{formatDateTime(log.created_at)}</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <h4 className="text-lg font-medium text-gray-800 mb-4">Informasi Teknis</h4>
                                        
                                        <div className="space-y-4">
                                            <div>
                                                <span className="block text-sm text-gray-500">ID Log</span>
                                                <span className="font-medium">{log.id}</span>
                                            </div>
                                            
                                            <div>
                                                <span className="block text-sm text-gray-500">IP Address</span>
                                                <span className="font-medium">{log.ip_address || '-'}</span>
                                            </div>
                                            
                                            <div>
                                                <span className="block text-sm text-gray-500">User Agent</span>
                                                <div className="text-sm font-medium break-words">
                                                    {log.user_agent || '-'}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                {log.details && (
                                    <div className="mt-8">
                                        <h4 className="text-lg font-medium text-gray-800 mb-4">Detail Aktivitas</h4>
                                        {formatDetails(log.details)}
                                        {log.action === 'updated' && formatChanges(log.details)}
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
