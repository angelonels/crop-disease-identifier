import React from 'react';
import {
    LayoutDashboard,
    FlaskConical,
    History,
    Sprout,
    Settings,
    Plus
} from 'lucide-react';

interface SidebarProps {
    currentView: string;
    onNavigate: (view: string) => void;
    onNewScan: () => void;
    triggerToast: (message: string) => void;
    user: { name: string; role: string } | null;
    onOpenAuth: () => void;
    onOpenSettings: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onNavigate, onNewScan, triggerToast, user, onOpenAuth, onOpenSettings }) => {
    const isDiagnosisActive = currentView === 'input' || currentView === 'processing' || currentView === 'results';

    return (
        <div className="w-64 h-screen bg-white border-r border-gray-100 flex flex-col justify-between shrink-0 font-sans">

            <div>
                {/* Logo Section */}
                <div className="flex items-center px-6 pt-6 pb-4">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center mr-2 shrink-0">
                        <Sprout className="text-emerald-600 w-8 h-8" />
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-gray-900 font-bold text-[15px] leading-tight flex items-center">
                            CropHealth
                        </h1>
                        <p className="text-gray-400 text-[10px] font-medium tracking-wide">Monitor v2.0</p>
                    </div>
                </div>

                {/* Action Button */}
                <div className="px-4 mb-6">
                    <button
                        onClick={onNewScan}
                        className="w-full bg-[#0b9c71] hover:bg-emerald-600 text-white rounded-lg py-2.5 flex items-center justify-center font-medium text-sm transition-colors"
                    >
                        <Plus className="w-4 h-4 mr-2" strokeWidth={3} />
                        New Diagnosis
                    </button>
                </div>

                {/* Menu Section */}
                <div className="mb-6">
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-6 mb-3">Menu</p>
                    <nav className="space-y-1 pr-4">
                        <button
                            onClick={() => onNavigate('dashboard')}
                            className={`w-full flex items-center px-6 py-2.5 text-sm font-medium rounded-r-lg transition-colors ${currentView === 'dashboard'
                                ? 'bg-emerald-50 text-[#0b9c71]'
                                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                        >
                            <LayoutDashboard className="w-4 h-4 mr-3" />
                            Dashboard
                        </button>
                        <button
                            onClick={() => onNavigate('input')}
                            className={`w-full flex items-center px-6 py-2.5 text-sm font-medium rounded-r-lg transition-colors ${isDiagnosisActive
                                ? 'bg-emerald-50 text-[#0b9c71]'
                                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                        >
                            <FlaskConical className="w-4 h-4 mr-3" />
                            Diagnosis
                        </button>
                        <button
                            onClick={() => onNavigate('history')}
                            className={`w-full flex items-center px-6 py-2.5 text-sm font-medium rounded-r-lg transition-colors ${currentView === 'history'
                                ? 'bg-emerald-50 text-[#0b9c71]'
                                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                        >
                            <History className="w-4 h-4 mr-3" />
                            History
                        </button>
                        <button
                            onClick={() => onNavigate('library')}
                            className={`w-full flex items-center px-6 py-2.5 text-sm font-medium rounded-r-lg transition-colors ${currentView === 'library'
                                ? 'bg-emerald-50 text-[#0b9c71]'
                                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                        >
                            <Sprout className="w-4 h-4 mr-3" />
                            Species Library
                        </button>
                    </nav>
                </div>

                {/* Recent Scans Section */}
                <div>
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-6 mb-3">Recent Scans</p>
                    <div className="space-y-4 px-6">

                        <div className="flex items-center group cursor-pointer" onClick={() => triggerToast("Opening Tomato scan...")}>
                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-red-100 text-red-500 text-lg mr-3 shrink-0">🍅</span>
                            <div>
                                <p className="text-xs font-bold text-gray-900 group-hover:text-[#0b9c71] transition-colors leading-tight">Tomato Leaf #042</p>
                                <p className="text-[10px] text-gray-400 mt-0.5">2 mins ago • Healthy</p>
                            </div>
                        </div>

                        <div className="flex items-center group cursor-pointer" onClick={() => triggerToast("Opening Potato scan...")}>
                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-100 text-amber-600 text-lg mr-3 shrink-0">🥔</span>
                            <div>
                                <p className="text-xs font-bold text-gray-900 group-hover:text-[#0b9c71] transition-colors leading-tight">Potato Leaf #041</p>
                                <p className="text-[10px] text-gray-400 mt-0.5">1 hour ago • Blight</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="px-4 pb-6 mt-4">
                <button
                    onClick={onOpenSettings}
                    className="w-full flex items-center px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 rounded-lg transition-all duration-200 cursor-pointer mb-2"
                >
                    <Settings className="w-4 h-4 mr-3" />
                    Settings
                </button>

                {/* User Profile */}
                {user ? (
                    <div
                        onClick={() => triggerToast("Opening user profile...")}
                        className="flex items-center px-2 py-2 bg-gray-50/50 rounded-xl cursor-pointer hover:bg-gray-100 transition-all duration-200 border border-transparent hover:border-gray-200 hover:shadow-sm"
                    >
                        <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800 font-bold text-xs mr-3 shrink-0">
                            {user.name.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-gray-900 truncate">{user.name}</p>
                            <p className="text-[10px] text-gray-500 truncate">{user.role}</p>
                        </div>
                    </div>
                ) : (
                    <div
                        onClick={onOpenAuth}
                        className="flex items-center px-2 py-2 bg-gray-50/50 rounded-xl cursor-pointer hover:bg-gray-100 transition-all duration-200 border border-transparent hover:border-gray-200 hover:shadow-sm group"
                    >
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold text-xs mr-3 shrink-0 transition-colors group-hover:bg-gray-300">
                            ?
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-gray-900 truncate">Guest</p>
                            <p className="text-[10px] text-emerald-600 font-bold truncate">Log In / Sign Up</p>
                        </div>
                    </div>
                )}
            </div>

        </div>
    );
};
