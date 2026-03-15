'use client';

interface PixelButtonProps {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}

export default function PixelButton({ children, active, onClick }: PixelButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 text-xs border transition-all cursor-pointer font-mono ${
        active
          ? 'bg-white text-black border-white'
          : 'bg-transparent text-term-dim border-[#333] hover:border-[#666] hover:text-white'
      }`}
    >
      [{children}]
    </button>
  );
}
