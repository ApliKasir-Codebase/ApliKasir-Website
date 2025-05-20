import React from 'react';
import { Head } from '@inertiajs/react';
import Sidebar from '@/Components/Dashboard/Sidebar';
import DashboardHeader from '@/Components/Dashboard/DashboardHeader';
import StatCard from '@/Components/Dashboard/StatCard';
import ActivityTable from '@/Components/Dashboard/ActivityTable';
import PageTransition from '@/Components/PageTransition';

export default function Index({ auth, stats, activities }) {
    return (
        <div className="min-h-screen bg-white">
            <Head title="Dashboard Aplikasir" />
            
            {/* Header */}
            <DashboardHeader 
                pageTitle="Dashboard Beranda" 
                pageSubtitle={`Selamat datang kembali, ${auth.user.name}!`} 
            />
            
            {/* Layout Utama */}
            <div className="flex min-h-screen pt-20"> {/* pt-20 untuk memberikan ruang yang cukup pada header */}
                <Sidebar />

                {/* Konten Utama Dashboard */}                <main className="flex-1 ml-64 p-6 lg:p-8 overflow-y-auto bg-white">
                    <PageTransition>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {stats && stats.map((stat, index) => (
                                <StatCard
                                    key={index}
                                    title={stat.title}
                                    value={stat.value}
                                    icon={stat.icon}
                                />
                            ))}
                        </div>

                        <ActivityTable activities={activities || []} />
                    </PageTransition>
                </main>
            </div>
        </div>
    );
}
