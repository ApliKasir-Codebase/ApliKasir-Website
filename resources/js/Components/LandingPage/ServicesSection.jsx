import React from 'react';
import './SectionAnimations.css';

const ServiceCard = ({ icon, title, description }) => {
    const getIconColor = () => {
        switch (icon) {
            case 'package':
                return 'text-red-500';
            case 'money':
                return 'text-yellow-500';
            case 'document':
                return 'text-green-500';
            case 'chart':
                return 'text-red-500';
            case 'scan':
                return 'text-blue-500';
            default:
                return 'text-blue-500';
        }
    };

    const getIconBgColor = () => {
        switch (icon) {
            case 'package':
                return 'bg-red-100';
            case 'money':
                return 'bg-yellow-100';
            case 'document':
                return 'bg-green-100';
            case 'chart':
                return 'bg-red-100';
            case 'scan':
                return 'bg-blue-100';
            default:
                return 'bg-blue-100';
        }
    };

    const renderIcon = () => {
        switch (icon) {
            case 'package':
                return (
                    <div className={`w-10 h-10 ${getIconBgColor()} rounded-lg flex items-center justify-center ${getIconColor()}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                        </svg>
                    </div>
                );
            case 'money':
                return (
                    <div className={`w-10 h-10 ${getIconBgColor()} rounded-lg flex items-center justify-center ${getIconColor()}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                        </svg>
                    </div>
                );
            case 'document':
                return (
                    <div className={`w-10 h-10 ${getIconBgColor()} rounded-lg flex items-center justify-center ${getIconColor()}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                        </svg>
                    </div>
                );
            case 'chart':
                return (
                    <div className={`w-10 h-10 ${getIconBgColor()} rounded-lg flex items-center justify-center ${getIconColor()}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
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
            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-4">{title}</h3>
            <p className="text-gray-600 text-base flex-grow">{description}</p>
        </div>
    );
};

const ServicesSection = () => {
    const services = [
        {
            icon: 'package',
            title: 'Manajemen Produk',
            description: 'Anda dapat melihat stok produk secara real-time, menambahkan produk baru beserta detailnya, memperbarui informasi produk yang sudah ada seperti nama, harga, dan jumlah stok, serta dapat menghapus informasi dari sebuah produk.'
        },
        {
            icon: 'money',
            title: 'Transaksi',
            description: 'Pilih produk dari katalog digital, tentukan jumlah yang diinginkan, dan lihat total harganya. Input metode pembayaran, kemudian masukkan nominal transaksi sesuai total harga, maka akan muncul halaman validasi berupa rincian pembelian dan status pembayaran.'
        },
        {
            icon: 'document',
            title: 'Catatan Kredit',
            description: 'Catat transaksi kredit konsumen yang berisi detail informasi seperti nama, total yang harus dilunasi, dan tanggal jatuh tempo yang dimasukkan ke dalam list. Konsumen dapat melakukan pelunasan sebelum tanggal jatuh tempo yang tertera.'
        },
        {
            icon: 'chart',
            title: 'Laporan',
            description: 'Akses berbagai jenis laporan seperti laporan umum, harian, dan transaksi penjualan. Laporan penjualan dikategorikan ke dalam periode tahunan, bulanan, harian, dan juga ada tiap jam. Pada layanan ini, Anda juga dapat melihat total keuntungan maupun kerugian penjualan.'
        },
        {
            icon: 'scan',
            title: 'Pemindaian Produk',
            description: 'Gunakan kamera ponsel untuk memindai barcode atau QR code produk, secara instan mengambil informasi produk seperti nama, gambar, dan kuantitasnya yang kemudian ditampilkan kepada pengguna.'
        }
    ];    return (
        <section className="py-16 md:py-24 bg-white relative" id="layanan">
            <div className="container mx-auto px-6">                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 animate-fade-in-up">Layanan</h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto animate-fade-in-up-delay-1">
                        Fitur-fitur lengkap untuk membantu Anda mengelola bisnis dengan lebih efisien
                    </p>
                </div>{/* Grid layout dengan semua card ukuran yang sama */}                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in-up-delay-2">
                    {/* 3 item pertama */}
                    {services.slice(0, 3).map((service, index) => (
                        <div key={index} className="h-full">
                            <ServiceCard 
                                icon={service.icon} 
                                title={service.title} 
                                description={service.description} 
                            />
                        </div>
                    ))}
                </div>
                  {/* 2 item terakhir dengan penempatan di tengah */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto animate-fade-in-up-delay-2">
                    {services.slice(3).map((service, index) => (
                        <div key={index + 3} className="h-full">
                            <ServiceCard 
                                icon={service.icon} 
                                title={service.title} 
                                description={service.description} 
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;
