export interface CaseItem {
  id: string;
  name: string;
  rarity: 'milspec' | 'restricted' | 'classified' | 'covert' | 'special';
  image: string;
  accentColor: string;
  isGuaranteedTarget?: boolean;
}

export const FILLER_ITEMS: CaseItem[] = [
  { id: '1', name: 'Snack Cemilan', rarity: 'milspec', image: '🍬', accentColor: '#4b69ff' },
  { id: '2', name: 'Doa', rarity: 'milspec', image: '🙏', accentColor: '#4b69ff' },
  { id: '3', name: 'Gantungan Kunci Lucu', rarity: 'restricted', image: '🧸', accentColor: '#8847ff' },
  { id: '4', name: 'Kuaci 1 Sachet', rarity: 'milspec', image: '🌻', accentColor: '#4b69ff' },
  { id: '5', name: 'Es Krim Dubai Chewy Cookie', rarity: 'classified', image: '🍦', accentColor: '#d32ce6' },
  { id: '6', name: 'Laptop', rarity: 'classified', image: '💻', accentColor: '#4b69ff' },
  { id: '7', name: 'Album Musik Favorit', rarity: 'classified', image: '💿', accentColor: '#d32ce6' },
];

export const GUARANTEED_PRIZE: CaseItem = {
  id: 'winner-prize',
  name: 'Special Drop: New Exclusive Powerbank',
  rarity: 'special',
  image: '📱',
  accentColor: '#ffd166',
  isGuaranteedTarget: true,
};
