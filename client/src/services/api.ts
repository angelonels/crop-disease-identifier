export interface ScanResult {
    id: string;
    diseaseName: string;
    scientificName: string;
    severity: number;
    symptoms: string[];
    chemicalControl: string[];
    organicControl: string[];
}

export const analyzeImage = async (file: File, cropType: string): Promise<ScanResult> => {
    return new Promise((resolve) => {
        // Simulate a 3-second delay for inference
        setTimeout(() => {
            resolve({
                id: `CHM-${Math.floor(Math.random() * 10000)}`,
                diseaseName: cropType === "tomato" ? "Late Blight" : "Leaf Spot",
                scientificName: cropType === "tomato" ? "Phytophthora infestans" : "Cercospora sp.",
                severity: 85,
                symptoms: ["Water-soaked spots", "Necrotic lesions", "White fungal growth"],
                chemicalControl: [
                    "Apply fungicides containing mefenoxam",
                    "Use copper-based sprays",
                    "Repeat every 5-7 days"
                ],
                organicControl: [
                    "Remove infected leaves",
                    "Apply Neem Oil",
                    "Ensure proper spacing"
                ]
            });
        }, 3000);
    });
};
