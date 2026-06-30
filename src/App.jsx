import React, { useState, useEffect } from "react";
import Header from "./components/Header.jsx";
import UploadZone from "./components/UploadZone.jsx";
import CameraCapture from "./components/CameraCapture.jsx";
import AnalysisResult from "./components/AnalysisResult.jsx";
import ScanHistory from "./components/ScanHistory.jsx";
import DiseaseInfo from "./components/DiseaseInfo.jsx";
import Support from "./components/Support.jsx";
import { Camera, Upload, RefreshCw, Activity, Sparkles, ShieldAlert } from "lucide-react";
import { diseases } from "./data/diseases.js";

// Global cache for Teachable Machine model to avoid re-loading on each scan
let cachedModel = null;

function findMatchingDisease(classLabel) {
  if (!classLabel) return diseases[diseases.length - 1];

  const normalizedLabel = classLabel.toLowerCase().trim().replace(/[-_]/g, " ");

  // Try direct match with id
  let match = diseases.find(d => d.id === normalizedLabel || d.id.replace(/_/g, " ") === normalizedLabel);
  if (match) return match;

  // Try match with name
  match = diseases.find(d => d.name.toLowerCase() === normalizedLabel);
  if (match) return match;

  // Try match with technical name
  match = diseases.find(d => d.technicalName.toLowerCase().includes(normalizedLabel));
  if (match) return match;

  // Partial match with name or id
  match = diseases.find(d => normalizedLabel.includes(d.id.replace(/_/g, " ")) || d.id.replace(/_/g, " ").includes(normalizedLabel));
  if (match) return match;

  // Fallback to unknown_normal
  return diseases.find(d => d.id === "unknown_normal") || diseases[diseases.length - 1];
}

