// filepath: d:\Code\aplikasir-web\resources\js\Components\Dashboard\ActivityTable.jsx
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
// ... (import lainnya tetap sama)
import { format, parseISO } from 'date-fns';
import { id } from 'date-fns/locale';


const getPortalRoot = () => {
    let portalRoot = document.getElementById('modal-portal-root');
    if (!portalRoot) {
        portalRoot = document.createElement('div');
        portalRoot.setAttribute('id', 'modal-portal-root');
        document.body.appendChild(portalRoot);
    }
    return portalRoot;
};

// ... (fungsi helper lainnya seperti formatDateTime, getModuleLabel, dll. tetap sama)
const formatDateTime = (dateString) => {
    try {
        const date = typeof dateString === "string" && dateString.includes("/")
            ? new Date(dateString.split("/").reverse().join("-"))
            : new Date(dateString);
        return format(date, "dd MMM yyyy, HH:mm", { locale: id });
    } catch (error) {
        console.error("Error formatting date:", error);
        return dateString;
    }
};

const getModuleLabel = (module) => {
    const modules = { "users": "Pengguna", "products": "Produk", "profile": "Profil", "pengguna": "Pengguna" };
    return modules[module] || module;
};

const getActionLabel = (action) => {
    const actions = { "created": "Membuat", "updated": "Memperbarui", "deleted": "Menghapus" };
    return actions[action] || action;
};

const getActionClass = (action) => {
    switch (action) {
        case "created": case "Membuat": return "bg-green-100 text-green-800";
        case "updated": case "Memperbarui": return "bg-blue-100 text-blue-800";
        case "deleted": case "Menghapus": return "bg-red-100 text-red-800";
        default: return "bg-gray-100 text-gray-800";
    }
};

const formatDetails = (details) => {
    if (!details) return null;
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {Object.entries(details).map(([key, value]) => {
                if (key === "changes" || key === "updated_fields") return null;
                const formattedKey = key.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase());
                let formattedValue = value;
                if (value === null || value === undefined) formattedValue = "-";
                else if (typeof value === "boolean") formattedValue = value ? "Ya" : "Tidak";
                else if (Array.isArray(value)) formattedValue = value.join(", ");
                else if (typeof value === "object") {
                    return (
                        <div key={key} className="col-span-1 md:col-span-2 p-3 bg-gray-50 rounded-md">
                            <p className="font-medium text-sm text-gray-700 mb-2">{formattedKey}:</p>
                            <pre className="text-xs overflow-x-auto whitespace-pre-wrap">{JSON.stringify(value, null, 2)}</pre>
                        </div>
                    );
                }
                return (
                    <div key={key} className="flex flex-col">
                        <span className="text-sm text-gray-500">{formattedKey}</span>
                        <span className="font-medium">{formattedValue}</span>
                    </div>
                );
            })}
        </div>
    );
};

