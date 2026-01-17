import { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Drink } from '@/data/drinks';
import DrinkCard from './DrinkCard';

interface DrinkCarouselProps {
  drinks: Drink[];
  title: string;
  subtitle: string;
  icon: string;
  onViewDrink: (drink: Drink) => void;
}

const DrinkCarousel = ({ drinks, title, subtitle, icon, onViewDrink }: DrinkCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [itemsPerView, setItemsPerView] = useState(4);
  const carouselRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  // Responsive items per view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else if (window.innerWidth < 768) {
        setItemsPerView(2);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(3);
      } else {
        setItemsPerView(4);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalItems = drinks.length;
  const maxIndex = Math.max(0, totalItems - itemsPerView);

  const goToNext = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    setTimeout(() => setIsTransitioning(false), 500);
  }, [maxIndex, isTransitioning]);

  const goToPrev = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
    setTimeout(() => setIsTransitioning(false), 500);
  }, [maxIndex, isTransitioning]);

  const goToIndex = useCallback((index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(Math.min(index, maxIndex));
    setTimeout(() => setIsTransitioning(false), 500);
  }, [maxIndex, isTransitioning]);

  // Auto-scroll effect
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(goToNext, 3000);
    return () => clearInterval(interval);
  }, [isPaused, goToNext]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 50;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }
  };

  const getCardStep = () => {
    const gap = 24;
    if (typeof window === 'undefined') return 308;
    if (window.innerWidth < 640) return (window.innerWidth - 48) + gap;
    return 308;
  };

  const getCardWidth = () => {
    if (typeof window === 'undefined') return 284;
    if (window.innerWidth < 640) return window.innerWidth - 48;
    return 284;
  };

  // Generate dot indicators
  const totalDots = Math.ceil(totalItems / Math.max(1, itemsPerView));
  const dots = Array.from({ length: totalDots }, (_, i) => i);
  const activeDotIndex = Math.min(Math.floor(currentIndex / Math.max(1, itemsPerView)), totalDots - 1);

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background Decorative Gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

      {/* Section Header */}
      <div className="container mx-auto px-6 mb-20 text-center">
        <div className="flex flex-col items-center gap-10">
          <div className="animate-fade-up space-y-6 max-w-3xl mx-auto">
            <div className="flex flex-col items-center gap-6">
              <div className="w-20 h-20 rounded-[2rem] bg-white/5 backdrop-blur-xl flex items-center justify-center border border-white/10 shadow-3xl">
                <span className="text-5xl filter drop-shadow-2xl">{icon}</span>
              </div>
              <h2 className="font-display text-5xl md:text-8xl font-black text-white tracking-tighter uppercase leading-[0.85]">
                {title.split(' ')[0]} <br />
                <span className="text-gradient filter drop-shadow-2xl">{title.split(' ')[1]}</span>
              </h2>
            </div>
            <p className="text-white/70 text-xl font-light tracking-wide max-w-2xl mx-auto">
              {subtitle}
            </p>
          </div>

          <div className="flex gap-6">
            <button
              onClick={goToPrev}
              className="w-16 h-16 md:w-20 md:h-20 rounded-3xl glass-card flex items-center justify-center text-white hover:bg-accent hover:border-accent transition-all duration-300 shadow-3xl active:scale-90 border border-white/10 group/btn"
              aria-label="Previous drinks"
            >
              <ChevronLeft className="w-10 h-10 group-hover/btn:-translate-x-1 transition-transform" />
            </button>
            <button
              onClick={goToNext}
              className="w-16 h-16 md:w-20 md:h-20 rounded-3xl glass-card flex items-center justify-center text-white hover:bg-accent hover:border-accent transition-all duration-300 shadow-3xl active:scale-90 border border-white/10 group/btn"
              aria-label="Next drinks"
            >
              <ChevronRight className="w-10 h-10 group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Carousel Container */}
      <div
        className="relative group"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Carousel Track */}
        <div
          ref={carouselRef}
          className="overflow-hidden px-6 lg:px-12"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex transition-transform duration-700 cubic-bezier(0.4, 0, 0.2, 1) py-8 gap-6"
            style={{
              transform: `translateX(-${currentIndex * getCardStep()}px)`
            }}
          >
            {drinks.map((drink) => (
              <div
                key={drink.id}
                className="flex-shrink-0"
                style={{ width: `${getCardWidth()}px` }}
              >
                <DrinkCard
                  drink={drink}
                  onView={onViewDrink}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center gap-3 mt-10">
          {dots.map((dotIndex) => (
            <button
              key={dotIndex}
              onClick={() => goToIndex(dotIndex * itemsPerView)}
              className={`h-2.5 rounded-full transition-all duration-500 active:scale-90 ${activeDotIndex === dotIndex
                ? 'bg-accent w-10 shadow-md shadow-accent/20'
                : 'bg-muted-foreground/20 hover:bg-accent/40 w-2.5'
                }`}
              aria-label={`Go to slide group ${dotIndex + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DrinkCarousel;
