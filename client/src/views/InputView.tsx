import React, { useRef } from 'react';
import {
    ChevronRight,
    Search,
    Bell,
    HelpCircle,
    Apple,
    Leaf,
    Sprout,
    UploadCloud,
    FolderOpen,
    Info
} from 'lucide-react';

interface InputViewProps {
    selectedSpecies: string;
    onSpeciesChange: (val: string) => void;
    onUpload: (file: File) => void;
    triggerToast: (message: string) => void;
}

export const InputView: React.FC<InputViewProps> = ({ selectedSpecies, onSpeciesChange, onUpload, triggerToast }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const rawFile = e.target.files[0];
            // In Electron, the file input captures the local path. We just pass the File object.
            onUpload(rawFile);
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (!selectedSpecies) {
            triggerToast("Please select a crop species first.");
            return;
        }
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const rawFile = e.dataTransfer.files[0];
            onUpload(rawFile);
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleContainerClick = () => {
        if (!selectedSpecies) {
            triggerToast("Please select a crop species first.");
            return;
        }
        fileInputRef.current?.click();
    };

    return (
        <div className="flex-1 flex flex-col h-screen bg-white">
            {/* Top Nav */}
            <div className="h-16 border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
                <div className="flex items-center text-sm">
                    <span className="text-gray-400">Diagnosis</span>
                    <ChevronRight className="w-4 h-4 text-gray-300 mx-2" />
                    <span className="text-gray-900 font-bold">New Scan</span>
                </div>
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search history..."
                            className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#0b9c71] w-64 text-gray-600 font-medium placeholder-gray-400"
                        />
                    </div>
                    <button
                        onClick={() => triggerToast("No new notifications")}
                        className="w-9 h-9 border border-gray-200 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-all duration-200 cursor-pointer relative"
                    >
                        <Bell className="w-4 h-4" />
                        <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-red-500 rounded-full border border-white"></span>
                    </button>
                    <button
                        onClick={() => triggerToast("Opening help center...")}
                        className="w-9 h-9 border border-gray-200 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-all duration-200 cursor-pointer"
                    >
                        <HelpCircle className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto p-10 bg-[#fbfcfc]">
                <div className="max-w-4xl mx-auto">

                    <h2 className="text-[28px] font-extrabold text-gray-900 mb-2 tracking-tight">New Diagnosis</h2>
                    <p className="text-gray-500 text-[15px] mb-10 max-w-2xl leading-relaxed">
                        Select the crop species and upload a clear image of the leaf to detect potential diseases
                        and receive treatment recommendations.
                    </p>

                    {/* Form Container */}
                    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">

                        {/* Species Selection */}
                        <div className="p-8 border-b border-gray-100">
                            <h3 className="text-[11px] font-bold text-gray-500 tracking-widest uppercase mb-4">Select Species</h3>
                            <div className="flex gap-4 overflow-x-auto pb-2 custom-scrollbar">

                                {/* Tomato */}
                                <button
                                    onClick={() => onSpeciesChange('tomato')}
                                    className={`flex items-center px-4 py-3 min-w-[140px] min-h-[4rem] rounded-xl border transition-all ${selectedSpecies === 'tomato'
                                        ? 'border-[#0b9c71] shadow-[0_0_0_1px_rgba(11,156,113,1)] bg-emerald-50/20'
                                        : 'border-gray-200 hover:border-gray-300 bg-white'
                                        }`}
                                >
                                    <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center mr-4">
                                        <Apple className="w-4 h-4 text-red-500" />
                                    </div>
                                    <span className={`font-bold text-[15px] ${selectedSpecies === 'tomato' ? 'text-gray-900' : 'text-gray-700'}`}>Tomato</span>
                                </button>

                                {/* Apple */}
                                <button
                                    onClick={() => onSpeciesChange('apple')}
                                    className={`flex items-center px-4 py-3 min-w-[140px] min-h-[4rem] rounded-xl border transition-all ${selectedSpecies === 'apple'
                                        ? 'border-[#0b9c71] shadow-[0_0_0_1px_rgba(11,156,113,1)] bg-emerald-50/20'
                                        : 'border-gray-200 hover:border-gray-300 bg-white'
                                        }`}
                                >
                                    <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center mr-4">
                                        <Apple className="w-4 h-4 text-red-600" />
                                    </div>
                                    <span className={`font-bold text-[15px] ${selectedSpecies === 'apple' ? 'text-gray-900' : 'text-gray-700'}`}>Apple</span>
                                </button>

                                {/* Potato */}
                                <button
                                    onClick={() => onSpeciesChange('potato')}
                                    className={`flex items-center px-4 py-3 min-w-[140px] min-h-[4rem] rounded-xl border transition-all ${selectedSpecies === 'potato'
                                        ? 'border-[#0b9c71] shadow-[0_0_0_1px_rgba(11,156,113,1)] bg-emerald-50/20'
                                        : 'border-gray-200 bg-white hover:border-gray-300'
                                        }`}
                                >
                                    <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center mr-4">
                                        <Leaf className="w-4 h-4 text-amber-600" />
                                    </div>
                                    <span className={`font-bold text-[15px] ${selectedSpecies === 'potato' ? 'text-gray-900' : 'text-gray-700'}`}>Potato</span>
                                </button>

                                {/* Bell Pepper */}
                                <button
                                    onClick={() => onSpeciesChange('pepper,_bell')}
                                    className={`flex items-center px-4 py-3 min-w-[140px] min-h-[4rem] rounded-xl border transition-all ${selectedSpecies === 'pepper,_bell'
                                        ? 'border-[#0b9c71] shadow-[0_0_0_1px_rgba(11,156,113,1)] bg-emerald-50/20'
                                        : 'border-gray-200 bg-white hover:border-gray-300'
                                        }`}
                                >
                                    <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center mr-4">
                                        <Sprout className="w-4 h-4 text-emerald-600" />
                                    </div>
                                    <span className={`font-bold text-[15px] ${selectedSpecies === 'pepper,_bell' ? 'text-gray-900' : 'text-gray-700'}`}>Bell Pepper</span>
                                </button>

                            </div>
                        </div>

                        {/* Upload Area */}
                        <div className="p-10 flex items-center justify-center pb-12">
                            <div
                                onDrop={handleDrop}
                                onDragOver={handleDragOver}
                                onClick={handleContainerClick}
                                className={`w-[80%] border-2 border-dashed rounded-2xl flex flex-col items-center justify-center min-h-[340px] transition-all relative ${selectedSpecies
                                    ? "bg-white border-gray-200 hover:bg-gray-50/50 hover:border-gray-300 cursor-pointer"
                                    : "bg-gray-50 border-gray-200 opacity-60 cursor-not-allowed"
                                    }`}
                            >
                                <input
                                    type="file"
                                    accept="image/jpeg, image/png, image/heic"
                                    className="hidden"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    disabled={!selectedSpecies}
                                />
                                <div className="w-16 h-16 bg-[#eef2f9] rounded-full flex items-center justify-center mb-6 pointer-events-none">
                                    <UploadCloud className="w-7 h-7 text-[#738ab8]" strokeWidth={2.5} />
                                </div>
                                <h4 className="text-[17px] font-bold text-gray-900 mb-2 pointer-events-none">
                                    {selectedSpecies ? "Click or drag image here" : "Please select a crop species first"}
                                </h4>
                                <p className="text-gray-500 text-sm mb-8 font-medium pointer-events-none">Supported formats: JPEG, PNG (Max 10MB)</p>

                                <button
                                    onClick={(e) => { e.stopPropagation(); handleContainerClick(); }}
                                    disabled={!selectedSpecies}
                                    className="flex items-center px-5 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors shadow-sm z-10 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <FolderOpen className="w-4 h-4 mr-2" />
                                    Browse Files
                                </button>
                            </div>
                        </div>

                    </div>

                    {/* Info Box */}
                    <div className="mt-8 bg-[#f5f8fc] border border-[#e1e9f4] rounded-xl p-5 flex items-start">
                        <div className="w-5 h-5 bg-[#314a87] rounded-full text-white flex items-center justify-center shrink-0 mt-0.5 mr-4 border-2 border-[#e3ebf5]">
                            <Info className="w-3 h-3" strokeWidth={3} />
                        </div>
                        <div>
                            <h5 className="font-bold text-[#2a3c61] text-[13px] mb-1">Best Practice</h5>
                            <p className="text-[13px] text-[#425985] leading-relaxed">
                                For the most accurate diagnosis, ensure the leaf is centered, well-lit, and placed against a neutral background.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};
