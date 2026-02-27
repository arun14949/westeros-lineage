import { type Character } from '../data';

const houseColors: Record<string, string> = {
  stark: 'from-[#5c6b73] to-[#4a5560]',
  targaryen: 'from-[#8a1c1c] to-[#6b1515]',
  lannister: 'from-[#bfa15f] to-[#a08847]',
  baratheon: 'from-[#c9a61a] to-[#a88714]',
  greyjoy: 'from-[#4a5568] to-[#3a4555]',
  tyrell: 'from-[#5b8c3e] to-[#4a7333]',
  martell: 'from-[#d4742c] to-[#b55f23]',
  arryn: 'from-[#4e7a9e] to-[#3e6280]',
  tully: 'from-[#3b6d8f] to-[#2f5772]',
};

interface CharacterAvatarProps {
  character: Character;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export default function CharacterAvatar({ character, size = 'md', className = '' }: CharacterAvatarProps) {
  const gradient = houseColors[character.house] || 'from-parchment to-parchment-dark';

  const sizeClasses = {
    sm: 'w-8 h-8 text-[16px]',
    md: 'w-12 h-12 text-[24px]',
    lg: 'w-14 h-14 text-[28px]',
    xl: 'w-32 h-32 text-[64px]',
  };

  const borderSizes = {
    sm: 'border',
    md: 'border-2',
    lg: 'border-2',
    xl: 'border-[3px]',
  };

  return (
    <div className={`rounded-full bg-gradient-to-br ${gradient} ${sizeClasses[size]} ${borderSizes[size]} border-white/20 flex items-center justify-center shadow-sm ${className}`}>
      <span className="material-symbols-outlined text-white/90" style={{ fontSize: 'inherit' }}>person</span>
    </div>
  );
}
