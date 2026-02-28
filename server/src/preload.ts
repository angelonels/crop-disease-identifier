import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('api', {
    diagnoseImage: (filePath: string, species: string) => ipcRenderer.invoke('diagnose-image', filePath, species),
    getHistory: () => ipcRenderer.invoke('get-history')
});
