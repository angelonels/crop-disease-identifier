import type { DiagnosisResult } from '../types';

export const analyzeImage = async (file: File & { path?: string }, cropType: string): Promise<DiagnosisResult> => {
    try {
        // Ensure we are in an Electron environment and the file path exists
        if (!window.api) {
            throw new Error("Electron API bridge is not available. Please run the desktop app.");
        }

        if (!file.path) {
            throw new Error("Local file path not available required for Electron processing.");
        }

        const result = await window.api.diagnoseImage(file.path, cropType) as DiagnosisResult;
        return result;

    } catch (e) {
        console.error("Analysis Error:", e);
        throw e;
    }
};

export const getScanHistory = async (): Promise<any[]> => {
    try {
        if (!window.api) return [];
        const result = await window.api.getHistory();
        return result;
    } catch (e) {
        console.error("History Error:", e);
        return [];
    }
};
