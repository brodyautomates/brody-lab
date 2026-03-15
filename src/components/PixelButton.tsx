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
      className={`px-4 py-2 text-sm border transition-all cursor-pointer ${
        active
          ? 'bg-crt-green text-crt-black border-crt-green'
          : 'bg-transparent text-crt-green border-crt-green hover:bg-crt-green hover:text-crt-black'
      }`}
      style={{ boxShadow: active ? '0 0 8px #00ff41' : '0 0 4px #00ff41', fontFamily: "'VT323', monospace" }}
    >
      {children}
    </button>
  );
}
