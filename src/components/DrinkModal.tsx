import { useEffect, useState } from 'react';
import { Drink } from '@/data/drinks';
import { X, ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';

interface DrinkModalProps {
  drink: Drink | null;
  isOpen: boolean;
  onClose: () => void;
}

const DrinkModal = ({ drink, isOpen, onClose }: DrinkModalProps) => {
  const [imageError, setImageError] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setImageError(false);
      setIsClosing(false);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 200);
  };

  const handleAddToOrder = () => {
    if (drink) {
      toast.success(`${drink.name} added to your order!`, {
        description: `Price: $${drink.price.toFixed(2)}`,
        duration: 3000,
      });
    }
  };

  if (!isOpen || !drink) return null;

  const fallbackGradient = drink.category === 'hot'
    ? 'from-amber-700 via-amber-600 to-orange-500'
    : 'from-cyan-500 via-teal-400 to-emerald-400';

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-200 ${isClosing ? 'opacity-0' : 'opacity-100'
        }`}
      onClick={handleClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className={`relative glass-card rounded-3xl overflow-hidden max-w-md w-full transition-all duration-200 ${isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100 animate-scale-in'
          }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/40 hover:scale-110 transition-all duration-200 active:scale-95"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Image */}
        <div className="relative h-64 md:h-80 overflow-hidden">
          {imageError ? (
            <div className={`absolute inset-0 bg-gradient-to-br ${fallbackGradient} flex items-center justify-center`}>
              <span className="text-8xl">
                {drink.category === 'hot' ? '☕' : '🧊'}
              </span>
            </div>
          ) : (
            <img
              src={drink.image}
              alt={drink.name}
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
            />
          )}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

          {/* Category Badge */}
          <div className={`absolute top-4 left-4 px-4 py-1.5 rounded-full text-sm font-medium backdrop-blur-md ${drink.category === 'hot'
            ? 'bg-orange-500/80 text-white'
            : 'bg-cyan-500/80 text-white'
            }`}>
            {drink.category === 'hot' ? '🔥 Hot Drink' : '❄️ Cold Drink'}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
            {drink.name}
          </h2>

          <p className="text-muted-foreground mb-6">
            {drink.category === 'hot'
              ? 'A warm and comforting beverage, perfect for any time of day. Crafted with care using traditional recipes.'
              : 'A refreshing cold drink to cool you down. Made with fresh ingredients and served ice-cold.'}
          </p>

          <div className="flex items-center justify-between gap-4">
            <div>
              <span className="text-sm text-muted-foreground">Price</span>
              <p className="text-3xl font-bold text-accent">
                ${drink.price.toFixed(2)}
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleAddToOrder}
                className="btn-accent px-6 py-3 text-base flex items-center gap-2 hover:scale-105 active:scale-95 transition-transform duration-200"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrinkModal;
