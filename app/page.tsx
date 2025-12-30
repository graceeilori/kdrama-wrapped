import Link from 'next/link';
import Image from 'next/image';
import PrimaryButton from '@/components/PrimaryButton';
import FeatureCard from '@/components/FeatureCard';

export default function Home() {
  return (
    <main className="min-h-screen bg-bg-primary text-text-primary selection:bg-secondary-10 selection:text-primary overflow-x-hidden relative">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <Image
          src="/assets/heart-frag50.svg"
          alt=""
          width={60}
          height={60}
          className="absolute top-[1%] right-[1%] blur-[0.5px] md:absolute md:top-[5%] md:right-[5%] md:w-[120px] md:h-[120px]"
        />
        <Image
          src="/assets/star-sec10.svg"
          alt=""
          width={60}
          height={60}
          className="absolute top-[28%] left-[8%] blur-[0.5px] md:absolute md:top-[50%] md:left-[5%] md:right-[10%] md:w-[120px] md:h-[120px]"
        />
        <Image
          src="/assets/spiral-p30.svg"
          alt=""
          width={60}
          height={60}
          className="absolute bottom-[14%] right-[5%] blur-[0.5px] md:absolute md:bottom-[12%] md:right-[10%] md:w-[120px] md:h-[120px]"
        />
        <Image
          src="/assets/landing-sparkle.svg"
          alt=""
          width={32}
          height={32}
          className="absolute top-[6%] right-[15%] md:absolute md:top-[15%] md:right-[28%] md:w-[64px] md:h-[64px] animate-spin-slow"
        />
        <Image
          src="/assets/landing-celebrate.svg"
          alt=""
          width={28}
          height={28}
          className="absolute top-[18%] left-[12%] md:absolute md:top-[38%] md:left-[30%] md:w-[56px] md:h-[56px]"
        />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 px-6 py-8 md:py-48 flex flex-col items-center justify-center text-center">
        <div className="flex flex-col items-center">

          <div className="flex flex-col items-center">
            <div className="badge-handwritten">
              <div className="badge-handwritten-text">2025 Edition</div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center">
            <h1 className="font-heading text-6xl md:text-8xl lg:text-9xl font-black tracking-tight leading-[0.9] text-text-primary">
              K-Drama<br />
              Wrapped
            </h1>
            <p className="font-sans text-vibe-130 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed mt-6">
              Relive your year in K-Drama. Discover your top genres and <br className="hidden md:block" />
              watch hours.
            </p>
          </div>
        </div>

        <div className="pt-10 flex flex-col items-center gap-4">
          <PrimaryButton href="/create">
            Generate Your Wrapped
          </PrimaryButton>

          <div className="flex items-center justify-center gap-2 text-sm text-gray-500 font-sans">
            <Image src="/assets/circle-note.svg" alt="" width={10} height={10} />
            <span>Best experienced on mobile</span>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="py-2 px-6 relative z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Watch Stats*/}
          <FeatureCard
            title="Watch Stats"
            description="Get your total hours, episodes, and number of dramas consumed."
            iconSrc="/assets/tv-white.svg"
            className="bg-primary-10 hover:rotate-[-1deg] animate-float md:animate-none"
            iconBgClass="bg-vibe-50"
          />

          {/* Genre Analysis*/}
          <FeatureCard
            title="Genre Analysis"
            description="Get your top genres and find out what you gravitated towards."
            iconSrc="/assets/pie-white.svg"
            className="bg-vibe-90 hover:rotate-[1deg] animate-float md:animate-none"
            iconBgClass="bg-vibe-80"
          />

          {/* Shareable Cards*/}
          <FeatureCard
            title="Shareable Cards"
            description="Download and share the summary of your year in dramas."
            iconSrc="/assets/cards-white.svg"
            className="bg-vibe-30 hover:rotate-[-1deg] animate-float md:animate-none"
            iconBgClass="bg-vibe-20"
          />
        </div>
      </section>

      <footer className="py-16 text-center">
        <div className="flex items-center justify-center gap-2 font-accent text-lg text-text-primary mb-4">
          <span>Made with 💜 by a Fan for Fans</span>
        </div>

        <p className="text-xs text-gray-500 font-sans mb-4">
          This product uses the TMDB API but is not endorsed or certified by TMDB.
        </p>

        <div className="flex items-center justify-center gap-4 text-sm text-gray-600 font-sans underline decoration-gray-300 underline-offset-4">
          <Link href="#" className="hover:text-black hidden">Linktree</Link>
          <Image hidden src="/assets/circle-footer.svg" alt="" width={8} height={8} />
          <Link href="https://ko-fi.com/kdramawrapped" target="_blank" className="hover:text-black">Support Creator</Link>
          <Image src="/assets/circle-footer.svg" alt="" width={8} height={8} />
          <Link href="mailto:kdramawrapped@gmail.com" className="hover:text-black">Report a Bug</Link>
        </div>
      </footer>
    </main>
  );
}