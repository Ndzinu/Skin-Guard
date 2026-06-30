import React, { useState } from "react";
import { Shield, Sparkles, HeartPulse, BrainCircuit, Activity, Heart, Info, Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle } from "lucide-react";

export default function Support() {
  // Contact Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setError("Please fill out all fields before submitting.");
      return;
    }
    setError("");
    setLoading(true);

    // Simulate sending message
    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1200);
  };

  return (
    <div className="space-y-12 animate-fade-in" id="support-page">
      {/* Hero Header Banner */}
      <div className="bg-linear-to-r from-blue-600 via-blue-800 to-slate-950 text-white rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent opacity-60"></div>
        <div className="relative z-10 max-w-3xl space-y-4">
          <span className="bg-blue-500/20 text-blue-200 border border-blue-400/30 text-2xs uppercase tracking-widest px-3 py-1 rounded-full font-mono font-bold">
            Support, Mission & Inquiry Hub
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">How can we assist you?</h2>
          <p className="text-sm md:text-base text-blue-100 leading-relaxed max-w-2xl">
            Skin Guard is an advanced dermatological awareness and screening initiative. Learn about our local-first privacy architecture, review academic goals, or directly contact our research developers.
          </p>
        </div>
      </div>

      {/* Grid: Mission, Story & Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Mission block */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-8 shadow-xs space-y-4">
          <div className="bg-blue-50 dark:bg-blue-950/40 p-3 rounded-2xl w-12 h-12 flex items-center justify-center text-blue-600 dark:text-blue-400">
            <HeartPulse size={24} />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white font-sora">Our Mission & Purpose</h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Dermatological skin health is often overlooked due to high professional diagnosis costs, long clinical waitlists, or restricted access to qualified specialists. Our mission is to democratize skin health awareness. By leveraging fully private, in-browser machine learning models, we make preliminary skin screenings instantly accessible to anyone, anywhere, completely free.
          </p>
        </div>

        {/* Why Skin Guard was developed */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-8 shadow-xs space-y-4">
          <div className="bg-blue-50 dark:bg-blue-950/40 p-3 rounded-2xl w-12 h-12 flex items-center justify-center text-blue-600 dark:text-blue-400">
            <Shield size={24} />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white font-sora">Why Skin Guard Was Developed</h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Early detection is a primary success factor in treating malignancies such as melanoma. Skin Guard provides an approachable and educational user interface that serves as an initial check, helping motivate individuals to schedule professional dermatologist check-ups sooner than they otherwise might.
          </p>
        </div>
      </div>

      {/* Benefits section */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-8 shadow-xs space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white font-sora">Benefits of Skin Guard AI</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            A secure, immediate, and accessible first check for your skin concerns
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100/80 dark:border-slate-800/40 space-y-3">
            <div className="text-blue-600 dark:text-blue-400 font-bold text-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400"></span>
              Immediate Awareness
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Provides detailed probability matching against 11 primary skin condition types in under 3 seconds.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100/80 dark:border-slate-800/40 space-y-3">
            <div className="text-blue-600 dark:text-blue-400 font-bold text-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400"></span>
              Absolute Local Privacy
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              All machine learning analysis executes on your device. Image details never leave your device's browser memory.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100/80 dark:border-slate-800/40 space-y-3">
            <div className="text-blue-600 dark:text-blue-400 font-bold text-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400"></span>
              Pre-Consultation Education
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Equips you with clean clinical definitions, care resources, and severity metrics to support clinical doctor visits.
            </p>
          </div>
        </div>
      </div>

      {/* Technology Stack block */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-blue-50 dark:bg-blue-950/40 p-3 rounded-2xl w-12 h-12 flex items-center justify-center text-blue-600 dark:text-blue-400">
            <BrainCircuit size={24} />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white font-sora">Technological Stack</h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Skin Guard leverages modern hardware-accelerated deep learning algorithms directly within browser runtimes to maximize speed and data safety.
          </p>
        </div>

        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-6 shadow-xs grid grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-slate-50 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white font-mono uppercase"></h4>
            <p className="text-3xs text-slate-500 dark:text-slate-400 mt-1 leading-normal">
              High-fidelity hosted deep learning model providing instant local skin classification indicators.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-slate-50 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white font-mono uppercase"></h4>
            <p className="text-3xs text-slate-500 dark:text-slate-400 mt-1 leading-normal">
              Hardware-accelerated neural network calculation engine running locally inside standard views.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-slate-50 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white font-mono uppercase"></h4>
            <p className="text-3xs text-slate-500 dark:text-slate-400 mt-1 leading-normal">
              Fast, reactive responsive design enabling smooth tab transitions and instant layout responsiveness.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-slate-50 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white font-mono uppercase"></h4>
            <p className="text-3xs text-slate-500 dark:text-slate-400 mt-1 leading-normal">
              Local Storage architecture persisting complete scan logs without external databases or cookie tracking.
            </p>
          </div>
        </div>
      </div>

      {/* Strict Medical Disclaimer Card */}
      <div className="bg-red-50 dark:bg-red-950/20 border-l-4 border-red-500 p-6 rounded-r-2xl flex gap-4 shadow-xs" id="support-disclaimer">
        <Info className="text-red-500 shrink-0 mt-0.5" size={24} />
        <div>
          <h4 className="text-sm font-bold text-red-950 dark:text-red-200 uppercase tracking-wide">
            IMPORTANT CLINICAL DISCLAIMER
          </h4>
          <p className="text-xs text-red-800 dark:text-red-300 leading-relaxed mt-1.5">
            Skin Guard is designed strictly as an educational screening system. It is <strong>NOT</strong> a replacement for professional clinical dermatologist diagnosis, physical tissue biopsies, or customized medical treatments. Machine learning estimations are based on superficial visual pixels and cannot isolate systemic physiological factors. Always consult a licensed primary care provider or certified board-certified dermatologist for medical decisions.
          </p>
        </div>
      </div>

      {/* Contact Section & Info Cards */}
      <div className="border-t border-slate-100 dark:border-slate-800 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-8 shadow-xs space-y-8">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white font-sora">Contact Information</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                  Have questions about the algorithm, academic publication data, or want to contribute to our training checkpoints? Get in touch.
                </p>
              </div>

              <div className="space-y-6">
                {/* Email card */}
                <div className="flex gap-4 items-start">
                  <div className="bg-blue-50 dark:bg-blue-950/40 p-3 rounded-xl text-blue-600 dark:text-blue-400 shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Email Address</h4>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white mt-1">georgendzinu@gmail.com</p>
                    <p className="text-3xs text-slate-500 mt-0.5">Average response: Under 24 hours</p>
                  </div>
                </div>

                {/* Phone card */}
                <div className="flex gap-4 items-start">
                  <div className="bg-blue-50 dark:bg-blue-950/40 p-3 rounded-xl text-blue-600 dark:text-blue-400 shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Phone Support</h4>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white mt-1">0548631370
                    </p>
                    <p className="text-3xs text-slate-500 mt-0.5">Mon - Fri • 9:00 AM - 5:00 PM PST</p>
                  </div>
                </div>

                {/* Location card */}
                <div className="flex gap-4 items-start">
                  <div className="bg-blue-50 dark:bg-blue-950/40 p-3 rounded-xl text-blue-600 dark:text-blue-400 shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Research Division</h4>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white mt-1">Kwame Nkrumah university of Science and technology</p>
                    <p className="text-xs text-slate-500 mt-0.5">Kumasi, Ghana</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 p-6 rounded-2xl text-xs text-slate-500 dark:text-slate-400 leading-relaxed uppercase tracking-wide">
              Clinical research teams or hospital diagnostic institutions interested in testing or extending our Teachable Machine checkpoints with pre-classified dermatological samples are encouraged to leave their academic coordinates.
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-8 shadow-xs">
            {isSubmitted ? (
              <div className="text-center py-12 space-y-6 animate-fade-in" id="contact-success-view">
                <div className="bg-blue-50 dark:bg-blue-950/40 p-5 rounded-full w-20 h-20 flex items-center justify-center text-blue-600 dark:text-blue-400 mx-auto">
                  <CheckCircle2 size={44} className="animate-bounce" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white font-sora">Message Dispatched</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                    Thank you! Your support inquiry has been successfully sent. Our machine learning research staff will review your request and correspond shortly.
                  </p>
                </div>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-6 rounded-xl text-xs transition-colors cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6" id="contact-form">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 font-sora">
                    <Sparkles className="text-blue-500 animate-pulse" size={18} />
                    Inquiry Form
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Please provide your inquiry details below. We prioritize academic cooperation and support inquiries.
                  </p>
                </div>

                {error && (
                  <div className="flex items-center gap-2 text-red-700 bg-red-50 dark:bg-red-950/20 dark:text-red-300 border border-red-100 dark:border-red-900/50 rounded-xl p-3 text-xs animate-fade-in">
                    <AlertCircle size={16} className="shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name Input */}
                  <div className="space-y-1">
                    <label htmlFor="contact-name" className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="contact-name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Jane Doe"
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-2.5 px-4 text-xs focus:outline-hidden focus:border-blue-500 transition-colors text-slate-800 dark:text-white"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="space-y-1">
                    <label htmlFor="contact-email" className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="contact-email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="jane@example.com"
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-2.5 px-4 text-xs focus:outline-hidden focus:border-blue-500 transition-colors text-slate-800 dark:text-white"
                    />
                  </div>
                </div>

                {/* Subject Input */}
                <div className="space-y-1">
                  <label htmlFor="contact-subject" className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="contact-subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Algorithm collaboration / General Support"
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-2.5 px-4 text-xs focus:outline-hidden focus:border-blue-500 transition-colors text-slate-800 dark:text-white"
                  />
                </div>

                {/* Message Textarea */}
                <div className="space-y-1">
                  <label htmlFor="contact-message" className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Message Body
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write details of your feedback or inquiry here..."
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-2.5 px-4 text-xs focus:outline-hidden focus:border-blue-500 transition-colors text-slate-800 dark:text-white resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl text-xs flex items-center justify-center gap-2 transition-all active:scale-98 shadow-md hover:shadow-blue-500/10 cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Dispatching Message...
                    </>
                  ) : (
                    <>
                      <Send size={14} />
                      Send Support Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
