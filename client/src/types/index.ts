export interface DiagnosisResult {
    id: string;
    scientificName: string;
    diseaseName: string;
    confidence: number;
    symptoms: string[];
    cultural_control: string[];
    chemical_control: string[];
    isHealthy: boolean;
}
