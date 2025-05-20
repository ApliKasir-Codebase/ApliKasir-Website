import React, { useState } from 'react';
import './SectionAnimations.css';

const PreviewSection = () => {
    // State untuk pagination
    const [activeSlide, setActiveSlide] = useState(2); // Dimulai di slide ketiga (index 2)
    
    // Data untuk preview mockup
    const previewItems = [
        {
            id: 0,
            title: "Form Produk",
            component: FormProductMockup
        },
        {
            id: 1,
            title: "Transaksi",
            component: TransactionMockup
        },
        {
            id: 2,
            title: "Dashboard",
            component: DashboardMockup
        },
        {
            id: 3,
            title: "Scanner Barcode",
            component: BarcodeScannerMockup
        },
        {
            id: 4,
            title: "Laporan",
            component: ReportMockup
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
        <section className="py-16 md:py-24 bg-white relative overflow-hidden" id="layanan">
            <div className="container mx-auto px-6 relative z-10">                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 animate-fade-in-up">Aplikasi Kasir Modern untuk Bisnis Anda</h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto animate-fade-in-up-delay-1">
                        Nikmati berbagai fitur lengkap untuk mengelola transaksi, produk, dan laporan dalam satu aplikasi yang intuitif
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row items-center justify-center gap-4 md:gap-8 animate-fade-in-up-delay-2">
                    {/* Render visible slides */}
                    {visibleSlides.map((slide) => {
                        const MockupComponent = slide.item.component;
                        return (
                            <div 
                                key={slide.item.id}
                                className={`transition-all duration-500 ${
                                    slide.position === 'center'
                                        ? 'z-20 lg:mt-0 scale-100 opacity-100'
                                        : 'z-10 opacity-70 scale-95 lg:-mt-10'
                                    }`}
                            >
                                <MockupComponent />
                            </div>
                        );
                    })}
                </div>
                
                {/* App features dots indicator */}
                <div className="flex justify-center mt-8 space-x-3">
                    {previewItems.map((item, index) => (
                        <button
                            key={item.id}
                            onClick={() => goToSlide(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                activeSlide === index 
                                    ? 'bg-blue-500 transform scale-125' 
                                    : 'bg-gray-300 hover:bg-gray-400'
                            }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

// Komponen untuk mockup form tambah produk
const FormProductMockup = () => {
    return (
        <div className="relative w-64 md:w-72 h-[500px] md:h-[580px] rounded-3xl overflow-hidden shadow-xl border-8 border-gray-800 bg-white">
            <div className="absolute top-0 w-full h-8 bg-gray-800 flex items-center justify-center">
                <div className="w-16 h-1.5 bg-gray-600 rounded-full"></div>
            </div>
            <div className="absolute top-8 left-0 right-0 bottom-0 overflow-hidden">
                {/* Konten form tambah produk */}
                <div className="h-full w-full bg-white p-4 flex flex-col">
                    <div className="flex items-center mb-6">
                        <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                            <span>&larr;</span>
                        </div>
                        <p className="text-center flex-grow text-lg font-semibold">Tambah Produk</p>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg h-32 mb-6 flex items-center justify-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                            <span className="text-3xl">+</span>
                        </div>
                    </div>
                    
                    <div className="mb-4">
                        <p className="text-sm text-gray-600 mb-1">Nama Produk</p>
                        <div className="border border-gray-200 rounded h-10 w-full"></div>
                    </div>
                    
                    <div className="mb-4">
                        <p className="text-sm text-gray-600 mb-1">Kode Produk</p>
                        <div className="border border-gray-200 rounded h-10 w-full"></div>
                    </div>
                    
                    <div className="mb-4">
                        <p className="text-sm text-gray-600 mb-1">Jumlah Produk</p>
                        <div className="border border-gray-200 rounded h-10 w-full"></div>
                    </div>
                    
                    <div className="mb-4">
                        <p className="text-sm text-gray-600 mb-1">Harga Modal</p>
                        <div className="border border-gray-200 rounded h-10 w-full"></div>
                    </div>
                    
                    <div className="mb-4">
                        <p className="text-sm text-gray-600 mb-1">Harga Jual</p>
                        <div className="border border-gray-200 rounded h-10 w-full"></div>
                    </div>
                    
                    <div className="mt-auto mb-2">
                        <div className="bg-blue-500 text-white py-3 rounded-lg w-full text-center">Simpan</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Komponen untuk mockup transaksi
const TransactionMockup = () => {
    return (
        <div className="relative w-64 md:w-72 h-[500px] md:h-[580px] rounded-3xl overflow-hidden shadow-xl border-8 border-gray-800 bg-white">
            <div className="absolute top-0 w-full h-8 bg-gray-800 flex items-center justify-center">
                <div className="w-16 h-1.5 bg-gray-600 rounded-full"></div>
            </div>
            <div className="absolute top-8 left-0 right-0 bottom-0 overflow-hidden">
                <div className="h-full w-full bg-white flex flex-col">
                    <div className="bg-blue-500 p-4">
                        <p className="text-white text-lg font-semibold">Transaksi Baru</p>
                    </div>
                    
                    <div className="flex-1 p-4">
                        <div className="border-b pb-2 mb-3">
                            <div className="flex justify-between mb-2">
                                <p className="text-sm font-medium">Sabun Mandi</p>
                                <p className="text-sm font-medium">Rp 5.000</p>
                            </div>
                            <div className="flex items-center">
                                <div className="flex items-center border rounded-lg overflow-hidden">
                                    <button className="px-2 py-1 bg-gray-100">-</button>
                                    <span className="px-4 py-1">1</span>
                                    <button className="px-2 py-1 bg-gray-100">+</button>
                                </div>
                                <p className="ml-auto text-sm">Rp 5.000</p>
                            </div>
                        </div>
                        
                        <div className="border-b pb-2 mb-3">
                            <div className="flex justify-between mb-2">
                                <p className="text-sm font-medium">Shampoo</p>
                                <p className="text-sm font-medium">Rp 3.500</p>
                            </div>
                            <div className="flex items-center">
                                <div className="flex items-center border rounded-lg overflow-hidden">
                                    <button className="px-2 py-1 bg-gray-100">-</button>
                                    <span className="px-4 py-1">1</span>
                                    <button className="px-2 py-1 bg-gray-100">+</button>
                                </div>
                                <p className="ml-auto text-sm">Rp 3.500</p>
                            </div>
                        </div>
                        
                        <div className="mt-auto">
                            <div className="flex justify-between text-sm mb-1">
                                <p>Subtotal:</p>
                                <p>Rp 8.500</p>
                            </div>
                            <div className="flex justify-between text-sm mb-1">
                                <p>Diskon:</p>
                                <p>Rp 0</p>
                            </div>
                            <div className="flex justify-between font-bold text-blue-600 mb-4">
                                <p>Total:</p>
                                <p>Rp 8.500</p>
                            </div>
                            
                            <div className="flex space-x-2">
                                <button className="flex-1 border border-blue-500 text-blue-500 py-2 rounded-lg">Simpan</button>
                                <button className="flex-1 bg-blue-500 text-white py-2 rounded-lg">Bayar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Komponen untuk mockup dashboard utama
const DashboardMockup = () => {
    return (
        <div className="relative w-64 md:w-72 h-[500px] md:h-[580px] rounded-3xl overflow-hidden shadow-xl border-8 border-gray-800 bg-white">
            <div className="absolute top-0 w-full h-8 bg-gray-800 flex items-center justify-center">
                <div className="w-16 h-1.5 bg-gray-600 rounded-full"></div>
            </div>
            <div className="absolute top-8 left-0 right-0 bottom-0 overflow-hidden">
                {/* Konten dashboard utama */}
                <div className="h-full w-full flex flex-col">
                    {/* Header dengan waveform */}
                    <div className="bg-blue-500 h-40 relative">
                        <div className="absolute top-0 left-0 right-0 pt-6 px-4">
                            <p className="text-xl font-semibold text-white">Aplikasir<sup>2</sup></p>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0">
                            <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-10 text-white">
                                <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" fill="currentColor" />
                                <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" fill="currentColor" />
                                <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="currentColor" />
                            </svg>
                        </div>
                    </div>
                    
                    <div className="bg-white flex-1 px-4 pt-14 pb-4">
                        {/* Menu icon grid */}
                        <div className="grid grid-cols-3 gap-2 -mt-24 mb-6">
                            <div className="bg-white p-2 rounded-lg shadow-md flex flex-col items-center justify-center">
                                <div className="bg-gray-100 w-10 h-10 rounded-lg mb-1 flex items-center justify-center">
                                    <div className="w-5 h-5 bg-blue-500 rounded-sm"></div>
                                </div>
                                <span className="text-xs">QR</span>
                            </div>
                            <div className="bg-white p-2 rounded-lg shadow-md flex flex-col items-center justify-center">
                                <div className="bg-gray-100 w-10 h-10 rounded-lg mb-1 flex items-center justify-center">
                                    <div className="w-5 h-5 bg-blue-500 rounded-sm"></div>
                                </div>
                                <span className="text-xs">Kasir</span>
                            </div>
                            <div className="bg-white p-2 rounded-lg shadow-md flex flex-col items-center justify-center">
                                <div className="bg-gray-100 w-10 h-10 rounded-lg mb-1 flex items-center justify-center">
                                    <div className="w-5 h-5 bg-blue-500 rounded-sm"></div>
                                </div>
                                <span className="text-xs">Pelanggan</span>
                            </div>
                        </div>
                        
                        {/* Riwayat Section */}
                        <div>
                            <h3 className="text-lg font-semibold mb-3">Riwayat</h3>
                            <div className="flex space-x-2 mb-4">
                                <div className="bg-blue-500 text-white text-xs rounded-full px-4 py-1">Semua</div>
                                <div className="bg-white text-gray-600 text-xs rounded-full px-4 py-1 border">Transaksi</div>
                                <div className="bg-white text-gray-600 text-xs rounded-full px-4 py-1 border">Barang</div>
                            </div>
                            
                            {/* Transaction Card */}
                            <div className="bg-white rounded-lg shadow-sm border p-3 mb-4">
                                <div className="flex items-center">
                                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mr-3">
                                        <div className="w-5 h-5 rounded-full border-2 border-blue-500"></div>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-medium">Transaksi</h4>
                                        <p className="text-xs text-gray-500">07/05/2023</p>
                                    </div>
                                    <div className="ml-auto text-right">
                                        <p className="text-sm font-medium">Rp 8.500</p>
                                        <p className="text-xs text-gray-500">2 items</p>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Stock Card */}
                            <div className="bg-white rounded-lg shadow-sm border p-3">
                                <div className="flex items-center">
                                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mr-3">
                                        <div className="w-5 h-5 bg-blue-500"></div>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-medium">Stok</h4>
                                        <p className="text-xs text-gray-500">Sisa produk keseluruhan</p>
                                    </div>
                                    <div className="ml-auto text-right">
                                        <p className="text-sm font-medium">25 pcs</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Bottom Navigation */}
                        <div className="mt-auto pt-2">
                            <div className="flex justify-around items-center border-t pt-2">
                                <div className="flex flex-col items-center">
                                    <div className="w-6 h-6 bg-blue-500 rounded-sm mb-1"></div>
                                    <span className="text-xs text-blue-500">Beranda</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="w-6 h-6 bg-gray-300 rounded-sm mb-1"></div>
                                    <span className="text-xs text-gray-500">Produk</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="w-6 h-6 bg-gray-300 rounded-sm mb-1"></div>
                                    <span className="text-xs text-gray-500">Laporan</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="w-6 h-6 bg-gray-300 rounded-sm mb-1"></div>
                                    <span className="text-xs text-gray-500">Akun</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Komponen untuk mockup barcode scanner
const BarcodeScannerMockup = () => {
    return (
        <div className="relative w-64 md:w-72 h-[500px] md:h-[580px] rounded-3xl overflow-hidden shadow-xl border-8 border-gray-800 bg-white">
            <div className="absolute top-0 w-full h-8 bg-gray-800 flex items-center justify-center">
                <div className="w-16 h-1.5 bg-gray-600 rounded-full"></div>
            </div>
            <div className="absolute top-8 left-0 right-0 bottom-0 overflow-hidden">
                {/* Dark overlay background for scanner */}
                <div className="h-full w-full bg-gray-900 flex flex-col">
                    {/* Header with navigation */}
                    <div className="bg-black bg-opacity-50 p-3 flex items-center">
                        <div className="w-8 h-8 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
                            <span className="text-white">&lt;</span>
                        </div>
                    </div>
                    
                    {/* Scanner content */}
                    <div className="flex-1 flex flex-col items-center justify-center p-4 relative">
                        {/* Scanner frame overlay */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="border-2 border-white w-64 h-44 relative">
                                {/* Corner markers */}
                                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-blue-400"></div>
                                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-blue-400"></div>
                                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-blue-400"></div>
                                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-blue-400"></div>
                            </div>
                        </div>
                        
                        {/* Example barcode image in the middle */}
                        <div className="bg-white px-4 py-2 rounded-md">
                            <div className="h-12 w-32 flex flex-col space-y-1 items-center justify-center">
                                <div className="flex space-x-1">
                                    {[...Array(20)].map((_, i) => (
                                        <div key={i} className="w-0.5 h-12 bg-black"></div>
                                    ))}
                                </div>
                                <p className="text-xs text-center">8 937485 938475</p>
                            </div>
                        </div>
                        
                        {/* Scanner bottom actions */}
                        <div className="absolute bottom-10 left-0 right-0 flex justify-center space-x-6">
                            <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center">
                                <div className="w-6 h-6 rounded-full bg-white"></div>
                            </div>
                            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                                <div className="w-6 h-6 bg-blue-500"></div>
                            </div>
                            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                                <div className="w-6 h-6 bg-green-500"></div>
                            </div>
                        </div>
                        
                        {/* Scanner message */}
                        <div className="absolute bottom-32 bg-white text-black text-xs px-4 py-2 rounded-full">
                            Barcode terdeteksi
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Komponen untuk mockup laporan
const ReportMockup = () => {
    return (
        <div className="relative w-64 md:w-72 h-[500px] md:h-[580px] rounded-3xl overflow-hidden shadow-xl border-8 border-gray-800 bg-white">
            <div className="absolute top-0 w-full h-8 bg-gray-800 flex items-center justify-center">
                <div className="w-16 h-1.5 bg-gray-600 rounded-full"></div>
            </div>
            <div className="absolute top-8 left-0 right-0 bottom-0 overflow-hidden">
                <div className="h-full w-full bg-white flex flex-col">
                    <div className="bg-blue-500 p-4">
                        <p className="text-white text-lg font-semibold">Laporan Penjualan</p>
                    </div>
                    
                    <div className="flex-1 p-4">
                        <div className="flex items-center justify-between mb-4">
                            <p className="text-sm font-medium">Periode: Mei 2023</p>
                            <div className="bg-blue-100 text-blue-500 rounded-full px-3 py-1 text-xs">
                                Filter
                            </div>
                        </div>
                        
                        {/* Graph placeholder */}
                        <div className="h-40 bg-gray-50 rounded-lg mb-4 overflow-hidden relative">
                            <div className="absolute bottom-0 w-full h-36 flex items-end px-2">
                                <div className="flex-1 h-24 bg-blue-400 mx-1 rounded-t"></div>
                                <div className="flex-1 h-16 bg-blue-400 mx-1 rounded-t"></div>
                                <div className="flex-1 h-28 bg-blue-400 mx-1 rounded-t"></div>
                                <div className="flex-1 h-20 bg-blue-400 mx-1 rounded-t"></div>
                                <div className="flex-1 h-32 bg-blue-400 mx-1 rounded-t"></div>
                                <div className="flex-1 h-22 bg-blue-400 mx-1 rounded-t"></div>
                                <div className="flex-1 h-30 bg-blue-400 mx-1 rounded-t"></div>
                            </div>
                        </div>
                        
                        <div className="mb-4">
                            <div className="flex justify-between mb-1">
                                <p className="text-sm font-medium">Total Pendapatan</p>
                                <p className="text-sm font-medium">Rp 3.750.000</p>
                            </div>
                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-green-500 w-3/4 rounded-full"></div>
                            </div>
                        </div>
                        
                        <div className="mb-4">
                            <div className="flex justify-between mb-1">
                                <p className="text-sm font-medium">Total Transaksi</p>
                                <p className="text-sm font-medium">387</p>
                            </div>
                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500 w-2/3 rounded-full"></div>
                            </div>
                        </div>
                        
                        <div>
                            <p className="text-sm font-medium mb-2">Ringkasan Produk</p>
                            <div className="space-y-2">
                                <div className="bg-gray-50 rounded p-2 flex items-center justify-between">
                                    <p className="text-xs">Sabun Mandi</p>
                                    <p className="text-xs">127 unit terjual</p>
                                </div>
                                <div className="bg-gray-50 rounded p-2 flex items-center justify-between">
                                    <p className="text-xs">Shampoo</p>
                                    <p className="text-xs">98 unit terjual</p>
                                </div>
                                <div className="bg-gray-50 rounded p-2 flex items-center justify-between">
                                    <p className="text-xs">Deterjen</p>
                                    <p className="text-xs">85 unit terjual</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PreviewSection;
