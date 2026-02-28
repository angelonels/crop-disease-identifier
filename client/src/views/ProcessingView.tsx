import React, { useEffect, useState } from 'react';
import {
    Bell,
    RefreshCcw,
    Eye,
    Hexagon,
    CheckCircle2,
    Circle,
    Lock
} from 'lucide-react';

interface ProcessingViewProps {
    file: File;
    triggerToast: (msg: string) => void;
}

export const ProcessingView: React.FC<ProcessingViewProps> = ({ file, triggerToast }) => {
    const [previewUrl, setPreviewUrl] = useState<string>('');

    useEffect(() => {
        const objectUrl = URL.createObjectURL(file);
        setPreviewUrl(objectUrl);
        return () => URL.revokeObjectURL(objectUrl);
    }, [file]);

    return (
        <div className="flex-1 flex flex-col h-screen bg-[#fafbfc]">

            {/* Top Nav (from Image 2) */}
            <div className="h-16 border-b border-gray-100 flex items-center justify-between px-8 shrink-0 bg-white">
                <h1 className="text-gray-900 font-bold text-[15px]">New Diagnosis</h1>
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => triggerToast("No new notifications")}
                        className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                    >
                        <Bell className="w-5 h-5" />
                    </button>
                    <div
                        onClick={() => triggerToast("Opening user profile...")}
                        className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-xs cursor-pointer hover:bg-emerald-200 transition-colors"
                    >
                        JD
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-10">
                <div className="max-w-4xl mx-auto">

                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex items-center text-[#1db37f] text-[10px] font-bold uppercase tracking-widest mb-3">
                            <RefreshCcw className="w-3.5 h-3.5 mr-2 animate-spin-slow" />
                            Processing Image
                        </div>
                        <h2 className="text-[28px] font-extrabold text-[#111827] mb-2 tracking-tight">Analyzing Crop Sample</h2>
                        <p className="text-gray-500 text-[15px] max-w-2xl leading-relaxed">
                            Please wait while our local AI processes your sample for disease markers.
                        </p>
                    </div>

                    {/* Image Node */}
                    <div className="relative w-full aspect-[2/1] rounded-2xl overflow-hidden shadow-lg mb-8 bg-[#0f172a]">
                        {previewUrl && (
                            <img
                                src={previewUrl}
                                className="w-full h-full object-cover opacity-80"
                                alt="Scanning Leaf"
                            />
                        )}

                        {/* Outline Targets */}
                        <div className="absolute top-6 left-6 w-10 h-10 border-t-2 border-l-2 border-white/60 rounded-tl-[4px]" />
                        <div className="absolute top-6 right-6 w-10 h-10 border-t-2 border-r-2 border-white/60 rounded-tr-[4px]" />
                        <div className="absolute bottom-6 right-6 w-10 h-10 border-b-2 border-r-2 border-white/60 rounded-br-[4px]" />

                        {/* Scan Line */}
                        <div className="absolute w-full h-[2px] bg-[#10b981] shadow-[0_0_15px_3px_rgba(16,185,129,0.6)] z-10 animate-scan-line" />

                        {/* Anomaly Badges */}
                        <div className="absolute top-[40%] left-[35%] bg-[#0f172a]/80 backdrop-blur-md text-white/90 text-xs font-bold px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-yellow-400" />
                            Texture Anomaly
                        </div>
                        <div className="absolute top-[60%] right-[30%] bg-[#0f172a]/80 backdrop-blur-md text-white/90 text-xs font-bold px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-[#10b981]" />
                            Chlorophyll OK
                        </div>

                        {/* Bottom Info & Button */}
                        <div className="absolute bottom-6 left-6 font-mono text-white/90 flex flex-col">
                            <span className="text-[9px] tracking-[0.2em] opacity-70 mb-1">SOURCE FILE</span>
                            <span className="text-[13px] font-bold tracking-wide">{file.name}</span>
                        </div>

                        <div
                            onClick={() => triggerToast("Connecting to live camera feed...")}
                            className="absolute bottom-6 right-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm cursor-pointer text-white text-[11px] font-bold px-4 py-2 rounded-full flex items-center gap-2 border border-white/40 transition-colors"
                        >
                            <Eye className="w-3.5 h-3.5" strokeWidth={2.5} />
                            LIVE VIEW
                        </div>
                    </div>

                    {/* Status Indicators */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_8px_-4px_rgba(0,0,0,0.05)] overflow-hidden">

                        <div className="p-6 pb-0 mb-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
                                        <Hexagon className="w-5 h-5 text-emerald-600 fill-emerald-600" />
                                    </div>
                                    <div className="flex flex-col">
                                        <h4 className="text-gray-900 font-extrabold text-[15px]">Running local ONNX inference...</h4>
                                        <p className="text-gray-400 text-xs font-medium mt-0.5">Model: ResNet-50-CropDisease-v4</p>
                                    </div>
                                </div>
                                <div className="text-emerald-600 font-black text-lg">45%</div>
                            </div>
                            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-[#0b9c71] rounded-full w-[45%]" />
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-4 px-6 pb-6">
                            {/* Step 1 */}
                            <div className="flex-1 min-w-[200px] bg-[#f0fdf4] border border-[#d1fae5] rounded-xl p-4 flex items-start gap-4">
                                <div className="w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center shrink-0">
                                    <CheckCircle2 className="w-4 h-4 text-white" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest mb-0.5">Step 1</p>
                                    <p className="font-bold text-gray-900 text-sm">Image Preprocessing</p>
                                </div>
                            </div>

                            {/* Step 2 */}
                            <div className="flex-1 min-w-[200px] bg-[#f0fdf4] border border-[#d1fae5] rounded-xl p-4 flex items-start gap-4 shadow-sm">
                                <RefreshCcw className="w-6 h-6 text-emerald-600 shrink-0 animate-spin-slow" />
                                <div>
                                    <p className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest mb-0.5">Step 2</p>
                                    <p className="font-bold text-gray-900 text-sm">Feature Extraction</p>
                                </div>
                            </div>

                            {/* Step 3 */}
                            <div className="flex-1 min-w-[200px] border border-gray-100 bg-white rounded-xl p-4 flex items-start gap-4 opacity-50">
                                <Circle className="w-6 h-6 text-gray-300 shrink-0" strokeWidth={2} />
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Step 3</p>
                                    <p className="font-bold text-gray-500 text-sm">Disease Classification</p>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="mt-8 text-center flex items-center justify-center gap-2 text-gray-400 font-medium text-[13px]">
                        <Lock className="w-3.5 h-3.5" />
                        This process runs entirely on your device for data privacy.
                    </div>

                </div>
            </div>
        </div>
    );
};
