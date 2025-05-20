import React from 'react';
import { Link } from '@inertiajs/react';
import './IconAnimations.css';
import './SectionAnimations.css';

// Hero Section Component with geometric elements and subtle shadows
const HeroSection = () => {
    // Definisikan keyframes dan animasi langsung dalam inline style
    const animationStyles = {
        '@keyframes floatAnim': {
            '0%, 100%': { transform: 'translateY(0px)' },
            '50%': { transform: 'translateY(-15px)' }
        },
        '@keyframes pulseAnim': {
            '0%, 100%': { transform: 'scale(1)' },
            '50%': { transform: 'scale(1.1)' }
        }
    };
    
    // Style untuk animasi ikon
    const iconAnimations = {
        float: {
            animation: 'floatAnim 5s ease-in-out infinite',
            transform: 'translateY(0px)'
        },
        floatDelay1: {
            animation: 'floatAnim 5s ease-in-out infinite 0.8s',
            transform: 'translateY(0px)'
        },
        floatDelay2: {
            animation: 'floatAnim 5s ease-in-out infinite 1.6s',
            transform: 'translateY(0px)'
        },
        pulse: {
            animation: 'pulseAnim 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            transform: 'scale(1)'
        },
        pulseDelay1: {
            animation: 'pulseAnim 4s cubic-bezier(0.4, 0, 0.6, 1) infinite 1.5s',
            transform: 'scale(1)'
        },
        pulseDelay2: {
            animation: 'pulseAnim 4s cubic-bezier(0.4, 0, 0.6, 1) infinite 2.7s',
            transform: 'scale(1)'
        },
    };

    return (        <section className="pt-24 pb-16 md:pt-32 md:pb-24 min-h-screen flex items-center relative overflow-hidden bg-white" id="beranda">            {/* Background with grid pattern */}
            <div className="absolute inset-0 bg-gray-50 -z-20"></div>
            
            {/* Grid lines - using direct CSS instead of components */}
            <div className="absolute inset-0 z-0" style={{
                backgroundImage: `
                    linear-gradient(to right, rgba(59, 130, 246, 0.08) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(59, 130, 246, 0.08) 1px, transparent 1px),
                    radial-gradient(circle, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: '80px 80px, 80px 80px, 40px 40px',
                backgroundPosition: '0px 0px'
            }}></div>
            
            {/* Overlay with faded grid for more depth */}
            <div className="absolute inset-0 z-0" style={{
                backgroundImage: `
                    linear-gradient(to right, rgba(59, 130, 246, 0.05) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(59, 130, 246, 0.05) 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px',
                backgroundPosition: '0px 0px'
            }}></div>

            <div className="container mx-auto px-6 flex flex-col md:flex-row items-center relative">                <div className="md:w-1/2 lg:w-3/5 text-center md:text-left mb-12 md:mb-0 z-10">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight animate-fade-in-up">
                        Jadikan Kegiatan Transaksi Anda Menjadi Lebih Mudah
                    </h1>
                    <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto md:mx-0 animate-fade-in-up-delay-1">
                        Memulai hal kecil dalam membantu mengelola pendapatan dan pengeluaran usahamu agar lebih
                        mudah, praktis dan terjaga. Untuk langkah yang lebih cerah
                    </p>
                    <Link
                        href="/login"
                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg text-lg transition duration-300 ease-in-out shadow-lg hover:shadow-xl transform hover:-translate-y-1 animate-fade-in-up-delay-2"
                    >
                        Jelajahi Aplikasi
                    </Link>
                </div>                <div className="md:w-1/2 lg:w-2/5 flex flex-col items-center justify-center z-10">                    {/* Main image dengan ikon menyebar di sekitarnya */}                    <div className="relative w-[400px] h-[400px] md:w-[450px] md:h-[450px] flex items-center justify-center mb-4">
                        {/* Main image (central) */}
                        <div className="bg-blue-500 rounded-full w-[280px] h-[280px] md:w-[320px] md:h-[320px] flex items-center justify-center shadow-xl z-10 animate-blob">
                            <img 
                                src="/images/hero-section.svg" 
                                alt="E-commerce solution" 
                                className="w-[80%] h-[80%] object-contain"
                            />
                        </div>
                          {/* Ikon tersebar di sekitar gambar utama */}
                          {/* Kasir Icon - top left */}
                        <div className="absolute top-0 left-5 bg-white rounded-full p-3 shadow-xl flex items-center justify-center w-16 h-16 hover:shadow-blue-300/70 hover:scale-110 transition-all duration-300 icon-float animate-icon">
                            <div className="bg-blue-500 w-8 h-6 rounded-sm flex items-center justify-center">
                                <div className="bg-white w-4 h-2 rounded-sm"></div>
                            </div>
                            <span className="absolute -bottom-6 text-xs font-medium text-gray-600">Kasir</span>
                        </div>
                        
                        {/* Keranjang Icon - top right */}
                        <div className="absolute top-10 right-0 bg-white rounded-full p-3 shadow-xl flex items-center justify-center w-16 h-16 hover:shadow-orange-300/70 hover:scale-110 transition-all duration-300 icon-float-delay1 animate-icon-delay-1">
                            <div className="bg-orange-400 w-8 h-7 rounded-md relative">
                                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-3 border-2 border-blue-500 rounded-t-full"></div>
                            </div>
                            <span className="absolute -bottom-6 text-xs font-medium text-gray-600">Keranjang</span>
                        </div>
                          {/* Scan QR Icon - mid left */}
                        <div className="absolute top-1/2 -translate-y-1/2 left-0 bg-white rounded-full p-3 shadow-xl flex items-center justify-center w-16 h-16 hover:shadow-green-300/70 hover:scale-110 transition-all duration-300 icon-pulse animate-icon-delay-2">
                            <div className="grid grid-cols-2 gap-1 w-8 h-8">
                                <div className="bg-green-500 rounded-sm"></div>
                                <div className="bg-green-500 rounded-sm"></div>
                                <div className="bg-green-500 rounded-sm"></div>
                                <div className="bg-green-500 rounded-sm"></div>
                            </div>
                            <span className="absolute -bottom-6 text-xs font-medium text-gray-600">Scan QR</span>
                        </div>
                          {/* Kredit Icon - mid right */}
                        <div className="absolute top-1/2 -translate-y-1/2 right-0 bg-white rounded-full p-3 shadow-xl flex items-center justify-center w-16 h-16 hover:shadow-purple-300/70 hover:scale-110 transition-all duration-300 icon-pulse-delay1 animate-icon-delay-3">
                            <div className="bg-purple-500 w-8 h-8 rounded-full flex items-center justify-center font-bold text-white">
                                <div className="flex items-center justify-center">
                                    <span className="text-xl">₹</span>
                                </div>
                            </div>
                            <span className="absolute -bottom-6 text-xs font-medium text-gray-600">Kredit</span>
                        </div>
                        
                        {/* Stok Icon - bottom left */}
                        <div className="absolute bottom-10 left-10 bg-white rounded-full p-3 shadow-xl flex items-center justify-center w-16 h-16 hover:shadow-yellow-300/70 hover:scale-110 transition-all duration-300 icon-pulse-delay2 animate-icon-delay-4">
                            <div className="w-8 h-8">
                                <div className="bg-yellow-400 w-8 h-2 mb-1 rounded-sm"></div>
                                <div className="bg-yellow-400 w-6 h-2 mb-1 rounded-sm"></div>
                                <div className="bg-yellow-400 w-4 h-2 rounded-sm"></div>
                            </div>
                            <span className="absolute -bottom-6 text-xs font-medium text-gray-600">Stok</span>
                        </div>
                          {/* Pelanggan Icon - bottom right */}
                        <div className="absolute bottom-0 right-10 bg-white rounded-full p-3 shadow-xl flex items-center justify-center w-16 h-16 hover:shadow-cyan-300/70 hover:scale-110 transition-all duration-300 icon-float-delay2 animate-icon-delay-5">
                            <div className="w-8 h-8 flex flex-col items-center">
                                <div className="bg-cyan-500 w-4 h-4 rounded-full"></div>
                                <div className="bg-cyan-500 w-6 h-3 mt-1 rounded-t-md"></div>
                            </div>
                            <span className="absolute -bottom-6 text-xs font-medium text-gray-600">Pelanggan</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
