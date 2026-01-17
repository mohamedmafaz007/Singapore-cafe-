import { useState, useRef, useEffect, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import FullScreenDrink from '@/components/FullScreenDrink';
import { hotDrinks, coldDrinks } from '@/data/drinks';

const Index = () => {
  const allDrinks = useMemo(() => [...hotDrinks, ...coldDrinks], []);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Simple scroll function
  const scrollToIndex = (index: number) => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const width = container.offsetWidth;

    console.log(`Scrolling to index ${index}, left position: ${index * width}px`);

    container.scrollTo({
      left: index * width,
      behavior: 'smooth'
    });
  };

  // Scroll whenever currentIndex changes
  useEffect(() => {
    console.log(`Current index changed to: ${currentIndex}`);
    scrollToIndex(currentIndex);
  }, [currentIndex]);

  // AUTO-SCROLL: Move to next image every 5 seconds
  useEffect(() => {
    console.log('Setting up auto-scroll interval...');

    const intervalId = setInterval(() => {
      setCurrentIndex(prevIndex => {
        const nextIndex = (prevIndex + 1) % allDrinks.length;
        console.log(`AUTO-SCROLL: ${prevIndex} → ${nextIndex} (${new Date().toLocaleTimeString()})`);
        return nextIndex;
      });
    }, 5000); // 5 seconds

    console.log(`Interval created with ID: ${intervalId}`);

    return () => {
      console.log('Cleaning up interval...');
      clearInterval(intervalId);
    };
  }, [allDrinks.length]);

  const handleNext = () => {
    console.log('Manual NEXT clicked');
    setCurrentIndex(prev => (prev + 1) % allDrinks.length);
  };

  const handlePrev = () => {
    console.log('Manual PREV clicked');
    setCurrentIndex(prev => (prev - 1 + allDrinks.length) % allDrinks.length);
  };

  const handleDotClick = (index: number) => {
    console.log(`Dot ${index} clicked`);
    setCurrentIndex(index);
  };

  return (
    <div className="fixed inset-0 w-screen h-screen bg-black overflow-hidden">
      {/* Scroll Container */}
      <div
        ref={scrollRef}
        className="flex h-full w-full overflow-x-auto snap-x snap-mandatory scroll-smooth perspective-container"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {allDrinks.map((drink, index) => (
          <div
            key={drink.id}
            className="h-full w-full min-w-full flex-shrink-0 snap-center snap-always"
          >
            <FullScreenDrink
              drink={drink}
              isActive={currentIndex === index}
            />
          </div>
        ))}
      </div>

      {/* Manual Navigation Controls */}
      <div className="fixed inset-y-0 left-0 right-0 pointer-events-none z-[60] flex items-center justify-between px-3 sm:px-4 md:px-6 lg:px-12">
        <button
          onClick={handlePrev}
          className="pointer-events-auto w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full bg-white/5 backdrop-blur-3xl border border-white/5 flex items-center justify-center text-white/20 hover:text-white hover:bg-white/10 transition-all duration-300 group active:scale-90"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 group-hover:-translate-x-1 transition-transform" />
        </button>

        <button
          onClick={handleNext}
          className="pointer-events-auto w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full bg-white/5 backdrop-blur-3xl border border-white/5 flex items-center justify-center text-white/20 hover:text-white hover:bg-white/10 transition-all duration-300 group active:scale-90"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Progress Indicator */}
      <div className="fixed bottom-6 sm:bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 z-[60] flex items-center gap-1.5 sm:gap-2">
        {allDrinks.map((_, i) => (
          <button
            key={i}
            onClick={() => handleDotClick(i)}
            className={`transition-all duration-700 rounded-full h-0.5 sm:h-1 cursor-pointer ${currentIndex === i ? 'w-6 sm:w-8 md:w-10 bg-accent' : 'w-2 sm:w-3 md:w-4 bg-white/10 hover:bg-white/30'}`}
          />
        ))}
      </div>

      {/* Global Aesthetics - Vignette */}
      <div className="fixed inset-0 pointer-events-none shadow-[inset_0_0_200px_rgba(0,0,0,0.9)] z-50" />
    </div>
  );
};

export default Index;
