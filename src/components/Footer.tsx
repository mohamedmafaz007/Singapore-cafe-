import { CupSoda, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative py-16 mt-20 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div
              className="flex items-center gap-2 cursor-pointer group"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <CupSoda className="w-8 h-8 text-accent group-hover:rotate-12 transition-transform" />
              <span className="font-display text-2xl font-bold text-primary">TEA SHOP</span>
            </div>
            <p className="text-muted-foreground text-sm max-w-xs text-center md:text-left">
              Serving the finest hot and cold beverages crafted with premium ingredients and passion.
            </p>
          </div>

          <div className="flex flex-col items-center gap-6">
            <div className="flex items-center gap-6">
              <a href="#" className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-accent hover:bg-accent hover:text-white transition-all duration-300">
                <span className="text-lg">f</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-accent hover:bg-accent hover:text-white transition-all duration-300">
                <span className="text-lg">t</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-accent hover:bg-accent hover:text-white transition-all duration-300">
                <span className="text-lg">ig</span>
              </a>
            </div>
            <p className="text-muted-foreground text-sm flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-red-500 fill-current animate-pulse" /> for coffee lovers
            </p>
          </div>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-14 h-14 rounded-full glass-card flex items-center justify-center text-accent hover:bg-accent hover:text-white transition-all duration-300 shadow-lg group"
          >
            <span className="text-2xl group-hover:-translate-y-1 transition-transform">↑</span>
          </button>
        </div>

        <div className="mt-16 pt-8 border-t border-accent/10 text-center">
          <p className="text-muted-foreground text-xs opacity-60">
            © 2026 Tea Shop. All rights reserved. Designed with excellence.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
