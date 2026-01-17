import { Coffee, Snowflake } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center pt-20 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-40 right-1/4 w-48 h-48 bg-caramel/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-5xl mx-auto animate-fade-up">
          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-black text-white mb-8 leading-[0.85] tracking-tighter">
            THE ART OF
            <br />
            <span className="text-gradient filter drop-shadow-2xl">PERFECT BREW</span>
          </h1>

          <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-14 leading-relaxed font-medium">
            Savor the rich heritage of authentic flavors. From hand-crafted
            <span className="text-accent font-bold"> Hot Classics</span> to refreshing
            <span className="text-cyan-400 font-bold"> Ice Delights</span>.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-8">
            <button
              onClick={() => document.getElementById('hot-drinks')?.scrollIntoView({ behavior: 'smooth' })}
              className="group relative px-10 py-6 bg-accent text-white rounded-3xl font-black text-xl shadow-[0_20px_40px_-15px_rgba(var(--accent),0.5)] hover:bg-accent/90 transition-all duration-300 hover:-translate-y-2 active:scale-95 border border-white/10"
            >
              <div className="flex items-center gap-4">
                <span>ORDER HOT</span>
                <span className="text-3xl inline-block group-hover:rotate-12 transition-transform">☕</span>
              </div>
            </button>
            <button
              onClick={() => document.getElementById('cold-drinks')?.scrollIntoView({ behavior: 'smooth' })}
              className="group relative px-10 py-6 bg-gradient-to-tr from-cyan-600 to-blue-400 text-white rounded-3xl font-black text-xl shadow-[0_20px_40px_-15px_rgba(6,182,212,0.5)] hover:from-cyan-500 hover:to-blue-300 transition-all duration-300 hover:-translate-y-2 active:scale-95 border border-white/10"
            >
              <div className="flex items-center gap-4">
                <span>ORDER COLD</span>
                <span className="text-3xl inline-block group-hover:rotate-[-12deg] transition-transform">🧊</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-accent rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
