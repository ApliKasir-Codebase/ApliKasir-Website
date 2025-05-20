import React from 'react';
import { Link } from '@inertiajs/react';
import NavLink from '@/Components/NavLink'; // Gunakan NavLink dari Breeze
// Ikon bisa dari Heroicons (npm install @heroicons/react) atau SVG kustom
// import { HomeIcon, UsersIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';


export default function Sidebar() {
    // Contoh ikon placeholder sederhana, ganti dengan ikon SVG atau Heroicons
    const Icon = ({ char, className }) => <span className={`mr-3 text-xl ${className}`}>{char}</span>;

    return (
        <aside className="w-64 bg-white shadow-xl h-screen fixed top-0 left-0 flex flex-col z-20">
            <div className="p-6 border-b border-gray-200 flex items-center">
                <img src="/images/logo-aplikasir.svg" alt="ApliKasir Logo" className="h-8 w-auto mr-2" />
                <h2 className="text-2xl font-bold text-blue-600">
                    ApliKasir
                </h2>
            </div>
            <nav className="flex-grow p-4 space-y-4 flex flex-col">                <NavLink href={route('dashboard')} active={route().current('dashboard')} className="flex items-center">
                    <Icon char="🏠" /> Beranda
                </NavLink>                <NavLink href={route('users.index')} active={route().current('users.index') || route().current('users.*')} className="flex items-center">
                    <Icon char="👤" /> Pengguna
                </NavLink>
                <NavLink href={route('products.index')} active={route().current('products.index') || route().current('products.*')} className="flex items-center">
                    <Icon char="📦" /> Produk
                </NavLink>
            </nav>
        </aside>
    );
}