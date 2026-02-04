// app/report/page.tsx — Light Theme with Elegant Design Touches

"use client";

import { useState } from "react";

export default function ReportForm() {
  const [issue, setIssue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!issue.trim()) return;

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    console.log("Report submitted:", issue);
    
    setIsSubmitting(false);
    setSubmitted(true);
    setIssue("");
    
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
      <main className="mx-auto max-w-3xl px-5 py-12 md:py-20">
        {/* Header with subtle gradient underline */}
        <div className="text-center mb-12 relative">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
            Report a Delay
          </h1>
          <div className="mt-3 h-1 w-24 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto rounded-full"></div>
          <p className="mt-4 text-gray-600 text-lg max-w-2xl mx-auto">
            Help us keep the platform accurate — your observation matters.
          </p>
        </div>

        {/* Form card with layered depth */}
        <div className="relative">
          {/* Soft background glow layer */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-50/40 to-transparent rounded-3xl blur-xl opacity-70 -z-10"></div>
          
          <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden relative z-10">
            {submitted ? (
              <div className="py-16 px-10 text-center">
                <div className="mx-auto mb-6 relative">
                  <div className="absolute inset-0 bg-amber-100 rounded-full blur-xl opacity-60 animate-pulse-slow"></div>
                  <div className="relative h-20 w-20 mx-auto flex items-center justify-center rounded-full bg-gradient-to-br from-amber-100 to-amber-50 text-amber-700 text-5xl shadow-md">
                    ✓
                  </div>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                  Report Received
                </h2>
                <p className="text-gray-600 text-lg max-w-md mx-auto">
                  Thank you — we've added your insight to help improve real-time accuracy.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-8">
                <div>
                  <label 
                    htmlFor="issue" 
                    className="block text-lg font-semibold text-gray-800 mb-3"
                  >
                    Describe what happened
                  </label>
                  <div className="relative">
                    <textarea
                      id="issue"
                      rows={7}
                      className="
                        w-full rounded-2xl border border-gray-200 
                        px-6 py-5 text-gray-800 placeholder:text-gray-400 
                        focus:border-amber-500 focus:ring-4 focus:ring-amber-200/40 
                        focus:outline-none transition-all resize-none
                        text-base md:text-lg leading-relaxed
                        shadow-inner bg-white/80 backdrop-blur-sm
                      "
                      placeholder="Train number, location, approximate delay time, reason if known... Your details help us a lot."
                      value={issue}
                      onChange={(e) => setIssue(e.target.value)}
                      disabled={isSubmitting}
                    />
                    <div className="absolute bottom-3 right-4 text-xs text-gray-400">
                      {issue.length} / 500
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6">
                  <p className="text-sm text-gray-500">
                    All reports are reviewed within 24 hours
                  </p>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting || !issue.trim()}
                    className="
                      px-10 py-4 rounded-2xl font-semibold text-white text-base md:text-lg
                      bg-gradient-to-r from-amber-600 to-amber-500
                      hover:from-amber-500 hover:to-amber-400
                      disabled:opacity-60 disabled:cursor-not-allowed
                      shadow-lg shadow-amber-300/40 hover:shadow-xl hover:shadow-amber-400/50
                      transition-all duration-300 active:scale-98 flex items-center gap-3
                    "
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                        Sending...
                      </span>
                    ) : (
                      "Submit Report"
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        <p className="mt-12 text-center text-sm text-gray-500">
          © 2026 Delayloadess • Thank you for contributing to better travel information
        </p>
      </main>
    </div>
  );
}