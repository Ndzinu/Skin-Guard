import React, { useState } from "react";
import { ShieldAlert, Activity, BookOpen, Clock, HeartHandshake, Menu, X, Sun, Moon, Info, Mail } from "lucide-react";

export default function Header({ activeTab, setActiveTab, theme, setTheme }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const navItems = [
    { id: "screener", label: "Screener", icon: <Activity size={16} /> },
    { id: "support", label: "Support", icon: <HeartHandshake size={16} /> },
    { id: "history", label: "History", icon: <Clock size={16} /> },
    { id: "library", label: "Disease Library", icon: <BookOpen size={16} /> }
  ];

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 sticky top-0 z-50 shadow-xs transition-colors duration-300" id="app-header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo & Branding */}
          <div className="flex items-center space-x-2.5">
            <span className="text-2xl select-none" role="img" aria-label="stethoscope">🩺</span>
            <div>
              <h1 className="text-lg sm:text-xl font-sora font-extrabold tracking-tight bg-linear-to-r from-blue-600 to-slate-900 dark:from-blue-400 dark:to-white bg-clip-text text-transparent leading-none">
                Skin Guard
              </h1>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wide mt-0.5 leading-none">
                AI Skin Disease Detection
              </p>
            </div>
          </div>

          {/* Desktop Navigation & Utilities */}
          <div className="hidden lg:flex items-center space-x-6">
            <nav className="flex space-x-1" aria-label="Tabs">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                    activeTab === item.id
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                  }`}
                  id={`tab-${item.id}`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer border border-slate-100 dark:border-slate-800"
              title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
            >
              {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
            </button>
          </div>

          {/* Mobile hamburger menu & theme toggle */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
            >
              {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-hidden cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-4 space-y-2 animate-fade-in shadow-lg">
          <nav className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === item.id
                    ? "bg-blue-600 text-white"
                    : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      )}

      {/* Security & Privacy Floating Ribbon */}
      <div className="bg-blue-700 text-white text-xs py-2 px-4 text-center font-medium shadow-inner flex items-center justify-center gap-2">
        <HeartHandshake size={14} className="shrink-0" />
        <span>
          <strong>Privacy Guaranteed:</strong> Images are processed entirely in-browser and immediately discarded. No photos are stored on any server.
        </span>
      </div>
    </header>
  );
}

