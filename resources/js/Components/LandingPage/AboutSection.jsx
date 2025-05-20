import React from 'react';
import './SectionAnimations.css';

const AboutSection = () => (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden" id="tentang">
        {/* Grid pattern background hanya di bagian atas section hingga kontainer biru */}
        <div className="absolute inset-0 bottom-auto h-[250px] md:h-[300px] z-0" style={{
            backgroundImage: `
                linear-gradient(to right, rgba(59, 130, 246, 0.08) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(59, 130, 246, 0.08) 1px, transparent 1px),
                radial-gradient(circle, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px, 80px 80px, 40px 40px',
            backgroundPosition: '0px 0px'
        }}></div>
        
        {/* Overlay dengan grid yang lebih halus untuk kedalaman, sama seperti di hero section */}
        <div className="absolute inset-0 bottom-auto h-[250px] md:h-[300px] z-0" style={{
            backgroundImage: `
                linear-gradient(to right, rgba(59, 130, 246, 0.05) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(59, 130, 246, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            backgroundPosition: '0px 0px'
        }}></div>

        <div className="container mx-auto px-6 relative z-10">
            {/* Banner image with text overlay */}
            <div className="w-full mb-16">
                <div className="relative w-full h-[250px] md:h-[300px] rounded-lg overflow-hidden shadow-2xl animate-fade-in">
                    <img 
                        src="/images/hero-section.svg" 
                        alt="Digital Transaction"
                        className="hidden" 
                    />
                    {/* Banner background */}
                    <div className="absolute inset-0 bg-blue-600 bg-opacity-90"></div>
                    
                    {/* Small grid pattern that matches the hero section */}
                    <div className="absolute inset-0" style={{
                        backgroundImage: `
                            linear-gradient(to right, rgba(255, 255, 255, 0.07) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255, 255, 255, 0.07) 1px, transparent 1px)
                        `,
                        backgroundSize: '40px 40px',
                        backgroundPosition: '0px 0px'
                    }}></div>
                    
                    <div 
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage: 'url("/images/aboutsection-image.svg")',
                            opacity: 0.2
                        }}
                    ></div>
                    <div className="absolute inset-0 flex items-center justify-center text-center">
                        <h2 className="text-4xl md:text-5xl font-bold text-white animate-fade-in-delay-1">
                            Kelola Transaksi Anda Dengan Aplikasir
                        </h2>
                    </div>
                </div>
            </div>
            
            {/* Content Section */}
            <div className="flex flex-col md:flex-row gap-12 md:gap-24">                <div className="md:w-1/2 bg-white bg-opacity-70 p-6 rounded-lg shadow-md backdrop-blur-sm animate-fade-in-up">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Aplikasir</h3>
                    <p className="text-gray-600 mb-6 text-base md:text-lg">
                        Aplikasir dirancang untuk membantu mengelola transaksi penjualan di berbagai jenis bisnis.
                    </p>
                </div>
                
                <div className="md:w-1/2 bg-white bg-opacity-70 p-6 rounded-lg shadow-md backdrop-blur-sm animate-fade-in-up-delay-1">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Efisien & Akurat</h3>
                    <p className="text-gray-600 mb-6 text-base md:text-lg">
                        Menggantikan fungsi kasir konvensional yang manual, sehingga proses transaksi menjadi lebih efisien dan akurat.
                    </p>
                </div>
            </div>
        </div>
    </section>
);

export default AboutSection;
