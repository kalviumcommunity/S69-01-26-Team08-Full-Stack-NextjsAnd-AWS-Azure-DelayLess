// app/page.tsx — Light Theme, Elegant & Cool Design

import { Clock, AlertTriangle, Bell, MapPin } from 'lucide-react'; // keep if installed, remove if not

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
      <main className="mx-auto max-w-6xl px-5 py-12 md:py-20 lg:py-24">
        {/* Hero Section */}
        <div className="text-center mb-16 md:mb-20">
          {/* Live badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-green-100 px-5 py-2 text-sm font-medium text-green-700 border border-green-200 mb-6">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            Live Intelligence Active
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 tracking-tight">
            Know delays <span className="text-amber-600">before</span> they happen.
          </h1>

          <p className="mt-6 text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto">
            Real-time transport intelligence powered by AI — plan smarter, travel calmer.
          </p>

          {/* Search bar */}
          <div className="mt-10 max-w-3xl mx-auto">
            <div className="relative group">
              <div className="absolute inset-0 rounded-2xl bg-amber-100/30 blur-xl opacity-0 group-focus-within:opacity-70 group-hover:opacity-70 transition-all duration-500"></div>
              
              <div className="relative flex items-center bg-white border border-gray-200 rounded-2xl shadow-md overflow-hidden focus-within:ring-2 focus-within:ring-amber-300/50 focus-within:border-amber-400 transition-all">
                <input
                  type="text"
                  placeholder="Enter Train / Bus / Flight number"
                  className="flex-1 px-6 py-5 text-lg text-gray-800 placeholder:text-gray-400 outline-none bg-transparent"
                />
                <button className="
                  px-8 py-5 bg-gradient-to-r from-amber-600 to-amber-500 
                  hover:from-amber-500 hover:to-amber-400 
                  text-white font-medium shadow-md hover:shadow-lg
                  transition-all active:scale-98
                ">
                  Check Delay
                </button>
              </div>

              {/* Features */}
              <div className="mt-8 flex flex-wrap justify-center gap-x-10 gap-y-4 text-sm md:text-base">
                <div className="flex items-center gap-2 text-green-700">
                  <Clock size={18} className="text-green-600" />
                  Real-time updates
                </div>
                <div className="flex items-center gap-2 text-amber-700">
                  <AlertTriangle size={18} className="text-amber-600" />
                  AI predictions
                </div>
                <div className="flex items-center gap-2 text-blue-700">
                  <Bell size={18} className="text-blue-600" />
                  Smart alerts
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Status Card */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden">
            {/* Card header */}
            <div className="bg-gradient-to-r from-gray-50 to-white px-8 py-6 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-700 text-2xl shadow-sm">
                    🚆
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                      Train 12627 — Live Status
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">Updated 2 min ago</p>
                  </div>
                </div>

                <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-5 py-2 text-sm font-medium text-amber-800 border border-amber-200">
                  <span className="relative flex h-3 w-3">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative rounded-full h-3 w-3 bg-amber-500"></span>
                  </span>
                  Delayed 18 min
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="p-8 md:p-10 space-y-8 relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-4 bottom-4 w-px bg-gradient-to-b from-green-400 via-amber-400 to-gray-300"></div>

              {/* Stations */}
              <div className="relative flex items-start gap-6">
                <div className="z-10 flex h-14 w-14 items-center justify-center rounded-full border-4 border-white bg-green-100 shadow-sm">
                  <div className="h-6 w-6 rounded-full bg-green-500"></div>
                </div>
                <div className="pt-2">
                  <h4 className="font-semibold text-gray-900 text-lg">Station A</h4>
                  <p className="text-green-700 font-medium">On time</p>
                </div>
              </div>

              <div className="relative flex items-start gap-6">
                <div className="z-10 flex h-14 w-14 items-center justify-center rounded-full border-4 border-white bg-amber-100 shadow-sm">
                  <div className="h-6 w-6 rounded-full bg-amber-500"></div>
                </div>
                <div className="pt-2">
                  <h4 className="font-semibold text-gray-900 text-lg">Station B</h4>
                  <p className="text-amber-700 font-medium">Delayed • +18 min</p>
                </div>
              </div>

              <div className="relative flex items-start gap-6">
                <div className="z-10 flex h-14 w-14 items-center justify-center rounded-full border-4 border-white bg-gray-100 shadow-sm">
                  <div className="h-6 w-6 rounded-full bg-gray-500"></div>
                </div>
                <div className="pt-2">
                  <h4 className="font-semibold text-gray-900 text-lg">Station C</h4>
                  <p className="text-gray-600 font-medium">ETA pending • +18 min predicted</p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-8 py-6 bg-gray-50 border-t border-gray-200 text-center text-sm text-gray-500">
              © 2026 Delayloadess • Built for stress-free travel
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}