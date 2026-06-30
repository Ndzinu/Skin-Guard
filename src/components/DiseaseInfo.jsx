import React, { useState } from "react";
import { diseases } from "../data/diseases.js";
import { Search, ChevronRight, Activity, ArrowLeft, ShieldAlert, Heart, ClipboardList } from "lucide-react";

export default function DiseaseInfo() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDisease, setSelectedDisease] = useState(null);

  const filteredDiseases = diseases.filter((d) =>
    d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.technicalName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getUrgencyBadge = (level) => {
    switch (level?.toLowerCase()) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200 dark:bg-red-950/40 dark:text-red-300 dark:border-red-900/60";
      case "medium":
        return "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-900/60";
      default:
        return "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-900/60";
    }
  };

  if (selectedDisease) {
    const d = selectedDisease;
    return (
      <div className="space-y-6 animate-fade-in" id="disease-details-view">
        {/* Back navigation header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <button
            onClick={() => setSelectedDisease(null)}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-2 px-4 shadow-3xs cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            id="btn-back-to-library"
          >
            <ArrowLeft size={14} />
            Back to Library
          </button>
          <span className={`text-2xs font-extrabold uppercase tracking-widest border px-3 py-1 rounded-full ${getUrgencyBadge(d.urgency)}`}>
            {d.urgency} Urgency
          </span>
        </div>

        {/* Hero banner card */}
        <div className={`p-6 rounded-3xl bg-linear-to-r ${d.color} text-white shadow-xl flex flex-col justify-end space-y-2`} id="disease-detail-hero">
          <p className="text-xs font-mono opacity-80 uppercase tracking-widest">{d.technicalName}</p>
          <h2 className="text-3xl font-extrabold tracking-tight">{d.name}</h2>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Main clinical description column */}
          <div className="md:col-span-7 space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 shadow-xs space-y-3">
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-2">
                <Activity size={16} className="text-blue-600 dark:text-blue-400" />
                Dermatological Overview
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {d.description}
              </p>
            </div>

            {/* Checklist of symptoms */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-2">
                <ClipboardList size={16} className="text-slate-700 dark:text-slate-300" />
                Standard Clinical Symptoms
              </h3>
              <ul className="space-y-3">
                {d.symptoms.map((symptom, idx) => (
                  <li key={idx} className="flex gap-2.5 items-start text-slate-600 dark:text-slate-300 text-sm">
                    <span className="w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full mt-2 shrink-0"></span>
                    <span>{symptom}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Home Care & pre-screening action column */}
          <div className="md:col-span-5 space-y-6">
            <div className="bg-blue-50/10 dark:bg-blue-950/10 border border-blue-100/50 dark:border-blue-900/40 rounded-2xl p-6 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-blue-800 dark:text-blue-300 uppercase tracking-wider flex items-center gap-2">
                <Heart size={16} className="text-blue-600 dark:text-blue-400" />
                Pre-clinical Home Care Guide
              </h3>
              <ul className="space-y-3">
                {d.selfCare.map((tip, idx) => (
                  <li key={idx} className="flex gap-3 text-slate-700 dark:text-slate-300 text-sm">
                    <span className="flex items-center justify-center shrink-0 w-5 h-5 bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 rounded-full text-xs font-bold font-mono">
                      {idx + 1}
                    </span>
                    <span className="leading-normal">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Disclaimer reminder */}
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 flex gap-3 text-slate-600 dark:text-slate-400">
              <ShieldAlert className="text-slate-500 shrink-0 mt-0.5" size={18} />
              <p className="text-3xs font-medium leading-relaxed uppercase tracking-wider">
                NOTE: This content is compiled for informational and screening reference only. Always seek the advice of your primary care physician or a professional dermatologist.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in" id="disease-library-page">
      {/* Title block */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 shadow-xs">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
          <ClipboardList size={20} className="text-blue-600 dark:text-blue-400" />
          Skin Disease Reference Library
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Explore complete descriptions, symptoms, and self-care directions for the 11 targeted dermatological categories classified by this screening system.
        </p>
      </div>

      {/* Search Input bar */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input
          type="text"
          placeholder="Search conditions library by name or medical term..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 pl-11 pr-4 text-sm focus:outline-hidden focus:border-slate-400 dark:focus:border-slate-500 focus:ring-1 focus:ring-slate-400 dark:focus:ring-slate-500 transition-all placeholder-slate-400 text-slate-800 dark:text-white"
          id="library-search-input"
        />
      </div>

      {/* Grid of Conditions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="diseases-grid">
        {filteredDiseases.length > 0 ? (
          filteredDiseases.map((d) => (
            <div
              key={d.id}
              onClick={() => setSelectedDisease(d)}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 shadow-3xs hover:shadow-md transition-all duration-200 cursor-pointer group flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700"
              id={`library-card-${d.id}`}
            >
              <div className="space-y-3">
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors text-base tracking-tight">{d.name}</h3>
                    <p className="text-4xs font-mono text-slate-400 uppercase tracking-widest mt-0.5">{d.technicalName}</p>
                  </div>
                  <span className={`text-4xs font-extrabold uppercase tracking-widest border px-2 py-0.5 rounded-full ${getUrgencyBadge(d.urgency)}`}>
                    {d.urgency}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed">
                  {d.description}
                </p>
              </div>

              <div className="border-t border-slate-50 dark:border-slate-850 mt-4 pt-3 flex items-center justify-between text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform">
                <span>View Full Details</span>
                <ChevronRight size={14} />
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-8 text-center text-sm text-slate-400 italic">
            No matching skin conditions found in the library.
          </div>
        )}
      </div>
    </div>
  );
}
