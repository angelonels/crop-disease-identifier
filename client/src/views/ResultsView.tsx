import React, { useEffect, useState } from 'react';
import {
    FileText,
    Download,
    Search,
    ZoomIn,
    Maximize,
    CheckCircle2,
    RefreshCcw,
    FlaskConical,
    Sprout,
    Check
} from 'lucide-react';
import type { DiagnosisResult } from '../types';

interface ResultsViewProps {
    result: DiagnosisResult;
    file: File;
    cropType: string;
    onNewScan: () => void;
    triggerToast: (msg: string) => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({ result, file, cropType, onNewScan, triggerToast }) => {
    const [previewUrl, setPreviewUrl] = useState<string>('');

    useEffect(() => {
        const objectUrl = URL.createObjectURL(file);
        setPreviewUrl(objectUrl);
        return () => URL.revokeObjectURL(objectUrl);
    }, [file]);

    return (
        <div className="flex-1 flex flex-col h-screen bg-[#f8f9fa] overflow-hidden">

            {/* Top Nav (from Image 3) */}
            <div className="h-16 border-b border-gray-100 flex items-center justify-between px-8 shrink-0 bg-white shadow-sm z-10">
                <div className="flex items-center gap-3">
                    <div className="w-7 h-7 bg-[#10b981] rounded-lg flex items-center justify-center">
                        <Sprout className="w-4 h-4 text-white" />
                    </div>
                    <h1 className="text-gray-900 font-extrabold text-[15px] tracking-tight">Crop Health Monitor</h1>
                </div>
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => triggerToast("Analysis saved to local SQLite database.")}
                        className="flex items-center text-sm font-bold text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
                    >
                        <FileText className="w-4 h-4 mr-2" />
                        Save Analysis
                    </button>
                    <button
                        onClick={() => triggerToast("Generating PDF report...")}
                        className="flex items-center px-4 py-2 bg-[#0b9c71] text-white text-sm font-bold rounded-lg hover:bg-emerald-700 transition-colors shadow-[0_2px_4px_rgba(11,156,113,0.2)] cursor-pointer"
                    >
                        <Download className="w-4 h-4 mr-2" />
                        Export Report
                    </button>
                    <div
                        onClick={() => triggerToast("Opening user profile...")}
                        className="w-8 h-8 rounded-full ml-2 border border-orange-200 overflow-hidden bg-orange-100 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
                    >
                        <img src="https://i.pravatar.cc/150?u=a042581f4e29026024d" alt="Profile" className="w-full h-full object-cover" />
                    </div>
                </div>
            </div>

            {/* Main Content Split */}
            <div className="flex-1 grid grid-cols-[38%_62%] min-h-0 bg-white">

                {/* Left Column: Image Area */}
                <div className="h-full border-r border-gray-100 p-8 flex items-center justify-center bg-[#f8fafc]/50">
                    <div className="relative w-full h-full max-h-[85vh] rounded-[24px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-gray-900">
                        {previewUrl && (
                            <img
                                src={previewUrl}
                                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                                alt="Analyzed Leaf"
                            />
                        )}

                        <div className="absolute top-4 right-4 flex gap-2">
                            <button
                                onClick={() => triggerToast("Zooming into high-res area...")}
                                className="w-8 h-8 bg-black/50 hover:bg-black/70 backdrop-blur-md rounded-lg flex items-center justify-center text-white transition-colors cursor-pointer"
                            >
                                <ZoomIn className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => triggerToast("Opening full screen image viewer...")}
                                className="w-8 h-8 bg-black/50 hover:bg-black/70 backdrop-blur-md rounded-lg flex items-center justify-center text-white transition-colors cursor-pointer"
                            >
                                <Maximize className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Bottom Analysis Pill */}
                        <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-xl p-4 rounded-xl shadow-lg flex items-center justify-between border border-white/20">
                            <div className="flex flex-col">
                                <span className="text-[10px] uppercase tracking-widest font-bold text-gray-500 mb-0.5">Analysis Target</span>
                                <span className="font-extrabold text-[#111827] text-[15px] capitalize">{result.scientificName} ({cropType})</span>
                            </div>
                            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#ecfdf5] text-[#059669] rounded-lg font-bold text-xs border border-[#a7f3d0]">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                Confirmed
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Scrollable Data */}
                <div className="h-full overflow-y-auto custom-scrollbar p-10 bg-white">
                    <div className="max-w-2xl mx-auto space-y-6 pb-12">

                        {/* Header Section */}
                        <div className="flex items-start justify-between mb-8">
                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <span className={`px-2.5 py-1 text-[10px] font-bold rounded-md tracking-wider border ${result.isHealthy ? 'text-[#059669] bg-[#d1fae5] border-[#6ee7b7]' :
                                            result.confidence >= 80 ? 'text-[#ef4444] bg-[#fef2f2] border-[#fecaca]' :
                                                result.confidence >= 50 ? 'text-[#f59e0b] bg-[#fffbeb] border-[#fde68a]' :
                                                    'text-[#10b981] bg-[#ecfdf5] border-[#a7f3d0]'
                                        }`}>
                                        {result.isHealthy ? 'HEALTHY' : result.confidence >= 80 ? 'HIGH SEVERITY' : result.confidence >= 50 ? 'MEDIUM SEVERITY' : 'LOW SEVERITY'}
                                    </span>
                                    <span className="text-xs text-gray-400 font-medium">ID: {result.id}</span>
                                </div>
                                <h2 className="text-[32px] font-black text-[#111827] leading-none mb-2">{result.diseaseName} {result.isHealthy ? '' : 'Detected'}</h2>
                                <p className="text-[15px] text-gray-500 font-medium tracking-wide">{result.scientificName}</p>
                            </div>
                            <button
                                onClick={onNewScan}
                                className="flex items-center px-4 py-2 border border-gray-200 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
                            >
                                <RefreshCcw className="w-4 h-4 mr-2 text-gray-400" />
                                New Scan
                            </button>
                        </div>

                        {/* Infection Severity */}
                        {!result.isHealthy && (
                            <div className="bg-[#f8fafc] border border-[#f1f5f9] rounded-2xl p-6 shadow-sm">
                                <p className="text-xs font-semibold text-gray-500 mb-1">Infection Confidence</p>

                                <div className="flex items-end justify-between mb-4">
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-[40px] font-black text-[#111827] leading-none tracking-tighter">{result.confidence}%</span>
                                        <span className={`text-sm font-bold ${result.confidence >= 80 ? 'text-[#ef4444]' :
                                            result.confidence >= 50 ? 'text-[#f59e0b]' :
                                                'text-[#10b981]'
                                            }`}>
                                            {result.confidence >= 80 ? 'Critical Level' : result.confidence >= 50 ? 'Warning Level' : 'Monitor Level'}
                                        </span>
                                    </div>
                                    <span className="text-xs font-medium text-gray-500">
                                        {result.confidence >= 80 ? 'Action required within 24h' : 'Schedule treatment soon'}
                                    </span>
                                </div>

                                {/* Progress Bar Container */}
                                <div className="relative mb-2">
                                    <div className="h-3 w-full rounded-full bg-gradient-to-r from-[#10b981] via-[#f59e0b] to-[#ef4444] shadow-inner" />
                                    {/* Custom Marker */}
                                    <div
                                        className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-[#111827] rounded-full shadow-md transition-all duration-1000"
                                        style={{ left: `${result.confidence}%`, transform: 'translate(-50%, -50%)' }}
                                    />
                                </div>

                                <div className="flex justify-between text-[10px] font-bold text-gray-400 tracking-widest uppercase">
                                    <span>Healthy</span>
                                    <span>Warning</span>
                                    <span>Critical</span>
                                </div>
                            </div>
                        )}

                        {/* Identified Symptoms */}
                        {!result.isHealthy && (
                            <div className="border border-gray-200 rounded-2xl p-6 shadow-sm bg-white">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-8 h-8 rounded-full bg-[#eff6ff] flex items-center justify-center shrink-0">
                                        <Search className="w-4 h-4 text-[#3b82f6]" strokeWidth={3} />
                                    </div>
                                    <h3 className="text-[17px] font-bold text-[#111827]">Identified Symptoms</h3>
                                </div>

                                <div className="flex gap-6 mb-5">
                                    <p className="text-[#4b5563] text-sm leading-relaxed flex-1">
                                        Analysis indicates {result.symptoms.join(", ").toLowerCase()} based on visual indicators.
                                    </p>
                                    <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0 border border-gray-200 shadow-sm">
                                        <img
                                            src="https://images.unsplash.com/photo-1628155930542-3c7a64e2c886?q=80&w=400&auto=format&fit=crop"
                                            alt="Microscopy preview"
                                            className="w-full h-full object-cover opacity-80"
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-2 flex-wrap">
                                    {result.symptoms.map((sym, idx) => (
                                        <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-md text-xs font-semibold">{sym}</span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Treatments Row */}
                        {!result.isHealthy ? (
                            <div className="grid grid-cols-2 gap-4 pt-2">

                                {/* Chemical Control */}
                                <div className="border border-gray-200 rounded-2xl p-6 shadow-sm bg-white flex flex-col hover:border-[#c084fc] hover:shadow-md transition-all">
                                    <div className="flex items-center gap-3 mb-5">
                                        <div className="w-10 h-10 rounded-xl bg-[#f3e8ff] flex items-center justify-center shrink-0">
                                            <FlaskConical className="w-5 h-5 text-[#9333ea]" />
                                        </div>
                                        <h4 className="font-bold text-[#111827] text-base">Chemical Methods</h4>
                                    </div>
                                    <ul className="space-y-4 flex-1 mb-6">
                                        {result.chemical_control.map((cmd, idx) => (
                                            <li key={idx} className="flex items-start text-sm text-[#4b5563]">
                                                <Check className="w-4 h-4 text-[#9333ea] mr-2 shrink-0 mt-0.5" strokeWidth={3} />
                                                <span className="leading-snug">{cmd}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <button
                                        onClick={() => triggerToast("Searching local registry for chemical suppliers...")}
                                        className="w-full py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                                    >
                                        Find Suppliers
                                    </button>
                                </div>

                                {/* Organic Control */}
                                <div className="border border-gray-200 rounded-2xl p-6 shadow-sm bg-white flex flex-col hover:border-[#34d399] hover:shadow-md transition-all">
                                    <div className="flex items-center gap-3 mb-5">
                                        <div className="w-10 h-10 rounded-xl bg-[#ecfdf5] flex items-center justify-center shrink-0">
                                            <Sprout className="w-5 h-5 text-[#10b981]" />
                                        </div>
                                        <h4 className="font-bold text-[#111827] text-base">Cultural / Organic Methods</h4>
                                    </div>
                                    <ul className="space-y-4 flex-1 mb-6">
                                        {result.cultural_control.map((cmd, idx) => (
                                            <li key={idx} className="flex items-start text-sm text-[#4b5563]">
                                                <Check className="w-4 h-4 text-[#10b981] mr-2 shrink-0 mt-0.5" strokeWidth={3} />
                                                <span className="leading-snug">{cmd}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <button
                                        onClick={() => triggerToast("Loading organic control documentation...")}
                                        className="w-full py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                                    >
                                        View Guide
                                    </button>
                                </div>

                            </div>
                        ) : (
                            <div className="bg-[#ecfdf5] border-2 border-[#10b981] rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-lg">
                                <div className="w-16 h-16 bg-[#10b981] rounded-full flex items-center justify-center mb-4">
                                    <CheckCircle2 className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-black text-[#065f46] mb-2">Crop appears healthy!</h3>
                                <p className="text-[#047857] font-medium max-w-md">
                                    No immediate action required. Maintain normal watering and fertilization schedule to keep the {cropType} thriving.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div >
    );
};
