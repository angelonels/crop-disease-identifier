import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { InputView } from './views/InputView';
import { ProcessingView } from './views/ProcessingView';
import { ResultsView } from './views/ResultsView';
import { DashboardView } from './views/DashboardView';
import { HistoryView } from './views/HistoryView';
import { SpeciesLibraryView } from './views/SpeciesLibraryView';
import { Toast } from './components/Toast';
import { AuthModal } from './components/AuthModal';
import { SettingsModal } from './components/SettingsModal';
import type { DiagnosisResult } from './types';

type ViewState = 'input' | 'processing' | 'results' | 'dashboard' | 'history' | 'library';

function App() {
  // Navigation State
  const [view, setView] = useState<ViewState>('dashboard');

  // Auth & Modal State
  const [user, setUser] = useState<{ name: string, role: string } | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Toast State
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const triggerToast = (message: string) => setToastMessage(message);

  // Diagnostic State
  const [selectedCrop, setSelectedCrop] = useState<string>('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [scanStatus, setScanStatus] = useState<'idle' | 'processing' | 'complete'>('idle');
  const [scanResults, setScanResults] = useState<DiagnosisResult | null>(null);

  const handleImageUpload = (file: File) => {
    setUploadedFile(file);
    setScanStatus('processing');
    setView('processing');
    // Inference happens inside <ProcessingView> now
  };

  const handleNavigate = (newView: string) => {
    // Reset diagnostic state if leaving the diagnosis flow
    if (newView !== 'input' && newView !== 'processing' && newView !== 'results') {
      setUploadedFile(null);
      setScanStatus('idle');
      setScanResults(null);
      // We'll keep selectedCrop as is
    }

    // If they click Diagnosis while a scan is complete, show them results again,
    // or if idle show input.
    if (newView === 'input') {
      if (scanStatus === 'complete') {
        setView('results');
        return;
      }
      if (scanStatus === 'processing') {
        setView('processing');
        return;
      }
    }

    setView(newView as ViewState);
  };

  const handleNewScan = () => {
    setUploadedFile(null);
    setScanResults(null);
    setScanStatus('idle');
    setView('input');
  };

  const handleStartSpecificScan = (crop: string) => {
    setSelectedCrop(crop);
    setUploadedFile(null);
    setScanResults(null);
    setScanStatus('idle');
    setView('input');
  };

  const handleViewMockResult = (crop: string, diseaseName: string, severity: number) => {
    const mockRes: DiagnosisResult = {
      id: "CHM-HISTORY",
      diseaseName: diseaseName,
      scientificName: crop === 'Tomato' ? 'Solanum lycopersicum' : crop === 'Potato' ? 'Solanum tuberosum' : 'Capsicum annuum',
      confidence: severity,
      symptoms: ["Historical scan artifact"],
      chemical_control: ["Historical dataset record"],
      cultural_control: ["Historical dataset record"],
      isHealthy: false
    };
    setSelectedCrop(crop.toLowerCase().replace(' ', ''));
    setScanResults(mockRes);
    setUploadedFile(new File([""], `historical_${crop.toLowerCase()}.jpg`, { type: "image/jpeg" }));
    setScanStatus('complete');
    setView('results');
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-50 font-sans text-gray-900">
      {/* Sidebar - Fixed Left */}
      <Sidebar
        currentView={view}
        onNavigate={handleNavigate}
        onNewScan={handleNewScan}
        triggerToast={triggerToast}
        user={user}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {view === 'input' && (
          <InputView
            selectedSpecies={selectedCrop}
            onSpeciesChange={setSelectedCrop}
            onUpload={handleImageUpload}
            triggerToast={triggerToast}
          />
        )}
        {view === 'processing' && uploadedFile && (
          <ProcessingView
            file={uploadedFile}
            cropType={selectedCrop}
            onComplete={(res) => {
              setScanResults(res);
              setScanStatus('complete');
              setView('results');
              triggerToast("Analysis complete. Results loaded successfully.");
            }}
            triggerToast={triggerToast}
            onBack={() => {
              setScanStatus('idle');
              setView('input');
            }}
          />
        )}
        {view === 'results' && scanResults && uploadedFile && (
          <ResultsView
            result={scanResults}
            file={uploadedFile}
            cropType={selectedCrop}
            onNewScan={handleNewScan}
            triggerToast={triggerToast}
          />
        )}

        {view === 'dashboard' && <DashboardView triggerToast={triggerToast} onNewScan={handleNewScan} onViewResult={handleViewMockResult} />}
        {view === 'history' && <HistoryView triggerToast={triggerToast} onViewResult={handleViewMockResult} />}
        {view === 'library' && <SpeciesLibraryView onStartScan={handleStartSpecificScan} />}

      </main>

      {isAuthOpen && (
        <AuthModal
          onClose={() => setIsAuthOpen(false)}
          onLogin={(u) => { setUser(u); setIsAuthOpen(false); triggerToast("Successfully logged in."); }}
        />
      )}

      {isSettingsOpen && (
        <SettingsModal
          onClose={() => setIsSettingsOpen(false)}
          triggerToast={triggerToast}
        />
      )}

      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );
}

export default App;
