// filepath: d:\Code\aplikasir-web\resources\js\Components\LandingPage\ServicesSection.jsx
import React from 'react';
import './SectionAnimations.css';

const ServiceCard = ({ icon, title, description }) => {
    const getIconColor = () => {
        switch (icon) {
            case 'document':
                return 'text-green-500';
            case 'scan':
                return 'text-blue-500';
            case 'mobile-product':
                return 'text-blue-600';
            case 'mobile-pos':
                return 'text-green-600';
            case 'customers':
                return 'text-purple-600';
            case 'realtime-reports':
                return 'text-yellow-600';
            case 'cloud-sync':
                return 'text-indigo-600';
            case 'security':
                return 'text-red-600';
            default:
                return 'text-blue-500';
        }
    };

    const getIconBgColor = () => {
        switch (icon) {
            case 'document':
                return 'bg-green-100';
            case 'scan':
                return 'bg-blue-100';
            case 'mobile-product':
                return 'bg-blue-100';
            case 'mobile-pos':
                return 'bg-green-100';
            case 'customers':
                return 'bg-purple-100';
            case 'realtime-reports':
                return 'bg-yellow-100';
            case 'cloud-sync':
                return 'bg-indigo-100';
            case 'security':
                return 'bg-red-100';
            default:
                return 'bg-blue-100';
        }
    };

    const renderIcon = () => {
        switch (icon) {
            case 'document':
                return (
                    <div className={`w-10 h-10 ${getIconBgColor()} rounded-lg flex items-center justify-center ${getIconColor()}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                        </svg>
                    </div>
                );
            case 'scan':
                return (
                    <div className={`w-10 h-10 ${getIconBgColor()} rounded-lg flex items-center justify-center ${getIconColor()}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm2 2V5h1v1H5zM3 13a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1v-3zm2 2v-1h1v1H5zM13 3a1 1 0 00-1 1v3a1 1 0 001 1h3a1 1 0 001-1V4a1 1 0 00-1-1h-3zm1 2v1h1V5h-1zM13 12a1 1 0 00-1 1v3a1 1 0 001 1h3a1 1 0 001-1v-3a1 1 0 00-1-1h-3zm1 2v1h1v-1h-1z" clipRule="evenodd" />
                        </svg>
                    </div>
                );
            case 'mobile-product':
                return (
                    <div className={`w-10 h-10 ${getIconBgColor()} rounded-lg flex items-center justify-center ${getIconColor()}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                );
            case 'mobile-pos':
                return (
                    <div className={`w-10 h-10 ${getIconBgColor()} rounded-lg flex items-center justify-center ${getIconColor()}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                    </div>
                );
            case 'customers':
                return (
                    <div className={`w-10 h-10 ${getIconBgColor()} rounded-lg flex items-center justify-center ${getIconColor()}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                    </div>
                );
            case 'realtime-reports':
                return (
                    <div className={`w-10 h-10 ${getIconBgColor()} rounded-lg flex items-center justify-center ${getIconColor()}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                    </div>
                );
            case 'cloud-sync':
                return (
                    <div className={`w-10 h-10 ${getIconBgColor()} rounded-lg flex items-center justify-center ${getIconColor()}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                        </svg>
                    </div>
                );
            case 'security':
                return (
                    <div className={`w-10 h-10 ${getIconBgColor()} rounded-lg flex items-center justify-center ${getIconColor()}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                );
            default:
                return (
                    <div className={`w-10 h-10 ${getIconBgColor()} rounded-lg flex items-center justify-center ${getIconColor()}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                        </svg>
                    </div>
                );
        }
    };    return (
        <div className="bg-white bg-opacity-70 p-6 rounded-lg shadow-md backdrop-blur-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100 h-full flex flex-col">
            {renderIcon()}
            {title && (
                <>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-4">{title}</h3>
                    <p className="text-gray-600 text-base flex-grow">{description}</p>
                </>
            )}
        </div>
    );
};

const ServicesSection = () => {
    const services = [
        {
            icon: 'mobile-product',
            title: 'Manajemen Produk',
            description: 'Kelola inventory, harga, dan stok produk dengan mudah langsung dari aplikasi mobile Anda kapan saja dan di mana saja.'
        },
        {
            icon: 'mobile-pos',
            title: 'Kasir Digital',
            description: 'Proses transaksi penjualan dengan cepat menggunakan aplikasi mobile, termasuk pembayaran tunai dan QRIS.'
        },
        {
            icon: 'document',
            title: 'Catatan Kredit',
            description: 'Catat transaksi kredit konsumen yang berisi detail informasi seperti nama, total yang harus dilunasi, dan tanggal jatuh tempo.'
        },
        {
            icon: 'scan',
            title: 'Pemindaian Produk',
            description: 'Gunakan kamera ponsel untuk memindai barcode atau QR code produk, secara instan mengambil informasi produk.'
        },
        {
            icon: 'customers',
            title: 'Data Pelanggan',
            description: 'Kelola informasi pelanggan dan riwayat transaksi untuk meningkatkan layanan dan membangun hubungan yang lebih baik.'
        },
        {
            icon: 'realtime-reports',
            title: 'Laporan Real-time',
            description: 'Analisis penjualan, keuntungan, dan performa bisnis dengan laporan yang detail dan dapat diakses secara real-time.'
        },
        {
            icon: 'cloud-sync',
            title: 'Sinkronisasi Cloud',
            description: 'Data tersinkronisasi otomatis dengan penyimpanan cloud untuk keamanan dan akses multi-device yang seamless.'
        },
        {
            icon: 'security',
            title: 'Keamanan Terjamin',
            description: 'Data transaksi dan bisnis Anda dilindungi dengan enkripsi tingkat tinggi untuk keamanan maksimal.'
        }
    ];    return (
        <section className="py-16 md:py-24 bg-white relative overflow-hidden" id="layanan">
            {/* Background Grid Pattern - Consistent with other sections */}
            <div className="absolute inset-0 z-0" style={{
                backgroundImage: `
                    linear-gradient(to right, rgba(59, 130, 246, 0.08) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(59, 130, 246, 0.08) 1px, transparent 1px),
                    radial-gradient(circle, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: '80px 80px, 80px 80px, 40px 40px',
                backgroundPosition: '0px 0px'
            }}></div>
            
            {/* Subtle overlay for depth */}
            <div className="absolute inset-0 z-0" style={{
                backgroundImage: `
                    linear-gradient(to right, rgba(59, 130, 246, 0.05) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(59, 130, 246, 0.05) 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px',
                backgroundPosition: '0px 0px'
            }}></div>

            <div className="container mx-auto px-6 relative z-10">
                {/* All features section */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 md:p-12 animate-fade-in-up-delay-2">                    <div className="text-center mb-12">
                        <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                            Semua Fitur Aplikasir
                        </h3>
                        <p className="text-gray-600 max-w-2xl mx-auto mb-8">
                            Lengkapi bisnis Anda dengan semua fitur yang tersedia untuk pengalaman terbaik
                        </p>
                        
                        {/* Feature highlights */}
                        <div className="flex flex-wrap justify-center gap-4 mt-8 animate-fade-in-up-delay-2">
                            <span className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                                100% Mobile
                            </span>
                            <span className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                </svg>
                                Gratis Selamanya
                            </span>
                            <span className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                Bekerja Offline
                            </span>
                        </div>
                    </div>                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {services.map((service, index) => (
                            <ServiceCard 
                                key={index}
                                icon={service.icon} 
                                title={service.title} 
                                description={service.description} 
                            />
                        ))}
                    </div>
                </div>

                {/* Value proposition section */}
                <div className="mt-16 text-center animate-fade-in-up-delay-2">
                    <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 md:p-12 text-white">
                        <h3 className="text-2xl md:text-3xl font-bold mb-4">
                            Siap Meningkatkan Efisiensi Bisnis Anda?
                        </h3>
                        <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-8">
                            Bergabunglah dengan ribuan pengusaha UMKM yang telah mempercayai Aplikasir untuk mengelola bisnis mereka
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <div className="flex items-center space-x-2">
                                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span>Setup dalam 5 menit</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span>Tanpa biaya bulanan</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span>Support 24/7</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;
