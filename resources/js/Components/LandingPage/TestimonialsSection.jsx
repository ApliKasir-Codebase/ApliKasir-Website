import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, StarIcon } from '@heroicons/react/24/solid';

const TestimonialsSection = () => {
    const [currentTestimonial, setCurrentTestimonial] = useState(0);    const testimonials = [
        {
            id: 1,
            name: "Budi Santoso",
            role: "Pemilik Warung Kelontong",
            location: "Jakarta Selatan",
            image: "/images/testimonials/user1.jpg",
            rating: 5,
            content: "ApliKasir benar-benar mengubah cara saya mengelola toko. Sekarang saya bisa track inventory dengan mudah dan laporan penjualan otomatis tersedia. Sangat membantu untuk UMKM seperti saya! Yang paling saya suka adalah fitur notifikasi stok habis dan laporan laba rugi real-time.",
            business: "Warung Bu Budi",
            highlight: "Omzet naik 40% dalam 3 bulan",
            beforeAfter: {
                before: "Manual pencatatan, sering kehabisan stok",
                after: "Inventory otomatis, stok selalu terkontrol"
            }
        },
        {
            id: 2,
            name: "Siti Nurhaliza", 
            role: "Owner Toko Fashion",
            location: "Bandung",
            image: "/images/testimonials/user2.jpg",
            rating: 5,
            content: "Fitur barcode scanner ApliKasir sangat membantu saat ada banyak customer. Transaksi jadi lebih cepat dan akurat. Customer juga senang karena tidak perlu antri lama. Sekarang bisa fokus ke customer service daripada repot dengan kasir manual.",
            business: "Siti Fashion Store",
            highlight: "Waktu transaksi 70% lebih cepat",
            beforeAfter: {
                before: "Antrian panjang, input manual lambat",
                after: "Checkout cepat, customer puas"
            }
        },
        {
            id: 3,
            name: "Ahmad Fauzi",
            role: "Pemilik Cafe",
            location: "Yogyakarta", 
            image: "/images/testimonials/user3.jpg",
            rating: 5,
            content: "Dengan ApliKasir, saya bisa monitor penjualan real-time dari mana saja. Fitur laporan harian dan bulanan sangat detail. Recommended banget buat yang mau go digital! Dashboard analytics-nya membantu saya mengambil keputusan bisnis yang tepat.",
            business: "Cafe Jogja Asri",
            highlight: "Efisiensi operasional naik 60%",
            beforeAfter: {
                before: "Laporan manual, sulit analisa trend",
                after: "Real-time analytics, keputusan data-driven"
            }
        },
        {
            id: 4,
            name: "Linda Permata",
            role: "Manager Minimarket",
            location: "Surabaya",
            image: "/images/testimonials/user4.jpg", 
            rating: 5,
            content: "ApliKasir membantu saya mengelola stok produk dengan lebih baik. Notifikasi stok habis sangat berguna untuk restock tepat waktu. Bisnis jadi lebih terorganisir. Multi-device feature memungkinkan semua kasir update data secara bersamaan.",
            business: "Permata Mini Market",
            highlight: "Zero stockout dalam 6 bulan",
            beforeAfter: {
                before: "Sering stockout, manual inventory",
                after: "Auto-reorder, inventory real-time"
            }
        },
        {
            id: 5,
            name: "Rahman Hidayat",
            role: "Owner Toko Elektronik",
            location: "Medan",
            image: "/images/testimonials/user5.jpg",
            rating: 5,
            content: "Sejak pakai ApliKasir, omzet naik signifikan karena customer percaya dengan struk digital dan sistem yang professional. Fitur customer management juga membantu untuk program loyalty. Investasi terbaik untuk usaha saya!",
            business: "Rahman Electronics",
            highlight: "ROI 300% dalam 4 bulan",
            beforeAfter: {
                before: "Struk tulis tangan, no customer data",
                after: "Professional receipts, customer analytics"
            }
        },
        {
            id: 6,
            name: "Dewi Kusuma",
            role: "Pemilik Toko Sembako",
            location: "Malang",
            image: "/images/testimonials/user6.jpg",
            rating: 5,
            content: "Training dari tim ApliKasir sangat membantu. Dalam seminggu sudah mahir pakai semua fitur. Cloud backup memberikan peace of mind, data tidak akan hilang. Support response-nya juga cepat banget!",
            business: "Dewi Sembako",
            highlight: "100% paperless dalam 2 minggu",
            beforeAfter: {
                before: "Takut kehilangan data, masih manual",
                after: "Confident dengan digital, data aman"
            }
        }
    ];

    const nextTestimonial = () => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const goToTestimonial = (index) => {
        setCurrentTestimonial(index);
    };

    return (
        <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-100/50"></div>
            <div className="absolute top-10 left-10 w-32 h-32 bg-blue-200 rounded-full opacity-20"></div>
            <div className="absolute bottom-10 right-10 w-40 h-40 bg-indigo-200 rounded-full opacity-20"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 animate-fade-in-up">
                    💬 Cerita Sukses Para Pebisnis
                </h2>
                <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto animate-fade-in-up-delay-1 leading-relaxed">
                    Dengarkan langsung testimoni dari <span className="font-semibold text-blue-600">50,000+ pebisnis</span> yang telah merasakan transformasi digital dengan ApliKasir. Dari warung kelontong hingga minimarket, semuanya berkembang pesat!
                </p>
                
                {/* Social proof indicators */}
                <div className="flex flex-wrap justify-center items-center gap-6 mt-8 animate-fade-in-up-delay-2">
                    <div className="flex items-center space-x-2 bg-green-50 px-4 py-2 rounded-full">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium text-green-700">Live dari pengguna aktif</span>
                    </div>
                    <div className="flex items-center space-x-2 bg-yellow-50 px-4 py-2 rounded-full">
                        <span className="text-yellow-500">⭐</span>
                        <span className="text-sm font-medium text-yellow-700">4.8/5 rating di Play Store</span>
                    </div>
                    <div className="flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-full">
                        <span className="text-blue-500">📈</span>
                        <span className="text-sm font-medium text-blue-700">95% customer retention</span>
                    </div>
                </div>
            </div>                <div className="relative max-w-4xl mx-auto animate-fade-in-up-delay-2">
                    {/* Main testimonial card */}
                    <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 mx-4 border border-gray-100">
                        <div className="text-center mb-8">
                            {/* Business type badge */}
                            <div className="inline-block bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                                {testimonials[currentTestimonial].business}
                            </div>
                            
                            {/* Stars */}
                            <div className="flex justify-center mb-6">
                                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                                    <StarIcon key={i} className="w-6 h-6 text-yellow-400" />
                                ))}
                            </div>
                            
                            {/* Quote */}
                            <blockquote className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-8 italic">
                                "{testimonials[currentTestimonial].content}"
                            </blockquote>
                            
                            {/* Before/After comparison */}
                            {testimonials[currentTestimonial].beforeAfter && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                    <div className="bg-red-50 p-4 rounded-xl border border-red-200">
                                        <div className="text-red-600 text-sm font-semibold mb-1">❌ Sebelum ApliKasir</div>
                                        <div className="text-red-700 text-sm">{testimonials[currentTestimonial].beforeAfter.before}</div>
                                    </div>
                                    <div className="bg-green-50 p-4 rounded-xl border border-green-200">
                                        <div className="text-green-600 text-sm font-semibold mb-1">✅ Sesudah ApliKasir</div>
                                        <div className="text-green-700 text-sm">{testimonials[currentTestimonial].beforeAfter.after}</div>
                                    </div>
                                </div>
                            )}
                            
                            {/* Highlight */}
                            <div className="inline-block bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 px-6 py-3 rounded-full text-lg font-bold mb-8 shadow-lg">
                                🚀 {testimonials[currentTestimonial].highlight}
                            </div>
                        </div>

                        {/* User info */}
                        <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
                            <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center">
                                <span className="text-white text-2xl font-bold">
                                    {testimonials[currentTestimonial].name.charAt(0)}
                                </span>
                            </div>
                            <div className="text-center md:text-left">
                                <h4 className="text-xl font-bold text-gray-900">
                                    {testimonials[currentTestimonial].name}
                                </h4>
                                <p className="text-gray-600">
                                    {testimonials[currentTestimonial].role}
                                </p>
                                <p className="text-blue-600 font-semibold">
                                    {testimonials[currentTestimonial].business}
                                </p>
                                <p className="text-sm text-gray-500">
                                    📍 {testimonials[currentTestimonial].location}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Navigation buttons */}
                    <button
                        onClick={prevTestimonial}
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
                        aria-label="Previous testimonial"
                    >
                        <ChevronLeftIcon className="w-6 h-6 text-gray-600 group-hover:text-blue-600" />
                    </button>
                    
                    <button
                        onClick={nextTestimonial}
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
                        aria-label="Next testimonial"
                    >
                        <ChevronRightIcon className="w-6 h-6 text-gray-600 group-hover:text-blue-600" />
                    </button>
                </div>

                {/* Dots indicator */}
                <div className="flex justify-center mt-8 space-x-3">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToTestimonial(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                currentTestimonial === index 
                                    ? 'bg-blue-500 transform scale-125' 
                                    : 'bg-gray-300 hover:bg-gray-400'
                            }`}
                            aria-label={`Go to testimonial ${index + 1}`}
                        />
                    ))}
                </div>

                {/* Additional testimonials preview */}
                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 opacity-60">
                    {testimonials.slice(0, 3).map((testimonial, index) => (
                        <div 
                            key={testimonial.id}
                            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:opacity-100 cursor-pointer"
                            onClick={() => goToTestimonial(index)}
                        >
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center mr-4">
                                    <span className="text-white text-lg font-bold">
                                        {testimonial.name.charAt(0)}
                                    </span>
                                </div>
                                <div>
                                    <h5 className="font-semibold text-gray-900">{testimonial.name}</h5>
                                    <p className="text-sm text-gray-600">{testimonial.business}</p>
                                </div>
                            </div>
                            <p className="text-sm text-gray-600 line-clamp-3">
                                "{testimonial.content.substring(0, 100)}..."
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
