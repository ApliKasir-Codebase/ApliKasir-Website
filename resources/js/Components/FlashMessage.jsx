import React, { useState, useEffect } from 'react';

export default function FlashMessage({ message, type = 'success', onClose }) {
    const [isVisible, setIsVisible] = useState(true);
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        if (message) {
            setIsVisible(true);
            // Auto close after 5 seconds
            const timer = setTimeout(() => {
                handleClose();
            }, 5000);
            
            return () => clearTimeout(timer);
        }
    }, [message]);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsVisible(false);
            if (onClose) onClose();
        }, 300); // Matches transition duration
    };

    if (!message || !isVisible) return null;

    const bgColorClass = type === 'success' 
        ? 'bg-green-50 text-green-700'
        : type === 'error' 
            ? 'bg-red-50 text-red-700'
            : 'bg-blue-50 text-blue-700';

    return (
        <div 
            className={`
                rounded-md p-4 mb-4 text-sm flex justify-between items-center transition-all duration-300
                ${bgColorClass}
                ${isClosing ? 'opacity-0 transform -translate-y-2' : 'opacity-100 transform translate-y-0'}
            `}
        >
            <div>{message}</div>
            <button 
                onClick={handleClose}
                className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    );
}
