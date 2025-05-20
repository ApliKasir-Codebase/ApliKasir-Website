import React from 'react';
import { Link } from '@inertiajs/react';

const FooterSection = () => {
    const currentYear = new Date().getFullYear();
    
    return (
        <footer className="bg-gray-50 border-t border-gray-200">
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">                    {/* Column 1: Logo dan Deskripsi */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center mb-6">
                            <img src="/images/logo-aplikasir.svg" alt="ApliKasir Logo" className="h-8 w-auto mr-2" />
                            <h2 className="text-2xl font-bold text-blue-600">
                                ApliKasir
                            </h2>
                        </div>
                        <p className="text-gray-600 mb-6">
                            Aplikasi point of sale modern untuk mengelola transaksi bisnis Anda dengan mudah dan efisien.
                        </p>
                        <div className="flex space-x-4">
                            <a href="https://twitter.com/aplikasir" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-500 transition-colors" aria-label="Twitter">
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                </svg>
                            </a>
                            <a href="https://instagram.com/aplikasir" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-pink-500 transition-colors" aria-label="Instagram">
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                                </svg>
                            </a>
                            <a href="https://facebook.com/aplikasir" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-600 transition-colors" aria-label="Facebook">
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                                </svg>
                            </a>
                            <a href="https://wa.me/628696969696" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-green-500 transition-colors" aria-label="WhatsApp">
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22.5c-1.725 0-3.35-.406-4.794-1.118l-5.44 1.425 1.457-5.323a10.416 10.416 0 01-1.223-4.906C2 6.327 6.527 1.8 12 1.8s10 4.527 10 10.078-4.527 10.078-10 10.078z" fillRule="evenodd" clipRule="evenodd" />
                                </svg>
                            </a>
                        </div>
                    </div>
                    
                    {/* Column 2: Navigasi */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Navigasi</h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="#beranda" className="text-gray-600 hover:text-blue-600 transition-colors">Beranda</a>
                            </li>
                            <li>
                                <a href="#tentang" className="text-gray-600 hover:text-blue-600 transition-colors">Tentang</a>
                            </li>
                            <li>
                                <a href="#layanan" className="text-gray-600 hover:text-blue-600 transition-colors">Layanan</a>
                            </li>
                            <li>
                                <a href="#kontak" className="text-gray-600 hover:text-blue-600 transition-colors">Kontak</a>
                            </li>
                        </ul>
                    </div>
                    
                    {/* Column 3: Layanan */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Layanan</h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Manajemen Produk</a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Transaksi</a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Catatan Kredit</a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Laporan</a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Pemindaian Produk</a>
                            </li>
                        </ul>
                    </div>
                    
                    {/* Column 4: Kontak */}
                    <div id="kontak">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Kontak</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start">
                                <svg className="h-6 w-6 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span className="text-gray-600">
                                    Jl. Telekomunikasi 1, Terusan Buahbatu Kabupaten Bandung, Jawa Barat 40257
                                </span>
                            </li>
                            <li className="flex items-center">
                                <svg className="h-6 w-6 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <span className="text-gray-600">
                                    <a href="tel:+628696969696" className="hover:text-blue-600 transition-colors">08696969696</a>
                                </span>
                            </li>
                            <li className="flex items-center">
                                <svg className="h-6 w-6 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <span className="text-gray-600">
                                    <a href="mailto:info@aplikasir.com" className="hover:text-blue-600 transition-colors">info@aplikasir.com</a>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
                  {/* Copyright */}
                <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-600 text-sm">© {currentYear} ApliKasir. All rights reserved.</p>
                    
                    <div className="mt-4 md:mt-0">
                        <ul className="flex space-x-6">
                            <li>
                                <a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">Kebijakan Privasi</a>
                            </li>
                            <li>
                                <a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">Syarat & Ketentuan</a>
                            </li>
                            <li>
                                <a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">FAQ</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default FooterSection;
