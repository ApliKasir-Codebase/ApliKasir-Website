import React from 'react';
import { usePage } from '@inertiajs/react';
import Dropdown from '@/Components/Dropdown';
import Breadcrumb from '@/Components/Dashboard/Breadcrumb';

export default function DashboardHeader({ pageTitle, pageSubtitle, breadcrumb }) {
    const { auth } = usePage().props;
    const today = new Date().toLocaleDateString('id-ID', {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
    });

    return (        <header className="bg-white shadow-sm border-b border-gray-200 fixed w-full z-10">
            <div className="ml-64 py-4 px-6 lg:px-8 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-800">{pageTitle || 'Dashboard Beranda'}</h1>
                    {breadcrumb ? (
                        <Breadcrumb items={breadcrumb} />
                    ) : (
                        <p className="text-sm text-gray-500">{pageSubtitle || `Selamat datang kembali, ${auth.user.name}!`}</p>
                    )}
                </div>
                <div className="flex items-center">
                    <Dropdown>
                        <Dropdown.Trigger>
                            <div className="flex items-center cursor-pointer">
                                <span className="text-sm font-medium text-gray-700 mr-2">{auth.user.name}</span>
                                <div className="bg-indigo-600 h-10 w-10 rounded-full flex items-center justify-center text-white font-bold">
                                    {auth.user.name.charAt(0).toUpperCase()}
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </Dropdown.Trigger>

                        <Dropdown.Content align="right" width="48">
                            <Dropdown.Link href={route('profile.edit')}>
                                Profile
                            </Dropdown.Link>
                            <Dropdown.Link href={route('logout')} method="post" as="button">
                                Keluar
                            </Dropdown.Link>
                        </Dropdown.Content>
                    </Dropdown>
                </div>
            </div>
        </header>
    );
}