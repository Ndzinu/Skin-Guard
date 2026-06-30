import React, { useState } from "react";
import { Clock, Eye, Trash2, Search, ArrowRight, ShieldAlert } from "lucide-react";

export default function ScanHistory({ history = [], onSelectItem, onClearHistory }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredHistory = history.filter((item) =>
    item.condition?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatTime = (isoString) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    } catch {
      return "Unknown Date";
    }
  };

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

  return (
    <div className="space-y-6 animate-fade-in" id="scan-history-page">
      {/* Header & Stats Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <Clock size={20} className="text-blue-600 dark:text-blue-400" />
            Previous Diagnostic Scans
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Browse and review your local history. Scan records are stored on your device's browser memory only.
          </p>
        </div>

        {history.length > 0 && (
          <button
            onClick={onClearHistory}
            className="text-xs font-semibold text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30 py-2 px-4 rounded-xl border border-red-200 dark:border-red-900/40 flex items-center gap-1.5 transition-all cursor-pointer"
            id="btn-clear-history"
          >
            <Trash2 size={14} />
            Clear All Scans
          </button>
        )}
      </div>

      {history.length === 0 ? (
        /* Empty State */
        <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-3xl p-12 text-center max-w-xl mx-auto" id="history-empty-state">
          <div className="bg-white dark:bg-slate-900 p-4 rounded-full w-14 h-14 flex items-center justify-center shadow-xs border border-slate-100 dark:border-slate-800 mx-auto mb-4 text-slate-400">
            <Clock size={28} />
          </div>
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-200 mb-1">No Scans Recorded Yet</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 max-w-xs mx-auto">
            Once you capture or upload photos for diagnostic analysis, the results will appear here for long-term review.
          </p>
        </div>
      ) : (
        /* History List & Search */
        <div className="space-y-4">
          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search previous scans (e.g. Eczema)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 pl-11 pr-4 text-sm focus:outline-hidden focus:border-slate-400 dark:focus:border-slate-500 focus:ring-1 focus:ring-slate-400 dark:focus:ring-slate-500 transition-all placeholder-slate-400 text-slate-800 dark:text-white"
              id="history-search-input"
            />
          </div>

          {/* List layout */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse" id="history-table">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/40 border-b border-slate-100 dark:border-slate-800 text-3xs font-bold font-mono text-slate-400 uppercase tracking-widest">
                    <th className="py-4 px-6">Date & Time</th>
                    <th className="py-4 px-4">Sample Image</th>
                    <th className="py-4 px-4">Condition</th>
                    <th className="py-4 px-4">Confidence</th>
                    <th className="py-4 px-4">Urgency</th>
                    <th className="py-4 px-6 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredHistory.length > 0 ? (
                    filteredHistory.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                        <td className="py-4 px-6 text-sm text-slate-500 dark:text-slate-400 font-medium whitespace-nowrap">
                          {formatTime(item.timestamp)}
                        </td>
                        <td className="py-4 px-4">
                          <div className="w-12 h-12 rounded-lg overflow-hidden border border-slate-100 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 shadow-xs">
                            <img
                              src={item.imageUrl}
                              alt="Scan sample"
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                        </td>
                        <td className="py-4 px-4 font-semibold text-slate-900 dark:text-slate-100 text-sm">
                          {item.condition}
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-sm font-mono text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-md border border-slate-200 dark:border-slate-700">
                            {Math.round(item.confidence * 100)}%
                          </span>
                        </td>
                        <td className="py-4 px-4 whitespace-nowrap">
                          <span className={`text-2xs font-bold uppercase tracking-wide border px-2.5 py-1 rounded-full ${getUrgencyBadge(item.urgency)}`}>
                            {item.urgency || "low"}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <button
                            onClick={() => onSelectItem(item)}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-3.5 rounded-xl inline-flex items-center gap-1 text-xs transition-all active:scale-95 cursor-pointer shadow-xs"
                            id={`btn-view-${item.id}`}
                          >
                            <Eye size={14} />
                            Review Result
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="py-8 text-center text-sm text-slate-400 italic">
                        No previous scans match your search query.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
