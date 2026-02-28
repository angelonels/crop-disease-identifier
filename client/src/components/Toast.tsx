import React, { useEffect } from 'react';

interface ToastProps {
    message: string | null;
    onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [message, onClose]);

    if (!message) return null;

    return (
        <div className="fixed bottom-8 right-8 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="bg-gray-900 text-white px-6 py-3 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] font-medium text-sm flex items-center">
                <span className="mr-3 text-emerald-400">●</span>
                {message}
            </div>
        </div>
    );
};
