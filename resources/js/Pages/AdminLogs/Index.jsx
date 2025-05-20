import React, { useState } from 'react';
import { Head, Link, usePage, router } from '@inertiajs/react';
import Pagination from '@/Components/Pagination';
import Sidebar from '@/Components/Dashboard/Sidebar';
import DashboardHeader from '@/Components/Dashboard/DashboardHeader';
import PageTransition from '@/Components/PageTransition';
import FlashMessage from '@/Components/FlashMessage';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

export default function Index({ logs, filters = {}, filterOptions = {}, auth }) {
    const { flash } = usePage().props || {};
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [moduleFilter, setModuleFilter] = useState(filters.module || '');
    const [actionFilter, setActionFilter] = useState(filters.action || '');
    const [dateFrom, setDateFrom] = useState(filters.date_from || '');
    const [dateTo, setDateTo] = useState(filters.date_to || '');
    const [showClearModal, setShowClearModal] = useState(false);
    const [clearDate, setClearDate] = useState(format(new Date(), 'yyyy-MM-dd'));

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('admin-logs.index'), {
            search: searchTerm,
            module: moduleFilter,
            action: actionFilter,
            date_from: dateFrom,
            date_to: dateTo,
        }, {
            preserveState: true,
            replace: true,
        });
    };

    const resetFilters = () => {
        setSearchTerm('');
        setModuleFilter('');
        setActionFilter('');
        setDateFrom('');
        setDateTo('');
        router.get(route('admin-logs.index'));
    };

    const handleClearLogs = (e) => {
        e.preventDefault();
        router.post(route('admin-logs.clear'), {
            date: clearDate,
        }, {
            onSuccess: () => {
                setShowClearModal(false);
            },
        });
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

    const formatDateTime = (dateString) => {
        try {
            return format(new Date(dateString), 'dd MMM yyyy, HH:mm:ss', { locale: id });
        } catch (error) {
            return dateString;
        }
    };

    return (
        <div className="min-h-screen bg-white">
            <Head title="Log Aktivitas Admin" />
            
            {/* Header */}
            <DashboardHeader 
                pageTitle="Log Aktivitas Admin" 
                breadcrumb={[{ label: 'Log Aktivitas Admin' }]}
            />
            
            {/* Layout Utama */}
            <div className="flex min-h-screen pt-20"> 
                <Sidebar />

                {/* Konten Utama */}
                <main className="flex-1 ml-64 p-6 lg:p-8 overflow-y-auto bg-white">
                    <PageTransition>
                        {flash && flash.success && (
                            <FlashMessage message={flash.success} type="success" />
                        )}
                        
                        {flash && flash.error && (
                            <FlashMessage message={flash.error} type="error" />
                        )}
                        
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-semibold text-gray-800">Log Aktivitas Admin</h3>
                            <button
                                onClick={() => setShowClearModal(true)}
                                className="px-4 py-2 text-white text-sm bg-red-600 rounded-md hover:bg-red-700 focus:outline-none transition-colors duration-300"
                            >
                                Hapus Log Lama
                            </button>
                        </div>
                        
                        <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
                            <form onSubmit={handleSearch} className="flex flex-col space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                    <div>
                                        <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Pencarian</label>
                                        <input
                                            id="search"
                                            type="text"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            placeholder="Cari di deskripsi aktivitas..."
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    
                                    <div>
                                        <label htmlFor="module" className="block text-sm font-medium text-gray-700 mb-1">Modul</label>
                                        <select
                                            id="module"
                                            value={moduleFilter}
                                            onChange={(e) => setModuleFilter(e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="">Semua Modul</option>
                                            {filterOptions.modules && filterOptions.modules.map((module) => (
                                                <option key={module} value={module}>
                                                    {getModuleLabel(module)}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    
                                    <div>
                                        <label htmlFor="action" className="block text-sm font-medium text-gray-700 mb-1">Aksi</label>
                                        <select
                                            id="action"
                                            value={actionFilter}
                                            onChange={(e) => setActionFilter(e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="">Semua Aksi</option>
                                            {filterOptions.actions && filterOptions.actions.map((action) => (
                                                <option key={action} value={action}>
                                                    {getActionLabel(action)}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="dateFrom" className="block text-sm font-medium text-gray-700 mb-1">Dari Tanggal</label>
                                        <input
                                            id="dateFrom"
                                            type="date"
                                            value={dateFrom}
                                            onChange={(e) => setDateFrom(e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    
                                    <div>
                                        <label htmlFor="dateTo" className="block text-sm font-medium text-gray-700 mb-1">Sampai Tanggal</label>
                                        <input
                                            id="dateTo"
                                            type="date"
                                            value={dateTo}
                                            onChange={(e) => setDateTo(e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>
                                
                                <div className="flex gap-2">
                                    <button 
                                        type="submit"
                                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300"
                                    >
                                        Filter
                                    </button>
                                    <button 
                                        type="button"
                                        onClick={resetFilters}
                                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors duration-300"
                                    >
                                        Reset
                                    </button>
                                </div>
                            </form>
                        </div>

                        <div className="overflow-x-auto rounded-xl bg-white shadow-md">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Admin</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Modul</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deskripsi</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Waktu</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Detail</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {logs.data.length > 0 ? (
                                        logs.data.map((log, index) => (
                                            <tr key={log.id} className="hover:bg-gray-50 transition-colors duration-200">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {(logs.current_page - 1) * logs.per_page + index + 1}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {log.admin ? log.admin.name : '-'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {getModuleLabel(log.module)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    <span className={`px-2 py-1 rounded-full text-xs capitalize ${
                                                        log.action === 'created' ? 'bg-green-100 text-green-800' :
                                                        log.action === 'updated' ? 'bg-blue-100 text-blue-800' :
                                                        log.action === 'deleted' ? 'bg-red-100 text-red-800' :
                                                        'bg-gray-100 text-gray-800'
                                                    }`}>
                                                        {getActionLabel(log.action)}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-500">
                                                    <div className="max-w-xs truncate">
                                                        {log.description}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {formatDateTime(log.created_at)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    <Link 
                                                        href={route('admin-logs.show', log.id)} 
                                                        className="text-blue-600 hover:text-blue-900 transition-colors duration-200"
                                                    >
                                                        Lihat
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500">
                                                Tidak ada data log aktivitas.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>

                            <div className="px-6 py-4 border-t border-gray-200">
                                <Pagination links={logs.links} />
                            </div>
                        </div>
                    </PageTransition>
                </main>
            </div>
            
            {/* Modal Hapus Log Lama */}
            {showClearModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Hapus Log Lama</h3>
                        <p className="text-gray-600 mb-4">
                            Log aktivitas sebelum tanggal yang dipilih akan dihapus secara permanen. Tindakan ini tidak dapat dibatalkan.
                        </p>
                        
                        <form onSubmit={handleClearLogs}>
                            <div className="mb-4">
                                <label htmlFor="clearDate" className="block text-sm font-medium text-gray-700 mb-1">
                                    Hapus log sebelum tanggal:
                                </label>
                                <input
                                    id="clearDate"
                                    type="date"
                                    value={clearDate}
                                    onChange={(e) => setClearDate(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    max={format(new Date(), 'yyyy-MM-dd')}
                                    required
                                />
                            </div>
                            
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setShowClearModal(false)}
                                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors duration-300"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-300"
                                >
                                    Hapus Log
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
