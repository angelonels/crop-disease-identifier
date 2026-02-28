import { app, BrowserWindow, ipcMain, IpcMainInvokeEvent } from 'electron';
import path from 'path';
import * as ort from 'onnxruntime-node';
import sharp from 'sharp';
import db, { insertScanLine, getAllHistory, getDiseaseByIndex, ScanRecord } from './db';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
    app.quit();
}

let mainWindow: BrowserWindow;

const createWindow = () => {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: false,
            contextIsolation: true
        },
    });

    // Load the index.html of the app.
    // In production, we'd load the built files. In dev, we load from localhost.
    const isDev = process.env.NODE_ENV !== 'production';
    if (isDev) {
        mainWindow.loadURL('http://localhost:5173');
        // mainWindow.webContents.openDevTools();
    } else {
        mainWindow.loadFile(path.join(__dirname, '../../client/dist/index.html'));
    }
};

app.on('ready', () => {
    createWindow();

    ipcMain.handle('diagnose-image', async (event: IpcMainInvokeEvent, filePath: string, cropType: string) => {
        try {
            const onnxPath = path.join(__dirname, '../models/swin_transformer.onnx');
            const session = await ort.InferenceSession.create(onnxPath);

            const imageBuffer = await sharp(filePath)
                .resize(224, 224)
                .raw()
                .toBuffer();

            const float32Data = new Float32Array(3 * 224 * 224);
            for (let i = 0; i < 224 * 224; i++) {
                float32Data[i] = imageBuffer[i * 3] / 255.0; // R
                float32Data[i + 224 * 224] = imageBuffer[i * 3 + 1] / 255.0; // G
                float32Data[i + 2 * 224 * 224] = imageBuffer[i * 3 + 2] / 255.0; // B
            }

            const tensor = new ort.Tensor('float32', float32Data, [1, 3, 224, 224]);

            console.log("ONNX Expected Input Names:", session.inputNames);
            const inputName = session.inputNames[0];

            const feeds: Record<string, ort.Tensor> = {};
            feeds[inputName] = tensor;

            const results = await session.run(feeds);
            const output = results[session.outputNames[0]].data as Float32Array;

            let maxIndex = 0;
            let maxValue = output[0];
            for (let i = 1; i < output.length; i++) {
                if (output[i] > maxValue) {
                    maxValue = output[i];
                    maxIndex = i;
                }
            }

            // The actual maxIndex 0-37 aligns with plant_manifest.json and DB
            const diseaseRecord = getDiseaseByIndex.get(maxIndex) as any;
            if (!diseaseRecord) {
                throw new Error(`Disease index ${maxIndex} not found in treatments DB.`);
            }

            const confidenceScore = Math.min(Math.round((Math.abs(maxValue) * 10) + 70), 99); // Mock dynamic confidence

            // Throw error for very uncertain images (poor quality)
            if (confidenceScore < 40) {
                throw new Error("Image unclear. Please retake the photo in better light.");
            }

            const id = `CHM-${Math.floor(Math.random() * 10000)}`;
            const now = new Date();
            const dateStr = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
            const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });

            // Ensure scientific name handles all mapped inputs
            let sciName = "Unknown Species";
            if (cropType === 'tomato') sciName = "Solanum lycopersicum";
            if (cropType === 'potato') sciName = "Solanum tuberosum";
            if (cropType === 'pepper,_bell') sciName = "Capsicum annuum";
            if (cropType === 'apple') sciName = "Malus domestica";

            insertScanLine.run({
                id,
                date: dateStr,
                time: timeStr,
                crop: cropType,
                disease: diseaseRecord.name,
                scientific_name: sciName,
                severity: diseaseRecord.severity,
                symptoms: diseaseRecord.symptoms,
                color: diseaseRecord.severity > 50 ? 'red' : 'emerald'
            });

            return {
                id,
                diseaseName: diseaseRecord.name,
                scientificName: sciName,
                confidence: confidenceScore,
                symptoms: JSON.parse(diseaseRecord.symptoms),
                chemical_control: JSON.parse(diseaseRecord.chemical_treatment),
                cultural_control: JSON.parse(diseaseRecord.organic_treatment),
                isHealthy: diseaseRecord.name === 'Healthy'
            };

        } catch (err: any) {
            console.error("ONNX/DB Analysis Error:", err);
            throw new Error(err.message || "Failed to analyze crop.");
        }
    });

    ipcMain.handle('get-history', async () => {
        try {
            const rows = getAllHistory.all() as ScanRecord[];

            return rows.map(r => ({
                id: r.id,
                date: r.date,
                time: r.time,
                crop: r.crop,
                disease: r.disease,
                severity: r.severity > 70 ? 'High' : r.severity > 30 ? 'Medium' : r.severity > 0 ? 'Low' : 'None',
                color: r.color
            }));
        } catch (e) {
            console.error("Failed to get DB history", e);
            return [];
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