export default function App() {
  const [activeTab, setActiveTab] = useState("screener");
  const [selectedImage, setSelectedImage] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [scanHistory, setScanHistory] = useState([]);
  const [analysisStatus, setAnalysisStatus] = useState("Preparing image sample...");

  // Theme state
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("skinguard_theme");
    if (saved) return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  // Toggle Theme Class on documentElement
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("skinguard_theme", theme);
  }, [theme]);

  // Loading animation status messages
  const loadingStatusMessages = [
    "Preparing image sample...",
    "Correcting lens distortion & lighting contrast...",
    "Isolating epidermal skin margins...",
    "Consulting Skin Guard AI screening model...",
    "Calculating diagnostic category probability...",
    "Matching clinical symptoms & home-care resources..."
  ];

  // Load Scan History from LocalStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("skinguard_scans") || localStorage.getItem("dermshield_scans");
      if (stored) {
        setScanHistory(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load local scan history:", e);
    }
  }, []);

  // Save Scan History Helper
  const saveScanToHistory = (newResult, image) => {
    try {
      const newHistoryItem = {
        id: "scan_" + Date.now(),
        timestamp: new Date().toISOString(),
        condition: newResult.condition,
        confidence: newResult.confidence,
        urgency: newResult.urgency,
        imageUrl: image,
        resultDetails: newResult
      };

      const updatedHistory = [newHistoryItem, ...scanHistory];
      setScanHistory(updatedHistory);
      localStorage.setItem("skinguard_scans", JSON.stringify(updatedHistory));
    } catch (e) {
      console.error("Failed to persist scan history:", e);
    }
  };

  const handleClearHistory = () => {
    if (window.confirm("Are you sure you want to permanently delete all local scan records? This action cannot be undone.")) {
      setScanHistory([]);
      localStorage.removeItem("skinguard_scans");
      localStorage.removeItem("dermshield_scans");
    }
  };

  // Triggers Teachable Machine Image Classification in the browser
  const runClassification = async (image) => {
    setSelectedImage(image);
    setIsAnalyzing(true);
    setAnalysisResult(null);

    // Dynamic Loading Text Ticker
    let currentStep = 0;
    setAnalysisStatus(loadingStatusMessages[0]);
    const timer = setInterval(() => {
      if (currentStep < loadingStatusMessages.length - 1) {
        currentStep++;
        setAnalysisStatus(loadingStatusMessages[currentStep]);
      }
    }, 1200);

    try {
      // Ensure Teachable Machine script tag is loaded on window
      if (!window.tmImage) {
        throw new Error("Teachable Machine library is not loaded on the window. Please check your network connection.");
      }

      setAnalysisStatus("Loading Teachable Machine Model...");
      const modelURL = "https://teachablemachine.withgoogle.com/models/j5vLvXOmX/model.json";
      const metadataURL = "https://teachablemachine.withgoogle.com/models/j5vLvXOmX/metadata.json";

      // Load model once and keep in cache
      if (!cachedModel) {
        cachedModel = await window.tmImage.load(modelURL, metadataURL);
      }

      setAnalysisStatus("Analyzing skin image pathology patterns...");

      // Convert the image data URL into an HTML Image Element for TensorFlow.js to consume
      const img = new Image();
      img.src = image;
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = () => reject(new Error("Unable to decode the captured image. Please try uploading a different photo."));
      });

      // Execute predictions
      const predictions = await cachedModel.predict(img);
      console.log("Teachable Machine raw predictions:", predictions);

      if (!predictions || predictions.length === 0) {
        throw new Error("Teachable Machine returned no diagnostic predictions.");
      }

      // Identify the predicted category with the highest probability score
      let topPrediction = predictions[0];
      for (let i = 1; i < predictions.length; i++) {
        if (predictions[i].probability > topPrediction.probability) {
          topPrediction = predictions[i];
        }
      }

      // Map class name to our complete medical and care guidelines from diseases.js
      const mappedDisease = findMatchingDisease(topPrediction.className);

      const result = {
        condition: mappedDisease.name,
        confidence: topPrediction.probability,
        description: mappedDisease.description,
        symptoms: mappedDisease.symptoms,
        selfCare: mappedDisease.selfCare,
        urgency: mappedDisease.urgency,
        isTeachableMachine: true,
        modelClass: topPrediction.className
      };

      setAnalysisResult(result);

      // Save result to the local history ledger
      saveScanToHistory(result, image);
    } catch (error) {
      console.error("Teachable Machine classification error:", error);
      alert("Classification failed: " + error.message);
    } finally {
      clearInterval(timer);
      setIsAnalyzing(false);
    }
  };

  // Reviewing previous result from history tab
  const handleReviewHistoryItem = (item) => {
    setSelectedImage(item.imageUrl);
    setAnalysisResult(item.resultDetails || {
      condition: item.condition,
      confidence: item.confidence,
      urgency: item.urgency,
      description: "Previous local recording.",
      symptoms: [],
      selfCare: []
    });
    setActiveTab("screener");
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 font-sans flex flex-col transition-colors duration-300" id="app-root">
      {/* Dynamic Header & Tab controls */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} theme={theme} setTheme={setTheme} />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">

        {activeTab === "screener" && (
          <div className="max-w-4xl mx-auto space-y-8" id="screener-view-tab">
            {isAnalyzing ? (
              /* Immersive Scanning State */
              <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-12 text-center shadow-lg flex flex-col items-center justify-center space-y-6 min-h-[450px]" id="analyzing-state">
                <div className="relative w-32 h-32 flex items-center justify-center">
                  {/* Glowing Radar Waves */}
                  <div className="absolute inset-0 bg-blue-500/10 rounded-full animate-ping"></div>
                  <div className="absolute inset-4 bg-blue-500/20 rounded-full animate-pulse"></div>
                  <div className="bg-blue-600 text-white p-6 rounded-full shadow-lg shadow-blue-500/30 z-10 relative">
                    <Activity size={44} className="animate-spin duration-3000" />
                  </div>
                </div>

                <div className="space-y-2 max-w-sm">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight flex items-center justify-center gap-2">
                    <Sparkles className="text-blue-500 animate-pulse" size={18} />
                    Analyzing Epidermal Spot
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 h-6 animate-pulse font-mono">
                    {analysisStatus}
                  </p>
                </div>

                <div className="w-full max-w-xs bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-blue-600 h-full rounded-full animate-progress"></div>
                </div>
              </div>
            ) : analysisResult ? (
              /* Display Diagnostic Result Page */
              <AnalysisResult
                result={analysisResult}
                imageUrl={selectedImage}
                onReset={() => {
                  setSelectedImage(null);
                  setAnalysisResult(null);
                }}
                onViewLibrary={() => setActiveTab("library")}
              />
            ) : (
              /* Idle Upload or Capture Selection Page */
              <div className="space-y-8" id="screener-idle-panel">

                {/* Stunning Modern Hero Section */}
                <div className="bg-linear-to-r from-blue-600 via-blue-800 to-slate-950 text-white rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent opacity-60"></div>
                  <div className="relative z-10 max-w-3xl space-y-5">
                    <span className="bg-blue-500/20 text-blue-200 border border-blue-400/30 text-2xs uppercase tracking-widest px-3 py-1 rounded-full font-mono font-bold">
                      Clinical AI Screening Prototype
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
                      AI-Powered Skin Disease <br className="hidden sm:inline" /> Screening & Detection
                    </h2>
                    <p className="text-sm sm:text-base text-blue-100 leading-relaxed max-w-2xl">
                      Skin Guard helps you identify possible skin conditions in seconds using artificial intelligence. Simply upload an image and get instant insights before visiting a healthcare professional.

                      We aim to support early awareness, reduce delays in diagnosis, and improve access to basic skin health screening for everyone.
                    </p>
                    <div className="flex flex-wrap gap-3 pt-2">
                      <button
                        onClick={() => {
                          const element = document.getElementById("screener-action-card");
                          if (element) {
                            element.scrollIntoView({ behavior: "smooth" });
                          }
                        }}
                        className="bg-white text-blue-900 font-bold py-2.5 px-5 rounded-xl text-xs hover:bg-slate-100 transition-all cursor-pointer shadow-md shadow-black/10"
                      >
                        Upload Photo & Start
                      </button>
                      <button
                        onClick={() => setActiveTab("library")}
                        className="bg-blue-700/60 text-white font-semibold py-2.5 px-5 rounded-xl text-xs hover:bg-blue-700 transition-all cursor-pointer border border-blue-500/30"
                      >
                        Explore Conditions Library
                      </button>
                      <button
                        onClick={() => setActiveTab("support")}
                        className="bg-slate-900/40 text-blue-100 font-semibold py-2.5 px-5 rounded-xl text-xs hover:bg-slate-900/60 transition-all cursor-pointer"
                      >
                        Learn Our Mission
                      </button>
                    </div>
                  </div>
                </div>

                {/* Main Action Card */}
                <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-6 md:p-8 shadow-xs space-y-6" id="screener-action-card">
                  <UploadZone onImageSelected={runClassification} />

                  {/* Camera Trigger block */}
                  <div className="relative flex py-2 items-center">
                    <div className="grow border-t border-slate-100 dark:border-slate-800"></div>
                    <span className="shrink mx-4 text-slate-400 dark:text-slate-500 text-xs font-mono font-bold uppercase tracking-widest">OR</span>
                    <div className="grow border-t border-slate-100 dark:border-slate-800"></div>
                  </div>

                  <div className="flex justify-center">
                    <button
                      onClick={() => setIsCameraActive(true)}
                      className="bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl text-sm flex items-center justify-center gap-2.5 transition-all shadow-md active:scale-95 cursor-pointer w-full sm:w-auto"
                      id="btn-open-camera"
                    >
                      <Camera size={18} />
                      Capture with Device Camera
                    </button>
                  </div>
                </div>

                {isCameraActive && (
                  /* Live camera widget overlay/viewport */
                  <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 z-50">
                    <div className="w-full max-w-md">
                      <CameraCapture
                        onImageCaptured={(img) => {
                          setIsCameraActive(false);
                          runClassification(img);
                        }}
                        onClose={() => setIsCameraActive(false)}
                      />
                    </div>
                  </div>
                )}

                {/* Introductory Disclaimer Banner */}
                <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 flex gap-3 text-slate-600 dark:text-slate-400" id="welcome-disclaimer">
                  <ShieldAlert className="text-slate-500 shrink-0 mt-0.5" size={20} />
                  <div>
                    <h4 className="text-2xs font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-widest">Prototype Screening Notice</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-normal">
                      This application is developed strictly for preliminary research and screening purposes. Skin Guard does not save your files, track cookies, or share your data. All predictions should be verified with clinical diagnostic tests administered by medical professionals.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "support" && (
          <div className="max-w-6xl mx-auto" id="support-view-tab">
            <Support />
          </div>
        )}

        {activeTab === "history" && (
          <div className="max-w-6xl mx-auto" id="history-view-tab">
            <ScanHistory
              history={scanHistory}
              onSelectItem={handleReviewHistoryItem}
              onClearHistory={handleClearHistory}
            />
          </div>
        )}

        {activeTab === "library" && (
          <div className="max-w-6xl mx-auto" id="library-view-tab">
            <DiseaseInfo />
          </div>
        )}

      </main>

      {/* Humble Footer */}
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 py-6 text-center text-xs text-slate-400 dark:text-slate-500 font-medium transition-colors duration-300">
        <p>© 2026 Skin Guard AI Research System. All rights reserved.</p>
        <p className="font-mono text-3xs uppercase tracking-widest text-slate-300 dark:text-slate-600 mt-1">Prototype release version 1.10.0</p>
      </footer>
    </div>
  );
}
