import React from 'react';
import { Head } from '@inertiajs/react';
import Sidebar from '@/Components/Dashboard/Sidebar';
import DashboardHeader from '@/Components/Dashboard/DashboardHeader';
import UsersTable from '@/Components/Dashboard/UsersTable';

export default function Users({ auth, users }) {
    // Define breadcrumb data
    const breadcrumb = [
        { label: 'Pengguna', url: route('users.index') }
    ];

    // Sample user data (replace with actual data from backend)
    const sampleUsers = users || [
        {
            id: 1,
            name: 'fuad amba maximof',
            username: 'Fuad_Ambatron',
            phone: '087336523465',
            email: 'fuadambamaximof123@gmail.com'
        },
        {
            id: 2,
            name: 'fuad amba maximof',
            username: 'Fuad_Ambatron',
            phone: '087336523465',
            email: 'fuadambamaximof123@gmail.com'
        },
        {
            id: 3,
            name: 'fuad amba maximof',
            username: 'Fuad_Ambatron',
            phone: '087336523465',
            email: 'fuadambamaximof123@gmail.com'
        },
        {
            id: 4,
            name: 'fuad amba maximof',
            username: 'Fuad_Ambatron',
            phone: '087336523465',
            email: 'fuadambamaximof123@gmail.com'
        },
        {
            id: 5,
            name: 'fuad amba maximof',
            username: 'Fuad_Ambatron',
            phone: '087336523465',
            email: 'fuadambamaximof123@gmail.com'
        },
        {
            id: 6,
            name: 'fuad amba maximof',
            username: 'Fuad_Ambatron',
            phone: '087336523465',
            email: 'fuadambamaximof123@gmail.com'
        },
        {
            id: 7,
            name: 'fuad amba maximof',
            username: 'Fuad_Ambatron',
            phone: '087336523465',
            email: 'fuadambamaximof123@gmail.com'
        },
        {
            id: 8,
            name: 'fuad amba maximof',
            username: 'Fuad_Ambatron',
            phone: '087336523465',
            email: 'fuadambamaximof123@gmail.com'
        },
        {
            id: 9,
            name: 'fuad amba maximof',
            username: 'Fuad_Ambatron',
            phone: '087336523465',
            email: 'fuadambamaximof123@gmail.com'
        },
        {
            id: 10,
            name: 'fuad amba maximof',
            username: 'Fuad_Ambatron',
            phone: '087336523465',
            email: 'fuadambamaximof123@gmail.com'
        },
        {
            id: 11,
            name: 'fuad amba maximof',
            username: 'Fuad_Ambatron',
            phone: '087336523465',
            email: 'fuadambamaximof123@gmail.com'
        },
    ];

    return (
        <div className="min-h-screen bg-white">
            <Head title="Pengguna - Aplikasir" />
            
            {/* Header */}
            <DashboardHeader 
                pageTitle="Pengguna" 
                breadcrumb={breadcrumb}
            />
            
            {/* Layout Utama */}
            <div className="flex min-h-screen pt-20">
                <Sidebar />

                {/* Konten Utama */}
                <main className="flex-1 ml-64 p-6 lg:p-8 overflow-y-auto bg-white">
                    <UsersTable users={sampleUsers} />
                </main>
            </div>
        </div>
    );
}
