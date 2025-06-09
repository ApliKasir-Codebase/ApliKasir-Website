import React from 'react';
import './SectionAnimations.css';

const AboutSection = () => (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden" id="tentang">
        {/* Background Grid Pattern - Consistent with FAQ section */}
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
            {/* SEO-friendly header */}
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 animate-fade-in-up">
                    Tentang Aplikasir
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto animate-fade-in-up-delay-1">
                    Solusi aplikasi kasir digital yang dirancang khusus untuk membantu UMKM dan bisnis mengelola transaksi dengan lebih efisien
                </p>
            </div>

            {/* Hero banner with modern design */}
            <div className="mb-16 animate-fade-in-up-delay-2">
                <div className="relative w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-blue-600 to-blue-800">
                    {/* Grid pattern overlay */}
                    <div className="absolute inset-0" style={{
                        backgroundImage: `
                            linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
                        `,
                        backgroundSize: '40px 40px',
                        backgroundPosition: '0px 0px'
                    }}></div>
                    
                    {/* Background image with opacity */}
                    <div 
                        className="absolute inset-0 bg-cover bg-center opacity-20"
                        style={{
                            backgroundImage: 'url("/images/aboutsection-image.svg")'
                        }}
                    ></div>
                    
                    {/* Content overlay */}
                    <div className="absolute inset-0 flex items-center justify-center text-center p-8">
                        <div>
                            <h3 className="text-3xl md:text-5xl font-bold text-white mb-4">
                                Modernisasi Bisnis Anda
                            </h3>
                            <p className="text-lg md:text-xl text-blue-100 max-w-2xl">
                                Dari kasir manual menuju sistem digital yang terintegrasi dan mudah digunakan
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Value proposition cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in-up">
                    <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                        </svg>
                    </div>
                    <h4 className="text-xl font-semibold text-gray-800 mb-4">Aplikasir Digital</h4>
                    <p className="text-gray-600 leading-relaxed">
                        Platform kasir digital yang dirancang khusus untuk membantu mengelola transaksi penjualan di berbagai jenis bisnis UMKM dengan teknologi terdepan.
                    </p>
                </div>

                <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in-up-delay-1">
                    <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <h4 className="text-xl font-semibold text-gray-800 mb-4">Efisien & Akurat</h4>
                    <p className="text-gray-600 leading-relaxed">
                        Menggantikan sistem kasir konvensional yang manual dengan otomatisasi cerdas, membuat proses transaksi menjadi lebih cepat, efisien dan akurat.
                    </p>
                </div>

                <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in-up-delay-2 md:col-span-2 lg:col-span-1">
                    <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                        <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <h4 className="text-xl font-semibold text-gray-800 mb-4">Mobile-First</h4>
                    <p className="text-gray-600 leading-relaxed">
                        Dioptimalkan untuk perangkat mobile dengan antarmuka yang intuitif, memungkinkan Anda mengelola bisnis kapan saja dan di mana saja dengan mudah.
                    </p>
                </div>
            </div>

            {/* Benefits section */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 md:p-12 animate-fade-in-up-delay-2">
                <div className="text-center mb-12">
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                        Mengapa Memilih Aplikasir?
                    </h3>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Solusi komprehensif untuk modernisasi sistem kasir dan manajemen bisnis Anda
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <div className="flex items-start space-x-4">
                            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <div>
                                <h5 className="font-semibold text-gray-800 mb-2">Gratis Selamanya</h5>
                                <p className="text-gray-600">Paket Starter 100% gratis tanpa biaya tersembunyi untuk fitur dasar yang lengkap</p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4">
                            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <div>
                                <h5 className="font-semibold text-gray-800 mb-2">Bekerja Offline</h5>
                                <p className="text-gray-600">Tetap bisa beroperasi tanpa koneksi internet, data sync otomatis saat online</p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4">
                            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <div>
                                <h5 className="font-semibold text-gray-800 mb-2">Barcode Scanner</h5>
                                <p className="text-gray-600">Scan produk dengan kamera smartphone untuk input yang cepat dan akurat</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-start space-x-4">
                            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>                            <div>
                                <h5 className="font-semibold text-gray-800 mb-2">Pembayaran QRIS</h5>
                                <p className="text-gray-600">Pembayaran digital dengan QR Code statis yang mudah digunakan pelanggan</p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4">
                            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <div>
                                <h5 className="font-semibold text-gray-800 mb-2">Manajemen Kredit</h5>
                                <p className="text-gray-600">Sistem hutang-piutang terintegrasi untuk pelanggan dengan pembayaran kredit</p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4">
                            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <div>
                                <h5 className="font-semibold text-gray-800 mb-2">Laporan Real-time</h5>
                                <p className="text-gray-600">Dashboard analytics dan laporan penjualan yang comprehensive untuk insight bisnis</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

export default AboutSection;
