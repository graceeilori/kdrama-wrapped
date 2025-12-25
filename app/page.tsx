import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-pink-500 selection:text-white">
      {/* Hero Section */}
      <section className="relative px-6 py-24 md:py-32 flex flex-col items-center justify-center text-center overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-20">
          <div className="absolute top-10 left-10 w-64 h-64 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto space-y-8">
          <div className="inline-block animate-bounce">
            <span className="px-4 py-1.5 rounded-full border border-pink-500/30 bg-pink-500/10 text-pink-300 text-body-sm font-medium tracking-wide uppercase">
              2025 Edition
            </span>
          </div>

          <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-pink-200 to-purple-200">
            K-Dramad <br className="hidden md:block" /> Wrapped
          </h1>

          <p className="text-body-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Relive your year in K-Dramas. Discover your top oppas, most watched genres, and wasted hours in style.
          </p>

          <div className="pt-8 flex flex-col items-center gap-4">
            <Link
              href="/create"
              className="group relative px-8 py-4 bg-white text-black font-bold text-body-lg rounded-full transition-transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-pink-500/30"
            >
              <span className="relative z-10 flex items-center gap-2">
                Generate My Wrapped
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full opacity-0 group-hover:opacity-10 transition-opacity"></div>
            </Link>

            <p className="text-body-sm text-gray-500 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Best experienced on mobile
            </p>
          </div>
        </div>
      </section>

      {/* Feature Micro-Grid */}
      <section className="bg-neutral-900/50 py-24 px-6 border-t border-neutral-800">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="space-y-4 p-6 rounded-2xl bg-neutral-900/50 hover:bg-neutral-800/50 transition-colors border border-white/5">
            <div className="w-12 h-12 bg-pink-500/10 rounded-xl flex items-center justify-center text-pink-500 mx-auto md:mx-0">
              📺
            </div>
            <h3 className="text-h3 text-white">Watch Stats</h3>
            <p className="text-body-md text-gray-400 leading-relaxed">Detailed breakdown of total hours, episodes, and number of dramas consumed.</p>
          </div>
          <div className="space-y-4 p-6 rounded-2xl bg-neutral-900/50 hover:bg-neutral-800/50 transition-colors border border-white/5">
            <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-500 mx-auto md:mx-0">
              🎭
            </div>
            <h3 className="text-h3 text-white">Genre Analysis</h3>
            <p className="text-body-md text-gray-400 leading-relaxed">Are you a Rom-Com lover or a Thriller seeker? See your genre distribution.</p>
          </div>
          <div className="space-y-4 p-6 rounded-2xl bg-neutral-900/50 hover:bg-neutral-800/50 transition-colors border border-white/5">
            <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500 mx-auto md:mx-0">
              💌
            </div>
            <h3 className="text-h3 text-white">Shareable Cards</h3>
            <p className="text-body-md text-gray-400 leading-relaxed">Beautifully generated Instagram-story ready cards to flex your KDrama addiction.</p>
          </div>
        </div>
      </section>

      <footer className="bg-black py-8 text-center text-gray-600 text-sm border-t border-white/5">
        <p>&copy; 2025 K-Drama Wrapped. Not affiliated with any streaming service.</p>
      </footer>
    </main>
  );
}