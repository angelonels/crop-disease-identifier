import React from 'react';
import { X, Moon, RefreshCcw, Bell } from 'lucide-react';

interface SettingsModalProps {
    onClose: () => void;
    triggerToast: (msg: string) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ onClose, triggerToast }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">

                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-[#fbfcfc]">
                    <h2 className="text-base font-bold text-gray-900 leading-none">Application Settings</h2>
                    <button onClick={onClose} className="p-1 rounded-full text-gray-400 hover:bg-gray-200 hover:text-gray-900 transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6 space-y-6">

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center">
                                <Moon className="w-5 h-5 text-gray-600" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-gray-900">Dark Mode</span>
                                <span className="text-xs text-gray-500 font-medium">Switch to a darker theme interface</span>
                            </div>
                        </div>
                        <button
                            onClick={() => triggerToast("Dark mode toggle is not fully supported yet.")}
                            className="w-11 h-6 bg-gray-200 rounded-full relative transition-colors cursor-pointer hover:bg-gray-300"
                        >
                            <div className="absolute left-1 top-1 w-4 h-4 rounded-full bg-white shadow-sm" />
                        </button>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                                <RefreshCcw className="w-5 h-5 text-blue-600" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-gray-900">Offline Database Sync</span>
                                <span className="text-xs text-gray-500 font-medium">Keep local SQLite sync running in background</span>
                            </div>
                        </div>
                        <button
                            onClick={() => triggerToast("Offline sync disabled.")}
                            className="w-11 h-6 bg-[#0b9c71] rounded-full relative transition-colors cursor-pointer hover:bg-emerald-700"
                        >
                            <div className="absolute right-1 top-1 w-4 h-4 rounded-full bg-white shadow-sm" />
                        </button>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                                <Bell className="w-5 h-5 text-amber-600" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-gray-900">Notifications</span>
                                <span className="text-xs text-gray-500 font-medium">Receive alerts for severe scans</span>
                            </div>
                        </div>
                        <button
                            onClick={() => triggerToast("Notifications disabled.")}
                            className="w-11 h-6 bg-[#0b9c71] rounded-full relative transition-colors cursor-pointer hover:bg-emerald-700"
                        >
                            <div className="absolute right-1 top-1 w-4 h-4 rounded-full bg-white shadow-sm" />
                        </button>
                    </div>

                </div>

            </div>
        </div>
    );
};
