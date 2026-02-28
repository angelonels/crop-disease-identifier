import React from 'react';
import { Target, AlertTriangle, ShieldCheck, Activity, Plus, Sprout } from 'lucide-react';

interface DashboardViewProps {
    triggerToast: (msg: string) => void;
    onNewScan: () => void;
    onViewResult: (crop: string, diseaseName: string, severity: number) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ triggerToast, onNewScan, onViewResult }) => {
    return (
        <div className="flex-1 flex flex-col h-screen bg-[#fafbfc] overflow-y-auto">
            {/* Top Nav */}
            <div className="h-16 border-b border-gray-100 flex items-center justify-between px-8 shrink-0 bg-white">
                <div className="flex items-center gap-2 text-[#0b9c71]">
                    <Sprout className="w-5 h-5 flex-shrink-0" />
                    <h1 className="text-gray-900 font-bold text-[15px]">Dashboard Overview</h1>
                </div>
                <button
                    onClick={onNewScan}
                    className="bg-[#0b9c71] hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center transition-colors shadow-[0_2px_4px_rgba(11,156,113,0.2)] cursor-pointer"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Start Diagnosis
                </button>
            </div>

            <div className="p-10 max-w-6xl mx-auto w-full">
                {/* Stat Cards */}
                <div className="grid grid-cols-3 gap-6 mb-10">

                    <div className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest">Total Scans</h3>
                            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                                <Target className="w-5 h-5" />
                            </div>
                        </div>
                        <div className="text-[40px] font-black text-gray-900 leading-none">142</div>
                        <p className="text-xs text-gray-400 mt-2 font-medium">+12 from last week</p>
                    </div>

                    <div className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest">High Severity Alerts</h3>
                            <div className="w-10 h-10 bg-red-50 text-red-600 rounded-xl flex items-center justify-center">
                                <AlertTriangle className="w-5 h-5" />
                            </div>
                        </div>
                        <div className="text-[40px] font-black text-gray-900 leading-none">3</div>
                        <p className="text-xs text-red-500 mt-2 font-medium">Requires immediate action</p>
                    </div>

                    <div className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest">System Status</h3>
                            <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
                                <ShieldCheck className="w-5 h-5" />
                            </div>
                        </div>
                        <div className="text-[20px] font-bold text-gray-900 leading-tight flex-1 flex items-center mt-2">
                            ONNX Engine<br />Ready
                        </div>
                        <p className="text-xs text-emerald-500 mt-2 font-medium flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            All systems nominal
                        </p>
                    </div>

                </div>

                {/* Recent Activity List */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-[#fbfcfc]">
                        <h3 className="font-bold text-gray-900 flex items-center gap-2">
                            <Activity className="w-4 h-4 text-emerald-600" />
                            Recent Activity
                        </h3>
                        <button
                            onClick={() => triggerToast("Loading complete activity log...")}
                            className="text-xs font-bold text-gray-500 hover:text-[#0b9c71] cursor-pointer transition-colors"
                        >
                            View All
                        </button>
                    </div>
                    <div className="divide-y divide-gray-50">
                        {[
                            { id: 1, crop: "Tomato", disease: "Healthy", severity: 5, action: "Diagnosis completed", time: "2 mins ago", isAlert: false },
                            { id: 2, crop: "Potato", disease: "Late Blight", severity: 85, action: "Critical severity detected", time: "1 hour ago", isAlert: true },
                            { id: 3, crop: "Bell Pepper", disease: "Mildew", severity: 40, action: "Diagnosis completed", time: "3 hours ago", isAlert: false }
                        ].map((activity) => (
                            <div
                                key={activity.id}
                                onClick={() => onViewResult(activity.crop, activity.disease, activity.severity)}
                                className="p-5 flex items-center gap-4 hover:bg-gray-50 transition-colors cursor-pointer group"
                            >
                                {activity.crop === 'Tomato' && <span className="flex items-center justify-center w-8 h-8 rounded-full bg-red-100 text-red-500 text-lg shrink-0">🍅</span>}
                                {activity.crop === 'Potato' && <span className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-100 text-amber-600 text-lg shrink-0">🥔</span>}
                                {activity.crop === 'Bell Pepper' && <span className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-600 text-lg shrink-0">🫑</span>}
                                <div className="flex-1">
                                    <p className="text-sm font-bold text-gray-900 group-hover:text-[#0b9c71] transition-colors">{activity.action} <span className="font-medium text-gray-500">for</span> {activity.crop}</p>
                                    <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                                </div>
                                <div className={`w-2 h-2 rounded-full ${activity.isAlert ? 'bg-red-500' : 'bg-emerald-500'}`} />
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};
