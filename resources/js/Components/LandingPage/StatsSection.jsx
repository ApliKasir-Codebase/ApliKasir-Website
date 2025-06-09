import React from 'react';
import { 
    UsersIcon, 
    ShoppingBagIcon, 
    TruckIcon, 
    StarIcon 
} from '@heroicons/react/24/outline';

const StatsSection = () => {    const stats = [
        {
            id: 1,
            name: "Pengguna Aktif",
            stat: "10-30",
            icon: UsersIcon,
            description: "UMKM mikro yang sudah mencoba",
            trend: "Aplikasi baru diluncurkan",
            color: "blue"
        },
        {
            id: 2,
            name: "Transaksi Harian",
            stat: "10-50",
            icon: ShoppingBagIcon,
            description: "Transaksi dicatat setiap hari",
            trend: "Akan terus bertambah",
            color: "emerald"
        },
        {
            id: 3,
            name: "Produk Terdaftar",
            stat: "100+",
            icon: TruckIcon,
            description: "Produk dikelola dengan ApliKasir",
            trend: "Bertambah setiap minggu",
            color: "purple"
        },
        {
            id: 4,
            name: "Rating Pengguna",
            stat: "Baru Launching",
            icon: StarIcon,
            description: "Menunggu review dari UMKM",
            trend: "Dukung kami dengan feedback!",
            color: "yellow"
        }
    ];

    return (
        <section className="py-16 md:py-20 bg-gradient-to-br from-blue-50 via-white to-indigo-50 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/grid.svg')] opacity-5"></div>
            <div className="absolute top-20 right-20 w-40 h-40 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute bottom-20 left-20 w-32 h-32 bg-indigo-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 animate-fade-in-up">
                        📊 Aplikasi Baru untuk UMKM Mikro
                    </h2>
                    <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto animate-fade-in-up-delay-1 leading-relaxed">
                        ApliKasir baru saja diluncurkan dan didedikasikan 100% gratis untuk UMKM mikro (warung, toko kelontong, penjual pinggir jalan, sembako, dll). Mari tumbuh bersama dari awal!
                    </p>
                </div>
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 animate-fade-in-up-delay-2">
                    {stats.map((item) => (
                        <div
                            key={item.id}
                            className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 group"
                        >
                            <div className="text-center">
                                <div className="flex justify-center mb-4">
                                    <div className={`p-3 rounded-xl transition-all duration-300 group-hover:scale-110 ${
                                        item.color === 'blue' ? 'bg-blue-100 group-hover:bg-blue-200' :
                                        item.color === 'emerald' ? 'bg-emerald-100 group-hover:bg-emerald-200' :
                                        item.color === 'purple' ? 'bg-purple-100 group-hover:bg-purple-200' :
                                        'bg-yellow-100 group-hover:bg-yellow-200'
                                    }`}>
                                        <item.icon className={`h-8 w-8 ${
                                            item.color === 'blue' ? 'text-blue-600' :
                                            item.color === 'emerald' ? 'text-emerald-600' :
                                            item.color === 'purple' ? 'text-purple-600' :
                                            'text-yellow-600'
                                        }`} aria-hidden="true" />
                                    </div>
                                </div>
                                <dt className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 animate-pulse">
                                    {item.stat}
                                </dt>
                                <dd className="text-lg font-semibold text-gray-700 mb-2">
                                    {item.name}
                                </dd>
                                <p className="text-sm text-gray-500 mb-3">
                                    {item.description}
                                </p>
                                {/* Trend indicator */}
                                <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                                    item.color === 'blue' ? 'bg-blue-50 text-blue-700' :
                                    item.color === 'emerald' ? 'bg-emerald-50 text-emerald-700' :
                                    item.color === 'purple' ? 'bg-purple-50 text-purple-700' :
                                    'bg-yellow-50 text-yellow-700'
                                }`}>
                                    📈 {item.trend}
                                </div>
                            </div>
                            
                            {/* Decorative element */}
                            <div className={`absolute -top-2 -right-2 w-20 h-20 rounded-full opacity-10 ${
                                item.color === 'blue' ? 'bg-gradient-to-br from-blue-400 to-indigo-500' :
                                item.color === 'emerald' ? 'bg-gradient-to-br from-emerald-400 to-green-500' :
                                item.color === 'purple' ? 'bg-gradient-to-br from-purple-400 to-indigo-500' :
                                'bg-gradient-to-br from-yellow-400 to-orange-500'
                            }`}></div>
                        </div>
                    ))}
                </div>
            </div>
            {/* Ajakan bergabung ke komunitas */}
            <div className="mt-16 text-center animate-fade-in-up-delay-4">
                <p className="text-sm font-medium text-gray-500 mb-6">
                    ⭐ ApliKasir baru diluncurkan, ayo jadi bagian dari komunitas pengguna awal!
                </p>
                <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
                    <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">✓</span>
                        </div>
                        <span className="text-sm font-medium text-gray-600">Warung Kelontong</span>
                    </div>
                    <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">✓</span>
                        </div>
                        <span className="text-sm font-medium text-gray-600">Toko Fashion</span>
                    </div>
                    <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">✓</span>
                        </div>
                        <span className="text-sm font-medium text-gray-600">Cafe & Restoran</span>
                    </div>
                    <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">✓</span>
                        </div>
                        <span className="text-sm font-medium text-gray-600">Minimarket</span>
                    </div>
                    <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">✓</span>
                        </div>
                        <span className="text-sm font-medium text-gray-600">Apotek</span>
                    </div>
                    <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">✓</span>
                        </div>
                        <span className="text-sm font-medium text-gray-600">Toko Elektronik</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StatsSection;
