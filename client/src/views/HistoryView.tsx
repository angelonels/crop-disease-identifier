import React from 'react';
import { Search, Filter, FileText } from 'lucide-react';

interface HistoryViewProps {
    triggerToast: (msg: string) => void;
    onViewResult: (crop: string, diseaseName: string, severity: number) => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({ triggerToast, onViewResult }) => {
    const scans = [
        { id: '#CHM-2023-892', date: 'Oct 24, 2026', time: '14:30', crop: 'Tomato', disease: 'Late Blight', severity: 'High', color: 'red' },
        { id: '#CHM-2023-891', date: 'Oct 24, 2026', time: '09:15', crop: 'Potato', disease: 'Healthy', severity: 'None', color: 'emerald' },
        { id: '#CHM-2023-890', date: 'Oct 23, 2026', time: '16:45', crop: 'Bell Pepper', disease: 'Powdery Mildew', severity: 'Medium', color: 'amber' },
        { id: '#CHM-2023-889', date: 'Oct 21, 2026', time: '11:20', crop: 'Tomato', disease: 'Leaf spot', severity: 'Low', color: 'blue' },
        { id: '#CHM-2023-888', date: 'Oct 20, 2026', time: '15:05', crop: 'Potato', disease: 'Healthy', severity: 'None', color: 'emerald' },
    ];

    return (
        <div className="flex-1 flex flex-col h-screen bg-[#fafbfc] overflow-hidden">

            {/* Top Nav */}
            <div className="h-16 border-b border-gray-100 flex items-center justify-between px-8 shrink-0 bg-white">
                <h1 className="text-gray-900 font-bold text-[15px]">Scan History</h1>
                <div className="flex gap-3">
                    <div className="relative">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search ID or crop..."
                            className="pl-9 pr-4 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none focus:ring-1 focus:ring-[#0b9c71]"
                        />
                    </div>
                    <button
                        onClick={() => triggerToast("Opening advanced filter options...")}
                        className="flex items-center px-3 py-1.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 cursor-pointer transition-all duration-200"
                    >
                        <Filter className="w-4 h-4 mr-2" />
                        Filter
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-10">
                <div className="max-w-6xl mx-auto bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#fbfcfc] border-b border-gray-100">
                                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Scan ID / Date</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Crop</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Disease</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Severity</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {scans.map((scan) => (
                                <tr
                                    key={scan.id}
                                    onClick={() => onViewResult(scan.crop, scan.disease, scan.severity === 'High' ? 85 : scan.severity === 'Medium' ? 50 : 5)}
                                    className="hover:bg-gray-50 transition-colors group cursor-pointer"
                                >
                                    <td className="px-6 py-4 flex items-center gap-3">
                                        {scan.crop === 'Tomato' && <span className="flex items-center justify-center w-8 h-8 rounded-full bg-red-100 text-red-500 text-lg shrink-0">🍅</span>}
                                        {scan.crop === 'Potato' && <span className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-100 text-amber-600 text-lg shrink-0">🥔</span>}
                                        {scan.crop === 'Bell Pepper' && <span className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-600 text-lg shrink-0">🫑</span>}
                                        <div>
                                            <div className="font-bold text-gray-900 group-hover:text-[#0b9c71] transition-colors text-sm mb-0.5">{scan.id}</div>
                                            <div className="text-xs text-gray-400 font-medium">{scan.date} • {scan.time}</div>
                                        </div>
                                    </td>

                                    <td className="px-6 py-4">
                                        <span className="text-sm font-semibold text-gray-700">{scan.crop}</span>
                                    </td>

                                    <td className="px-6 py-4">
                                        <span className={`text-sm font-bold ${scan.color === 'emerald' ? 'text-gray-500' : 'text-gray-900'}`}>
                                            {scan.disease}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase bg-${scan.color}-50 text-${scan.color}-600 border border-${scan.color}-100 inline-flex items-center`}>
                                            {scan.severity}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); triggerToast(`Generating PDF report for ${scan.id}...`); }}
                                            className="inline-flex items-center px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-bold text-gray-600 hover:bg-white hover:text-[#0b9c71] hover:border-[#0b9c71] hover:shadow-sm cursor-pointer transition-all duration-200 opacity-0 group-hover:opacity-100"
                                        >
                                            <FileText className="w-3.5 h-3.5 mr-1.5" />
                                            View Report
                                        </button>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    );
};
