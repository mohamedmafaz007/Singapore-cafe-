import { useState } from 'react';
import { Drink } from '@/data/drinks';
import { Eye } from 'lucide-react';

interface DrinkCardProps {
  drink: Drink;
  onView: (drink: Drink) => void;
}

const DrinkCard = ({ drink, onView }: DrinkCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  // Fallback gradient based on drink category
  const fallbackGradient = drink.category === 'hot'
    ? 'from-amber-700 via-amber-600 to-orange-500'
    : 'from-cyan-500 via-teal-400 to-emerald-400';

  const handleViewClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onView(drink);
  };

  return (
    <div
      onClick={handleViewClick}
      className={`glass-card rounded-2xl overflow-hidden card-hover group cursor-pointer w-full sm:min-w-[260px] sm:max-w-[260px] flex-shrink-0 transition-all duration-300 ${isPressed ? 'scale-95' : 'hover:scale-[1.02]'
        }`}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
    >
      {/* Image Container */}
      <div className="relative h-64 sm:h-56 overflow-hidden">
        {!imageLoaded && !imageError && (
          <div className={`absolute inset-0 bg-gradient-to-br ${fallbackGradient} animate-pulse`} />
        )}

        {imageError ? (
          <div className={`absolute inset-0 bg-gradient-to-br ${fallbackGradient} flex items-center justify-center`}>
            <span className="text-4xl">
              {drink.category === 'hot' ? '☕' : '🧊'}
            </span>
          </div>
        ) : (
          <img
            src={drink.image}
            alt={drink.name}
            className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
        )}

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Category Badge */}
        <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-md ${drink.category === 'hot'
          ? 'bg-orange-500/80 text-white'
          : 'bg-cyan-500/80 text-white'
          }`}>
          {drink.category === 'hot' ? '🔥 Hot' : '❄️ Cold'}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-display text-lg font-semibold text-foreground mb-2 truncate">
          {drink.name}
        </h3>

        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-accent">
            ${drink.price.toFixed(2)}
          </span>

          <button
            className="btn-accent flex items-center gap-2 text-sm px-5 py-2 group/btn shadow-md hover:shadow-lg transition-all"
          >
            <Eye className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
            <span className="font-semibold">View</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DrinkCard;
