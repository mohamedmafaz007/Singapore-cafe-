import { CupSoda } from 'lucide-react';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/40 border-b border-white/5 py-4 px-6 md:px-12 flex items-center justify-between backdrop-blur-sm">
      <div
        className="flex items-center gap-3 cursor-pointer group"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-accent flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform relative overflow-hidden">
          <img
            src="/images/logo.png"
            alt="Tea Shop Logo"
            className="w-full h-full object-cover scale-150"
          />
        </div>
        <h1 className="font-display text-xl md:text-2xl font-black text-white leading-none tracking-tight">
          TEA <span className="text-accent">SHOP</span>
        </h1>
      </div>

      <nav className="hidden md:flex items-center gap-10">
        {['Home', 'Hot Drinks', 'Cold Drinks'].map((item) => (
          <button
            key={item}
            onClick={() => {
              if (item === 'Home') window.scrollTo({ top: 0, behavior: 'smooth' });
              else {
                const id = item.toLowerCase().replace(' ', '-');
                document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="text-xs font-bold uppercase tracking-widest text-white/70 hover:text-accent transition-colors"
          >
            {item}
          </button>
        ))}
      </nav>

      <button
        onClick={() => document.getElementById('hot-drinks')?.scrollIntoView({ behavior: 'smooth' })}
        className="bg-accent hover:bg-accent/90 text-white px-6 md:px-8 py-2.5 md:py-3 rounded-xl text-xs md:text-sm font-black shadow-lg transition-all active:scale-95"
      >
        ORDER NOW
      </button>
    </header>
  );
};

export default Header;
