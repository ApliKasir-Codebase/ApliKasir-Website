import React from 'react';
import { Link } from '@inertiajs/react';

export default function Breadcrumb({ items = [] }) {
    return (
        <div className="text-sm text-gray-500 flex items-center flex-wrap">
            <Link href={route('dashboard')} className="hover:text-blue-600">
                Dashboard
            </Link>
            
            {items.map((item, index) => (
                <React.Fragment key={index}>
                    <span className="mx-2">/</span>
                    {index === items.length - 1 ? (
                        <span className="text-gray-600 font-medium">{item.label}</span>
                    ) : (
                        <Link 
                            href={item.url || '#'} 
                            className="hover:text-blue-600"
                        >
                            {item.label}
                        </Link>
                    )}
                </React.Fragment>
            ))}
        </div>
    );
}
