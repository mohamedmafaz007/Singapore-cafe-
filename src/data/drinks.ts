export interface Drink {
  id: string;
  name: string;
  price: number;
  category: 'hot' | 'cold';
  image: string;
}

export const drinks: Drink[] = [
  // Hot Drinks
  { id: 'tea', name: 'Tea / Teh', price: 1.50, category: 'hot', image: '/images/tea.jpg' },
  { id: 'teh-halia', name: 'Teh Halia', price: 1.60, category: 'hot', image: '/images/teh-halia.jpg' },
  { id: 'coffee', name: 'Coffee / Kopi', price: 1.50, category: 'hot', image: '/images/coffee.jpg' },
  { id: 'teh-o', name: 'Teh O', price: 1.50, category: 'hot', image: '/images/teh-o.jpg' },
  { id: 'kopi-o', name: 'Kopi O', price: 1.50, category: 'hot', image: '/images/kopi-o.jpg' },
  { id: 'teh-c', name: 'Teh C', price: 1.50, category: 'hot', image: '/images/teh-c.jpg' },
  { id: 'teh-o-limau', name: 'Teh O Limau', price: 1.50, category: 'hot', image: '/images/teh-o-limau.jpg' },
  { id: 'teh-o-halia', name: 'Teh O Halia', price: 1.60, category: 'hot', image: '/images/teh-o-halia.jpg' },
  { id: 'limau-halia', name: 'Limau Halia', price: 1.60, category: 'hot', image: '/images/limau-halia.jpg' },
  { id: 'halia-o', name: 'Halia O', price: 1.60, category: 'hot', image: '/images/halia-o.jpg' },
  { id: 'limau-panas', name: 'Limau Panas', price: 1.50, category: 'hot', image: '/images/limau-panas.jpg' },
  { id: 'honey-limau', name: 'Honey Limau', price: 1.80, category: 'hot', image: '/images/honey-limau.jpg' },
  { id: 'karupatty-tea', name: 'Karupatty Tea', price: 1.70, category: 'hot', image: '/images/karupatty-tea.jpg' },
  { id: 'karupatty-coffee', name: 'Karupatty Coffee', price: 1.70, category: 'hot', image: '/images/karupatty-coffee.jpg' },
  { id: 'milk', name: 'Milk', price: 1.50, category: 'hot', image: '/images/milk.jpg' },
  { id: 'badam-milk', name: 'Badam Milk', price: 1.60, category: 'hot', image: '/images/badam-milk.jpg' },
  { id: 'panakarkandu-milk', name: 'Panakarkandu Milk', price: 1.80, category: 'hot', image: '/images/panakarkandu-milk.jpg' },
  { id: 'milo', name: 'Milo', price: 1.80, category: 'hot', image: '/images/milo.jpg' },
  { id: 'boost', name: 'Boost', price: 1.80, category: 'hot', image: '/images/boost.jpg' },
  { id: 'horlicks', name: 'Horlicks', price: 1.80, category: 'hot', image: '/images/horlicks.jpg' },
  { id: 'ragi-malt', name: 'Ragi Malt', price: 1.80, category: 'hot', image: '/images/ragi-malt.jpg' },
  { id: 'sukku-malli', name: 'Sukku Malli', price: 1.80, category: 'hot', image: '/images/sukku-malli.jpg' },
  
  // Cold Drinks
  { id: 'milo-ice', name: 'Milo Ice', price: 2.00, category: 'cold', image: '/images/milo-ice.jpg' },
  { id: 'ice-kopi', name: 'Ice Kopi', price: 2.00, category: 'cold', image: '/images/ice-kopi.jpg' },
  { id: 'ice-tea', name: 'Ice Tea', price: 2.00, category: 'cold', image: '/images/ice-tea.jpg' },
  { id: 'ice-lemon-tea', name: 'Ice Lemon Tea', price: 2.00, category: 'cold', image: '/images/ice-lemon-tea.jpg' },
  { id: 'lemon-juice', name: 'Lemon Juice', price: 2.00, category: 'cold', image: '/images/lemon-juice.jpg' },
  { id: 'lemon-sharbat', name: 'Lemon Sharbat', price: 2.50, category: 'cold', image: '/images/lemon-sharbat.jpg' },
  { id: 'rose-milk', name: 'Rose Milk', price: 2.00, category: 'cold', image: '/images/rose-milk.jpg' },
  { id: 'lassi', name: 'Lassi', price: 2.50, category: 'cold', image: '/images/lassi.jpg' },
  { id: 'mango-lassi', name: 'Mango Lassi', price: 2.00, category: 'cold', image: '/images/mango-lassi.jpg' },
  { id: 'calamansi', name: 'Calamansi', price: 2.00, category: 'cold', image: '/images/calamansi.jpg' },
  { id: 'honeydew-ice', name: 'Honeydew Ice', price: 2.00, category: 'cold', image: '/images/honeydew-ice.jpg' },
  { id: 'mint-lemon-ice', name: 'Mint Lemon Ice', price: 2.00, category: 'cold', image: '/images/mint-lemon-ice.jpg' },
];

export const hotDrinks = drinks.filter(d => d.category === 'hot');
export const coldDrinks = drinks.filter(d => d.category === 'cold');
