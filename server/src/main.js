const { app, BrowserWindow, ipcMain } = require('electron');
const { diagnoseImage } = require('./inference');
const { getTreatmentByCommonName } = require('./database');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  const rendererUrl = process.env.ELECTRON_START_URL;
  if (rendererUrl) {
    win.loadURL(rendererUrl);
    return;
  }

  const fallbackHtml = `data:text/html,${encodeURIComponent('<html><body><h2>Crop Disease Identifier backend is running.</h2></body></html>')}`;
  win.loadURL(fallbackHtml);
}

function toNodeBuffer(imageBuffer) {
  if (Buffer.isBuffer(imageBuffer)) {
    return imageBuffer;
  }

  if (imageBuffer instanceof Uint8Array) {
    return Buffer.from(imageBuffer);
  }

  if (imageBuffer && imageBuffer.type === 'Buffer' && Array.isArray(imageBuffer.data)) {
    return Buffer.from(imageBuffer.data);
  }

  throw new Error('Invalid imageBuffer payload received from renderer');
}

ipcMain.handle('diagnose-image', async (_event, payload) => {
  const { imageBuffer, species } = payload || {};

  if (!imageBuffer || !species) {
    throw new Error('diagnose-image requires both imageBuffer and species');
  }

  const diagnosis = await diagnoseImage(toNodeBuffer(imageBuffer), species);
  const treatment = getTreatmentByCommonName(diagnosis.commonName);

  return {
    species: diagnosis.speciesKey,
    speciesName: diagnosis.speciesName,
    classIndex: diagnosis.classIndex,
    diseaseKey: diagnosis.diseaseKey,
    diseaseName: diagnosis.diseaseName,
    commonName: diagnosis.commonName,
    logit: diagnosis.logit,
    treatment
  };
});

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});