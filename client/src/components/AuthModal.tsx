import React, { useState } from 'react';
import { X, Mail, Lock } from 'lucide-react';

interface AuthModalProps {
    onClose: () => void;
    onLogin: (user: { name: string; role: string }) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ onClose, onLogin }) => {
    const [tab, setTab] = useState<'login' | 'signup'>('login');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onLogin({ name: "Nandan", role: "Farm Manager" });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200">

                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <div className="flex gap-4">
                        <button
                            onClick={() => setTab('login')}
                            className={`text-sm font-bold pb-2 border-b-2 transition-colors ${tab === 'login' ? 'text-[#0b9c71] border-[#0b9c71]' : 'text-gray-400 border-transparent hover:text-gray-600'}`}
                        >
                            Log In
                        </button>
                        <button
                            onClick={() => setTab('signup')}
                            className={`text-sm font-bold pb-2 border-b-2 transition-colors ${tab === 'signup' ? 'text-[#0b9c71] border-[#0b9c71]' : 'text-gray-400 border-transparent hover:text-gray-600'}`}
                        >
                            Sign Up
                        </button>
                    </div>
                    <button onClick={onClose} className="p-1 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6">
                    <div className="space-y-4 mb-6">
                        <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="email"
                                    required
                                    defaultValue="[EMAIL_ADDRESS]"
                                    placeholder="Enter your email"
                                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="password"
                                    required
                                    defaultValue="[PASSWORD]"
                                    placeholder="Enter your password"
                                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium"
                                />
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#0b9c71] hover:bg-emerald-700 text-white font-bold text-sm py-3 rounded-xl transition-all shadow-[0_4px_14px_0_rgba(11,156,113,0.39)] hover:shadow-[0_6px_20px_rgba(11,156,113,0.23)] active:bg-emerald-800"
                    >
                        {tab === 'login' ? 'Log In to Account' : 'Create Account'}
                    </button>
                </form>

            </div>
        </div>
    );
};
