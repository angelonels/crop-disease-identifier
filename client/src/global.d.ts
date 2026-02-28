import type { DiagnosisResult } from './types/index';

declare global {
    interface Window {
        api: {
            diagnoseImage: (filePath: string, species: string) => Promise<DiagnosisResult>;
            getHistory: () => Promise<any[]>;
        };
    }
}
