import React, { useState, useRef } from "react";
import { Upload, Image as ImageIcon, AlertCircle } from "lucide-react";

export default function UploadZone({ onImageSelected }) {
  const [isDragActive, setIsDragActive] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleFile = (file) => {
    if (!file) return;

    // Validate type
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file (PNG, JPG, or WEBP).");
      return;
    }

    // Validate size (max 8MB for efficient base64 parsing)
    if (file.size > 8 * 1024 * 1024) {
      setError("Image file is too large. Please upload an image under 8MB.");
      return;
    }

    setError(null);
    const reader = new FileReader();
    reader.onload = (e) => {
      onImageSelected(e.target.result);
    };
    reader.onerror = () => {
      setError("Error reading file. Please try another image.");
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const triggerInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="w-full" id="upload-zone-container">
      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={triggerInput}
        className={`relative border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center cursor-pointer transition-all duration-200 group flex flex-col items-center justify-center ${
          isDragActive
            ? "border-blue-500 bg-blue-50/50 dark:bg-blue-950/30 scale-[1.01]"
            : "border-slate-200 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500 bg-slate-50/50 dark:bg-slate-800/10 hover:bg-slate-50 dark:hover:bg-slate-800/30"
        }`}
        id="drag-drop-area"
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleInputChange}
          id="hidden-file-input"
        />

        <div className="bg-white dark:bg-slate-900 p-4 rounded-full shadow-xs border border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors group-hover:scale-110 duration-200">
          <Upload size={32} />
        </div>

        <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200 mb-1">
          Drag & drop your skin photo here
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 max-w-xs mx-auto">
          or <span className="text-blue-600 dark:text-blue-400 font-medium group-hover:underline">browse files</span> from your computer or camera roll
        </p>

        <div className="flex items-center gap-4 text-xs font-mono text-slate-400 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-lg py-1.5 px-3">
          <span>MAX SIZE: 8MB</span>
          <span className="w-1.5 h-1.5 bg-slate-300 dark:bg-slate-700 rounded-full"></span>
          <span>FORMATS: JPG, PNG, WEBP</span>
        </div>
      </div>

      {error && (
        <div className="mt-4 flex items-center gap-2 text-red-700 bg-red-50 border border-red-100 rounded-xl p-3.5 text-sm animate-fade-in" id="upload-error">
          <AlertCircle size={18} className="shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
