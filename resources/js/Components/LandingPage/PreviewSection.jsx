import React, { useState } from 'react';
import './SectionAnimations.css';

const PreviewSection = () => {
    // State untuk pagination
    const [activeSlide, setActiveSlide] = useState(2); // Dimulai di slide ketiga (index 2)
    
    // Data untuk preview mockup menggunakan SVG files
    const previewItems = [
        {
            id: 0,
            title: "Produk",
            svgPath: "/mockup/Produk.svg",
            description: "Kelola inventori dan stok produk dengan mudah"
        },
        {
            id: 1,
            title: "Checkout",
            svgPath: "/mockup/Checkout.svg",
            description: "Proses transaksi yang cepat dan efisien"
        },
        {
            id: 2,
            title: "Beranda",
            svgPath: "/mockup/Beranda.svg",
            description: "Dashboard lengkap untuk monitoring bisnis"
        },
        {
            id: 3,
            title: "Scan Barcode",
            svgPath: "/mockup/Scan Barcode.svg",
            description: "Scanner barcode untuk input produk otomatis"
        },
        {
            id: 4,
            title: "Laporan",
            svgPath: "/mockup/Laporan.svg",
            description: "Analisis penjualan dan laporan bisnis"
        },
        {
            id: 5,
            title: "Pelanggan",
            svgPath: "/mockup/Pelanggan.svg",
            description: "Manajemen data pelanggan dan riwayat"
        },
        {
            id: 6,
            title: "QRIS",
            svgPath: "/mockup/Pengaturan QRIS.svg",
            description: "Pengaturan sistem pembayaran QRIS"
        }
    ];

    // Fungsi untuk mengubah slide
    const goToSlide = (index) => {
        setActiveSlide(index);
    };

    // Dapatkan 3 slide yang akan ditampilkan (sebelum, aktif, sesudah)
    const getVisibleSlides = () => {
        let slides = [];
        const totalSlides = previewItems.length;
        
        // Slide utama tengah
        slides.push({
            item: previewItems[activeSlide], 
            position: 'center',
            index: activeSlide
        });
        
        // Slide sebelumnya
        const prevIndex = activeSlide === 0 ? totalSlides - 1 : activeSlide - 1;
        slides.push({
            item: previewItems[prevIndex],
            position: 'left',
            index: prevIndex
        });
        
        // Slide selanjutnya
        const nextIndex = activeSlide === totalSlides - 1 ? 0 : activeSlide + 1;
        slides.push({
            item: previewItems[nextIndex],
            position: 'right',
            index: nextIndex
        });
        
        // Urutkan berdasarkan posisi (left, center, right)
        slides = slides.sort((a, b) => {
            const order = { left: 0, center: 1, right: 2 };
            return order[a.position] - order[b.position];
        });
          return slides;
    };
    
    const visibleSlides = getVisibleSlides();
    
    return (
        <section className="py-16 md:py-24 bg-white relative overflow-hidden" id="preview">
            {/* Background Grid Pattern - Consistent with other sections */}
            <div className="absolute inset-0 z-0" style={{
                backgroundImage: `
                    linear-gradient(to right, rgba(59, 130, 246, 0.06) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(59, 130, 246, 0.06) 1px, transparent 1px),
                    radial-gradient(circle, rgba(59, 130, 246, 0.08) 1px, transparent 1px)
                `,
                backgroundSize: '80px 80px, 80px 80px, 40px 40px',
                backgroundPosition: '0px 0px'
            }}></div>
            
            {/* Subtle overlay for depth */}
            <div className="absolute inset-0 z-0" style={{
                backgroundImage: `
                    linear-gradient(to right, rgba(59, 130, 246, 0.03) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(59, 130, 246, 0.03) 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px',
                backgroundPosition: '0px 0px'
            }}></div>

            <div className="container mx-auto px-6 relative z-10">
                {/* SEO-friendly header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 animate-fade-in-up">
                        Preview Aplikasi Kasir Mobile
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto animate-fade-in-up-delay-1">
                        Jelajahi fitur-fitur lengkap Aplikasir melalui preview interaktif aplikasi mobile yang dirancang khusus untuk kemudahan pengelolaan bisnis Anda
                    </p>
                    
                    {/* Feature highlights */}
                    <div className="flex flex-wrap justify-center gap-4 mt-8 animate-fade-in-up-delay-2">
                        <span className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                            Mobile Responsive
                        </span>
                        <span className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                            </svg>
                            User-Friendly
                        </span>
                        <span className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            Real-time Updates
                        </span>
                    </div>
                </div>                {/* App preview showcase */}
                <div className="flex flex-col lg:flex-row items-center justify-center gap-4 md:gap-8 animate-fade-in-up-delay-2">
                    {/* Render visible slides */}
                    {visibleSlides.map((slide) => {
                        return (
                            <div 
                                key={slide.item.id}
                                className={`transition-all duration-500 ${
                                    slide.position === 'center'
                                        ? 'z-20 lg:mt-0 scale-100 opacity-100'
                                        : 'z-10 opacity-70 scale-95 lg:-mt-10'
                                    }`}
                            >
                                <MobilePreview 
                                    svgPath={slide.item.svgPath}
                                    title={slide.item.title}
                                    description={slide.item.description}
                                    isActive={slide.position === 'center'}
                                />
                            </div>
                        );
                    })}
                </div>
                
                {/* App features navigation */}
                <div className="flex flex-wrap justify-center mt-12 gap-2">
                    {previewItems.map((item, index) => (
                        <button
                            key={item.id}
                            onClick={() => goToSlide(index)}
                            className={`group relative px-4 py-2 rounded-full transition-all duration-300 ${
                                activeSlide === index 
                                    ? 'bg-blue-600 text-white shadow-lg scale-105' 
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:scale-102'
                            }`}
                            aria-label={`Preview ${item.title}`}
                        >
                            <span className="text-sm font-medium">{item.title}</span>
                            {activeSlide === index && (
                                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                            )}
                        </button>
                    ))}
                </div>
                
                {/* Feature description for active slide */}
                <div className="text-center mt-6 animate-fade-in-up-delay-3">
                    <p className="text-gray-600 max-w-md mx-auto">
                        {previewItems[activeSlide].description}
                    </p>
                </div>
            </div>
        </section>
    );
};

// Reusable Mobile Preview Component
const MobilePreview = ({ svgPath, title, description, isActive }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    return (
        <div className={`relative transition-all duration-500 ${isActive ? 'transform-none' : ''}`}>
            {/* SVG Container - No frame needed since SVG already includes phone frame */}
            <div className="relative w-64 md:w-72 h-[500px] md:h-[580px]">
                {!imageError ? (
                    <>
                        {/* Loading placeholder */}
                        {!imageLoaded && (
                            <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-3xl">
                                <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
                            </div>
                        )}
                        
                        {/* SVG Image */}
                        <img
                            src={svgPath}
                            alt={`${title} Preview`}
                            className={`w-full h-full object-contain transition-opacity duration-300 ${
                                imageLoaded ? 'opacity-100' : 'opacity-0'
                            }`}
                            onLoad={() => setImageLoaded(true)}
                            onError={() => {
                                setImageError(true);
                                console.warn(`Failed to load mockup: ${svgPath}`);
                            }}
                            loading="lazy"
                        />
                    </>
                ) : (
                    /* Fallback content when image fails */
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-3xl shadow-2xl border-8 border-gray-800">
                        <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mb-4">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h4 className="text-lg font-semibold text-gray-800 mb-2">{title}</h4>
                        <p className="text-sm text-gray-600 text-center leading-relaxed">
                            {description}
                        </p>
                        <div className="mt-6 flex space-x-2">
                            <div className="w-12 h-2 bg-blue-300 rounded-full"></div>
                            <div className="w-8 h-2 bg-blue-200 rounded-full"></div>
                            <div className="w-16 h-2 bg-blue-300 rounded-full"></div>
                        </div>
                    </div>
                )}
            </div>
            
            {/* Shadow and glow effect for active slide */}
            {isActive && (
                <div className="absolute inset-0 -z-10 bg-blue-500/20 blur-xl rounded-3xl scale-110 animate-pulse"></div>
            )}
        </div>
    );
};

export default PreviewSection;
