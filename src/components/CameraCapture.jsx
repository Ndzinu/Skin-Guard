import React, { useState, useRef, useEffect } from "react";
import { Camera, RefreshCw, X, AlertCircle } from "lucide-react";

export default function CameraCapture({ onImageCaptured, onClose }) {
  const [stream, setStream] = useState(null);
  const [error, setError] = useState(null);
  const [facingMode, setFacingMode] = useState("user"); // "user" or "environment"
  const [hasMultipleCameras, setHasMultipleCameras] = useState(false);
  const [loading, setLoading] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    // Check if multiple cameras exist
    navigator.mediaDevices?.enumerateDevices()
      .then((devices) => {
        const videoDevices = devices.filter((d) => d.kind === "videoinput");
        setHasMultipleCameras(videoDevices.length > 1);
      })
      .catch((e) => console.log("Device listing error:", e));
  }, []);

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, [facingMode]);

  const startCamera = async () => {
    setLoading(true);
    setError(null);
    stopCamera();

    try {
      const constraints = {
        video: {
          facingMode: facingMode,
          width: { ideal: 1080 },
          height: { ideal: 1080 },
          aspectRatio: { ideal: 1 }
        },
        audio: false
      };

      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error("Camera access error:", err);
      setError("Unable to access your camera. Please ensure permissions are granted in your browser settings.");
    } finally {
      setLoading(false);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  const toggleCameraFacing = () => {
    setFacingMode((prev) => (prev === "user" ? "environment" : "user"));
  };

  const captureFrame = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      // Draw square aspect ratio from center of video stream
      const size = Math.min(video.videoWidth, video.videoHeight);
      const startX = (video.videoWidth - size) / 2;
      const startY = (video.videoHeight - size) / 2;

      canvas.width = 640;
      canvas.height = 640;

      // Draw onto canvas
      context.drawImage(video, startX, startY, size, size, 0, 0, 640, 640);

      // Get DataURL
      const base64Image = canvas.toDataURL("image/jpeg", 0.9);
      stopCamera();
      onImageCaptured(base64Image);
    }
  };

  return (
    <div className="bg-slate-900 rounded-2xl overflow-hidden p-6 relative shadow-2xl border border-slate-800 text-white" id="camera-capture-container">
      {/* Top Banner */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Camera size={18} className="text-blue-400" />
          <span className="text-sm font-semibold tracking-wide uppercase">Live Camera Capture</span>
        </div>
        <button
          onClick={() => {
            stopCamera();
            onClose();
          }}
          className="text-slate-400 hover:text-white hover:bg-slate-800 p-1.5 rounded-lg transition-colors"
          title="Close Camera"
        >
          <X size={20} />
        </button>
      </div>

      {/* Video Preview viewport */}
      <div className="relative aspect-square bg-black rounded-xl overflow-hidden border border-slate-800 flex items-center justify-center">
        {loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/80 z-10">
            <RefreshCw size={32} className="animate-spin text-blue-400 mb-2" />
            <p className="text-sm font-mono text-slate-400">Initializing Camera Stream...</p>
          </div>
        )}

        {error ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
            <AlertCircle size={40} className="text-red-400 mb-3" />
            <p className="text-sm font-medium mb-4">{error}</p>
            <button
              onClick={startCamera}
              className="bg-blue-600 text-white font-medium py-2 px-4 rounded-xl text-xs hover:bg-blue-500 transition-colors"
            >
              Retry Camera Connection
            </button>
          </div>
        ) : (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className={`w-full h-full object-cover ${facingMode === "user" ? "scale-x-[-1]" : ""}`}
            id="video-view"
          />
        )}

        <canvas ref={canvasRef} className="hidden" />
      </div>

      {/* Controls */}
      <div className="mt-6 flex justify-center items-center gap-6">
        {hasMultipleCameras && stream && !error && (
          <button
            onClick={toggleCameraFacing}
            className="bg-slate-800 text-slate-200 hover:text-white hover:bg-slate-700 p-3 rounded-full transition-all border border-slate-700 hover:scale-105"
            title="Switch Front/Back Camera"
          >
            <RefreshCw size={20} />
          </button>
        )}

        {stream && !error && (
          <button
            onClick={captureFrame}
            className="bg-blue-600 hover:bg-blue-500 text-white p-4 rounded-full transition-all flex items-center gap-2 font-semibold shadow-lg shadow-blue-600/20 active:scale-95 scale-110"
            title="Capture Photo"
          >
            <Camera size={26} />
          </button>
        )}
      </div>

      {/* Helper guide */}
      <div className="text-center mt-4">
        <p className="text-2xs font-mono text-slate-400 max-w-xs mx-auto">
          Position the skin condition in the center of the frame and keep it steady. Ensure bright, direct lighting for ideal diagnostic results.
        </p>
      </div>
    </div>
  );
}
