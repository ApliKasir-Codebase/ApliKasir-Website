import React from 'react';
import { Link } from '@inertiajs/react';

export default function UsersTable({ users }) {
    return (
        <div className="bg-white shadow-md rounded-xl p-6 mt-8 overflow-x-auto">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-800">Daftar Pengguna</h3>
                <Link 
                    href={route('users.create')} 
                    className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white tracking-widest hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-900 focus:outline-none transition ease-in-out duration-150"
                >
                    <span className="mr-1">+</span> Tambah Pengguna
                </Link>
            </div>

            {users && users.length > 0 ? (
                <>
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NO</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pelanggan</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No. Telp</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {users.map((user, index) => (
                                <tr key={user.id || index} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.username}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.phone}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 space-x-2">
                                        <Link 
                                            href={route('users.edit', user.id)} 
                                            className="text-blue-600 hover:text-blue-900"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                        </Link>
                                        <Link 
                                            href={route('users.delete', user.id)} 
                                            method="delete" 
                                            as="button" 
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                    <div className="mt-6 flex justify-end items-center space-x-2">
                        <button className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50" disabled>{'<'}</button>
                        <button className="px-3 py-1 text-sm border border-blue-500 bg-blue-500 text-white rounded-md">1</button>
                        <button className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-100">2</button>
                        <span className="text-sm text-gray-500">...</span>
                        <button className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-100">5</button>
                        <button className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-100">{'>'}</button>
                    </div>
                </>
            ) : (
                <p className="text-center text-gray-500 py-8">Tidak ada pengguna.</p>
            )}
        </div>
    );
}
