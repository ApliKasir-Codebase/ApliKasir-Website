import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import Sidebar from '@/Components/Dashboard/Sidebar';
import DashboardHeader from '@/Components/Dashboard/DashboardHeader';
import PageTransition from '@/Components/PageTransition';

export default function Edit({ mustVerifyEmail, status, auth }) {
    return (
        <div className="min-h-screen bg-white">
            <Head title="Profile" />
            
            {/* Header */}
            <DashboardHeader 
                pageTitle="Profile"
                breadcrumb={[
                    { label: 'Profile' }
                ]}
            />
            
            {/* Layout Utama */}
            <div className="flex min-h-screen pt-20">
                <Sidebar />

                {/* Konten Utama */}
                <main className="flex-1 ml-64 p-6 lg:p-8 overflow-y-auto bg-white">
                    <PageTransition>
                        <div className="grid grid-cols-1 gap-6 pb-6">
                            <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 transition-all duration-300 hover:shadow-md">
                                <UpdateProfileInformationForm
                                    mustVerifyEmail={mustVerifyEmail}
                                    status={status}
                                    className="max-w-xl"
                                />
                            </div>

                            <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 transition-all duration-300 hover:shadow-md">
                                <UpdatePasswordForm className="max-w-xl" />
                            </div>

                            <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 transition-all duration-300 hover:shadow-md">
                                <DeleteUserForm className="max-w-xl" />
                            </div>
                        </div>
                    </PageTransition>
                </main>
            </div>
        </div>
    );
}
