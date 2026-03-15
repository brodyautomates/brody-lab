'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  {
    href: '/mission-control',
    label: 'MISSIONS',
    icon: (
      <svg viewBox="0 0 16 16" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="8" cy="8" r="6" /><line x1="8" y1="2" x2="8" y2="14" /><line x1="2" y1="8" x2="14" y2="8" />
        <line x1="3.5" y1="3.5" x2="12.5" y2="12.5" /><line x1="12.5" y1="3.5" x2="3.5" y2="12.5" />
      </svg>
    ),
  },
  {
    href: '/mission-control/broadcast',
    label: 'BROADCAST',
    icon: (
      <svg viewBox="0 0 16 16" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M8 12V14M8 12L4 8M8 12L12 8M8 2L8 8M4 4C2 6 2 10 4 12M12 4C14 6 14 10 12 12" />
      </svg>
    ),
  },
  {
    href: '/mission-control/interceptor',
    label: 'INTERCEPTOR',
    icon: (
      <svg viewBox="0 0 16 16" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="1" y="4" width="14" height="9" /><polyline points="1,4 8,9 15,4" />
      </svg>
    ),
  },
  {
    href: '/mission-control/dealflow',
    label: 'DEALFLOW',
    icon: (
      <svg viewBox="0 0 16 16" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M2 8h4l2-4l2 6l2-2h4" />
      </svg>
    ),
  },
  {
    href: '/mission-control/sentinel',
    label: 'SENTINEL',
    icon: (
      <svg viewBox="0 0 16 16" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M8 1L2 4V8C2 11.3 4.7 14 8 15C11.3 14 14 11.3 14 8V4L8 1Z" />
      </svg>
    ),
  },
  {
    href: '/mission-control/harvest',
    label: 'HARVEST',
    icon: (
      <svg viewBox="0 0 16 16" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 2H13L11 7H5L3 2ZM5 7H11L10 11H6L5 7ZM6 11H10L9 14H7L6 11Z" />
      </svg>
    ),
  },
  {
    href: '/mission-control/ledger',
    label: 'LEDGER',
    icon: (
      <svg viewBox="0 0 16 16" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="1" width="12" height="14" /><line x1="5" y1="4" x2="11" y2="4" /><line x1="5" y1="7" x2="11" y2="7" /><line x1="5" y1="10" x2="9" y2="10" />
      </svg>
    ),
  },
];

export default function SideNav() {
  const pathname = usePathname();

  return (
    <nav className="w-12 hover:w-48 transition-all duration-200 border-r border-[#222] bg-black flex flex-col shrink-0 overflow-hidden group">
      <div className="flex-1 py-2">
        {navItems.map((item) => {
          const isActive = item.href === '/mission-control'
            ? pathname === '/mission-control'
            : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3.5 py-2.5 text-xs transition-colors whitespace-nowrap ${
                isActive ? 'text-white bg-[#111]' : 'text-term-dim hover:text-white hover:bg-[#0a0a0a]'
              }`}
            >
              <span className="shrink-0">{item.icon}</span>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">{item.label}</span>
            </Link>
          );
        })}
      </div>
      <div className="px-3.5 py-2 text-[9px] text-term-dim border-t border-[#222] flex items-center gap-2 whitespace-nowrap">
        <span className="text-white" style={{ animation: 'pulse 3s infinite' }}>●</span>
        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">SYS v2.4.1</span>
      </div>
    </nav>
  );
}
