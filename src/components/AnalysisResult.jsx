import React from "react";
import { AlertTriangle, CheckCircle, ShieldAlert, BookOpen, RefreshCw, Clipboard, Calendar } from "lucide-react";

export default function AnalysisResult({ result, imageUrl, onReset, onViewLibrary }) {
  const { condition, confidence, description, symptoms = [], selfCare = [], urgency = "low", isSimulated, isTeachableMachine, modelClass } = result;

  // Formatting urgency state styles
  const getUrgencyConfig = (level) => {
    switch (level?.toLowerCase()) {
      case "high":
        return {
          bg: "bg-red-50 border-red-200 text-red-800",
          pill: "bg-red-600 text-white",
          text: "Critical - See Dermatologist Immediately",
          icon: <ShieldAlert className="text-red-600 shrink-0" size={24} />
        };
      case "medium":
        return {
          bg: "bg-amber-50 border-amber-200 text-amber-800",
          pill: "bg-amber-500 text-white",
          text: "Moderate - Schedule Doctor Visit Soon",
          icon: <AlertTriangle className="text-amber-500 shrink-0" size={24} />
        };
      default:
        return {
          bg: "bg-emerald-50 border-emerald-200 text-emerald-800",
          pill: "bg-emerald-500 text-white",
          text: "Mild - Routine Monitoring & Self-Care",
          icon: <CheckCircle className="text-emerald-500 shrink-0" size={24} />
        };
    }
  };

  const urgencyConfig = getUrgencyConfig(urgency);

  return (
    <div className="space-y-8 animate-fade-in" id="analysis-result-page">
      {/* Medical Disclaimer Callout */}
      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl flex gap-3 shadow-xs" id="result-disclaimer">
        <ShieldAlert className="text-red-500 shrink-0" size={20} />
        <div>
          <h4 className="text-sm font-bold text-red-900 uppercase tracking-wide">Critical Medical Disclaimer</h4>
          <p className="text-xs text-red-700 leading-relaxed mt-0.5">
            This screening tool is an experimental machine learning prototype. It is designed to support awareness and provide educational references prior to clinical consultations.
            <strong> It does NOT constitute medical diagnosis, professional advice, or treatment.</strong> If your condition is bleeding, painful, spreading rapidly, or you suspect skin cancer, consult a certified dermatologist or emergency services immediately.
          </p>
        </div>
      </div>

      {/* Main Results Bento-Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Image and Main Diagnosis */}
        <div className="lg:col-span-5 space-y-6">
          {/* Compare Card */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-xs overflow-hidden">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-3">Uploaded Skin Photo</h3>
            <div className="relative aspect-square rounded-xl overflow-hidden bg-slate-900 border border-slate-100">
              <img
                src={imageUrl}
                alt="Analyzed condition"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              {isSimulated && (
                <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-3xs font-mono py-1 px-2.5 rounded-full border border-slate-700 uppercase tracking-wider">
                  Simulation Mode Active
                </div>
              )}
              {isTeachableMachine && (
                <div className="absolute top-3 left-3 bg-blue-950/90 backdrop-blur-xs text-blue-300 text-3xs font-mono py-1.5 px-3 rounded-full border border-blue-800/80 uppercase tracking-wider flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-ping"></span>
                  Scan Active
                </div>
              )}
            </div>
          </div>

          {/* Diagnosis Badge Card */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 shadow-xs text-center space-y-4">
            <div>
              <p className="text-xs font-mono text-slate-400 uppercase tracking-widest">
                {isTeachableMachine && modelClass ? `TM Class: ${modelClass}` : "Primary Classification"}
              </p>
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">{condition}</h2>
            </div>

            {/* Confidence progress */}
            <div className="flex flex-col items-center">
              <div className="relative w-24 h-24 flex items-center justify-center">
                {/* SVG Radial Meter */}
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="48" cy="48" r="40" stroke="#f1f5f9" strokeWidth="8" fill="transparent" />
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="#2563eb"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={251.2}
                    strokeDashoffset={251.2 - (251.2 * confidence)}
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xl font-extrabold text-slate-900 dark:text-white">{Math.round(confidence * 100)}%</span>
                  <span className="text-4xs text-slate-400 uppercase tracking-widest font-mono">Confidence</span>
                </div>
              </div>
            </div>

            {/* Urgency Ribbon */}
            <div className={`p-3.5 border rounded-xl flex items-center gap-3 text-left ${urgencyConfig.bg}`}>
              {urgencyConfig.icon}
              <div>
                <p className="text-3xs uppercase tracking-wider font-mono opacity-80">Urgency Assessment</p>
                <p className="text-xs font-bold leading-tight">{urgencyConfig.text}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Detailed Clinical / Self-Care Analysis */}
        <div className="lg:col-span-7 space-y-6">
          {/* Overview & Description Card */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 shadow-xs space-y-3">
            <div className="flex items-center gap-2">
              <Clipboard className="text-blue-500" size={18} />
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">Clinical Description</h3>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {description}
            </p>
          </div>

          {/* Symptoms Checklist */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 bg-slate-900 dark:bg-slate-100 rounded-full"></span> Common Symptoms Checklist
            </h3>
            {symptoms.length > 0 ? (
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {symptoms.map((symptom, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-slate-600 dark:text-slate-300 text-sm">
                    <input
                      type="checkbox"
                      defaultChecked
                      disabled
                      className="mt-1 accent-blue-500 w-4 h-4 rounded-xs"
                    />
                    <span>{symptom}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-slate-400 italic">No symptoms details recorded for this condition.</p>
            )}
          </div>

          {/* Self Care & Pre-care Steps */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-blue-100 dark:border-blue-900 p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-blue-800 dark:text-blue-200 uppercase tracking-wider flex items-center gap-2">
              <CheckCircle className="text-blue-500" size={18} /> Pre-consultation Self-Care
            </h3>
            {selfCare.length > 0 ? (
              <ul className="space-y-3">
                {selfCare.map((tip, idx) => (
                  <li key={idx} className="flex gap-3 text-slate-700 dark:text-slate-300 text-sm">
                    <span className="flex items-center justify-center shrink-0 w-5 h-5 bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 rounded-full text-xs font-bold font-mono">
                      {idx + 1}
                    </span>
                    <span className="leading-normal">{tip}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-slate-400 italic">No self-care suggestions recorded.</p>
            )}
          </div>
        </div>
      </div>

      {/* Primary Action Row */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
        <button
          onClick={onReset}
          className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white font-medium py-3 px-6 rounded-xl text-sm flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md shadow-slate-900/10 cursor-pointer"
          id="btn-scan-again"
        >
          <RefreshCw size={16} />
          Scan Another Photo
        </button>
        <button
          onClick={onViewLibrary}
          className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-medium py-3 px-6 rounded-xl text-sm flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
          id="btn-view-library"
        >
          <BookOpen size={16} />
          Browse Conditions Library
        </button>
      </div>
    </div>
  );
}