const formatChanges = (details) => {
    if (!details || !details.changes) return null;
    return (
        <div className="mt-6">
            <h4 className="text-lg font-medium text-gray-800 mb-3">Perubahan yang Dilakukan</h4>
            <div className="bg-gray-50 p-4 rounded-md">
                <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-1 text-sm font-medium text-gray-500">Field</div>
                    <div className="col-span-1 text-sm font-medium text-gray-500">Nilai Lama</div>
                    <div className="col-span-1 text-sm font-medium text-gray-500">Nilai Baru</div>
                </div>
                <div className="mt-2 divide-y divide-gray-200">
                    {Object.entries(details.changes).map(([key, value]) => {
                        const formattedKey = key.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase());
                        let oldValue = value.old; let newValue = value.new;
                        if (oldValue === null || oldValue === undefined) oldValue = "-";
                        else if (typeof oldValue === "boolean") oldValue = oldValue ? "Ya" : "Tidak";
                        if (newValue === null || newValue === undefined) newValue = "-";
                        else if (typeof newValue === "boolean") newValue = newValue ? "Ya" : "Tidak";
                        return (
                            <div key={key} className="grid grid-cols-3 gap-4 py-3">
                                <div className="col-span-1 font-medium text-gray-700">{formattedKey}</div>
                                <div className="col-span-1 text-red-600">{oldValue}</div>
                                <div className="col-span-1 text-green-600">{newValue}</div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};


export default function ActivityTable({ activities }) {
    const [showModal, setShowModal] = useState(false);
    const [selectedActivity, setSelectedActivity] = useState(null);
    // Gunakan nama kelas animasi yang baru
    const [modalAnimation, setModalAnimation] = useState("animate-modalSpecificFadeIn");
    const [portalContainer, setPortalContainer] = useState(null);

    useEffect(() => {
        setPortalContainer(getPortalRoot());
    }, []);
    
    useEffect(() => {
        if (showModal) {
            const body = document.body;
            const documentElement = document.documentElement;
            const originalBodyOverflow = body.style.overflow;
            const originalDocumentElementOverflow = documentElement.style.overflow;
            const originalBodyPaddingRight = body.style.paddingRight;
            const scrollbarWidth = window.innerWidth - documentElement.clientWidth;
            
            body.style.overflow = 'hidden';
            documentElement.style.overflow = 'hidden';
            if (scrollbarWidth > 0) {
                body.style.paddingRight = `${scrollbarWidth}px`;
            }
            return () => {
                body.style.overflow = originalBodyOverflow;
                documentElement.style.overflow = originalDocumentElementOverflow;
                body.style.paddingRight = originalBodyPaddingRight;
            };
        }
    }, [showModal]);
    
    const showDetails = (activity) => {
        setSelectedActivity(activity);
        // Set animasi untuk masuk dengan nama baru
        setModalAnimation("animate-modalSpecificFadeIn");
        setShowModal(true);
    };
    
    const hideModal = () => {
        // Set animasi untuk keluar dengan nama baru
        setModalAnimation("animate-modalSpecificFadeOut");
        setTimeout(() => {
            setShowModal(false);
            setSelectedActivity(null);
        }, 300); // Sesuaikan durasi dengan animasi fadeOut Anda
    };
    
    const modalContent = selectedActivity && (
        <div 
            className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto pt-20 pb-20 px-4 bg-black bg-opacity-25"
            onClick={(e) => { if (e.target === e.currentTarget) hideModal(); }}
        >
            <div 
                // Terapkan kelas animasi yang baru dan pastikan tidak ada transform dari kelas lain
                className={`relative bg-white max-w-3xl mx-auto rounded-xl p-4 md:p-6 w-full sm:w-11/12 md:w-4/5 lg:w-3/4 shadow-xl ${modalAnimation} transform-none max-h-[calc(100vh-10rem)] overflow-y-auto`}
                // Menambahkan 'transform-none' untuk mencoba meniadakan transform lain jika ada
            >
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold text-gray-800">Detail Aktivitas</h3>
                    <button onClick={hideModal} className="text-gray-500 hover:text-gray-700 transition-all duration-200 p-1 hover:bg-gray-100 rounded-full transform hover:rotate-90">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>
                {/* ... (konten modal lainnya tetap sama) ... */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h4 className="text-base md:text-lg font-medium text-gray-800 mb-3">Informasi Aktivitas</h4>
                        <div className="space-y-3">
                            <div><span className="block text-sm text-gray-500">Deskripsi</span><span className="font-medium">{selectedActivity.description}</span></div>
                            <div><span className="block text-sm text-gray-500">Admin</span><span className="font-medium">{selectedActivity.user}</span></div>
                            <div><span className="block text-sm text-gray-500">Modul</span><span className="font-medium">{selectedActivity.module ? getModuleLabel(selectedActivity.module) : "-"}</span></div>
                            <div><span className="block text-sm text-gray-500">Aksi</span><span className={`inline-block px-2 py-1 rounded-full text-xs capitalize ${getActionClass(selectedActivity.action)}`}>{selectedActivity.action_label || getActionLabel(selectedActivity.action)}</span></div>
                            <div><span className="block text-sm text-gray-500">Waktu</span><span className="font-medium">{selectedActivity.timestamp}</span></div>
                        </div>
                    </div>
                    <div>
                        <h4 className="text-base md:text-lg font-medium text-gray-800 mb-3">Informasi Teknis</h4>
                        <div className="space-y-3">
                            <div><span className="block text-sm text-gray-500">ID Log</span><span className="font-medium">{selectedActivity.id}</span></div>
                            <div><span className="block text-sm text-gray-500">IP Address</span><span className="font-medium">{selectedActivity.ip_address || "-"}</span></div>
                            <div><span className="block text-sm text-gray-500">User Agent</span><div className="text-sm font-medium break-words">{selectedActivity.user_agent || "-"}</div></div>
                        </div>
                    </div>
                </div>
                {selectedActivity.details && (
                    <div className="mt-8">
                        <h4 className="text-base md:text-lg font-medium text-gray-800 mb-3">Detail Tambahan</h4>
                        {formatDetails(selectedActivity.details)}
                        {(selectedActivity.action === "updated" || selectedActivity.action === "Memperbarui") && formatChanges(selectedActivity.details)}
                    </div>
                )}
                <div className="mt-6 flex justify-end">
                    <button onClick={hideModal} className="px-4 py-1.5 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        Tutup
                    </button>
                </div>
            </div>
        </div>
    );
    
    return (
        <div className="bg-white rounded-xl p-5 md:p-6 shadow-md mt-8 mx-auto"> 
            <div className="flex justify-between items-center mb-5">
                <h3 className="text-lg md:text-xl font-semibold text-gray-800">Riwayat Aktivitas Admin</h3>
            </div>
            {/* ... (Tabel aktivitas tetap sama) ... */}
            {activities && activities.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 rounded-xl">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NO</th>
                                <th scope="col" className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Admin</th>
                                <th scope="col" className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Modul</th>
                                <th scope="col" className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                                <th scope="col" className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deskripsi</th>
                                <th scope="col" className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Waktu</th>
                                <th scope="col" className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Detail</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {activities.map((activity, index) => (
                                <tr key={activity.id || index} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-3 md:px-6 py-2 md:py-3 whitespace-nowrap text-xs md:text-sm text-gray-500">{index + 1}</td>
                                    <td className="px-3 md:px-6 py-2 md:py-3 whitespace-nowrap text-xs md:text-sm font-medium text-gray-900">{activity.user}</td>
                                    <td className="px-3 md:px-6 py-2 md:py-3 whitespace-nowrap text-xs md:text-sm text-gray-500">{activity.module ? getModuleLabel(activity.module) : "-"}</td>
                                    <td className="px-3 md:px-6 py-2 md:py-3 whitespace-nowrap text-xs md:text-sm text-gray-500"><span className={`px-1.5 py-0.5 rounded-full text-xs capitalize ${getActionClass(activity.action)}`}>{activity.action_label || getActionLabel(activity.action)}</span></td>
                                    <td className="px-3 md:px-6 py-2 md:py-3 text-xs md:text-sm text-gray-500 max-w-xs truncate" title={activity.description}>{activity.description}</td>
                                    <td className="px-3 md:px-6 py-2 md:py-3 whitespace-nowrap text-xs md:text-sm text-gray-500">{activity.timestamp}</td>
                                    <td className="px-3 md:px-6 py-2 md:py-3 whitespace-nowrap text-xs md:text-sm text-blue-600"><button onClick={() => showDetails(activity)} className="text-blue-600 hover:text-blue-800 transition-all px-2 py-0.5 border border-blue-300 hover:border-blue-500 rounded-md hover:bg-blue-50 text-xs">Lihat</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-center text-gray-500 py-8">Tidak ada aktivitas admin.</p>
            )}
            {showModal && portalContainer && ReactDOM.createPortal(modalContent, portalContainer)}
        </div>
    );
}