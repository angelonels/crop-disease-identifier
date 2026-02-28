import React from 'react';
import { ArrowRight, Sprout } from 'lucide-react';

interface SpeciesLibraryViewProps {
    onStartScan: (crop: string) => void;
}

export const SpeciesLibraryView: React.FC<SpeciesLibraryViewProps> = ({ onStartScan }) => {
    const species = [
        { name: 'Tomato', scientific: 'Solanum lycopersicum', count: 12, icon: '🍅', color: 'red' },
        { name: 'Potato', scientific: 'Solanum tuberosum', count: 8, icon: '🥔', color: 'amber' },
        { name: 'Bell Pepper', scientific: 'Capsicum annuum', count: 6, icon: '🫑', color: 'emerald' },
    ];

    return (
        <div className="flex-1 flex flex-col h-screen bg-[#fafbfc] overflow-y-auto">

            {/* Top Nav */}
            <div className="h-16 border-b border-gray-100 flex items-center px-8 shrink-0 bg-white gap-2 text-[#0b9c71]">
                <Sprout className="w-5 h-5 flex-shrink-0" />
                <h1 className="text-gray-900 font-bold text-[15px]">Species Library</h1>
            </div>

            <div className="p-10 max-w-6xl mx-auto w-full">
                <div className="mb-10 text-center max-w-2xl mx-auto">
                    <h2 className="text-[28px] font-extrabold text-[#111827] mb-2 tracking-tight">Supported Crops</h2>
                    <p className="text-gray-500 text-[15px] leading-relaxed">
                        Our ONNX model is currently trained to detect specialized diseases across these specific crop varieties.
                    </p>
                </div>

                <div className="grid grid-cols-3 gap-6">
                    {species.map((s) => (
                        <div key={s.name} className={`bg-white rounded-3xl border border-gray-100 p-8 shadow-sm hover:shadow-md transition-shadow hover:border-${s.color}-200 group flex flex-col`}>

                            <div className={`w-16 h-16 rounded-2xl bg-${s.color}-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform text-3xl`}>
                                {s.icon}
                            </div>

                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-gray-900 mb-1">{s.name}</h3>
                                <p className="text-xs text-gray-400 font-medium italic mb-6">{s.scientific}</p>

                                <div className="bg-gray-50 rounded-xl p-4 mb-8">
                                    <div className="text-[24px] font-black text-gray-900 leading-none mb-1">{s.count}</div>
                                    <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Detectable Diseases</div>
                                </div>
                            </div>

                            <button
                                onClick={() => onStartScan(s.name.toLowerCase().replace(' ', ''))}
                                className={`w-full py-3 bg-white border-2 border-gray-100 rounded-xl text-sm font-bold text-gray-700 hover:bg-${s.color}-50 hover:text-${s.color}-700 hover:border-${s.color}-200 transition-colors flex items-center justify-center cursor-pointer`}
                            >
                                Diagnose {s.name}
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </button>

                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
