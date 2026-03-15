import CRTOverlay from '@/components/CRTOverlay';
import TerminalHeader from '@/components/TerminalHeader';
import StatusTicker from '@/components/StatusTicker';

export default function MissionControlLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-black flex flex-col relative">
      <CRTOverlay />
      <TerminalHeader />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
      <StatusTicker />
    </div>
  );
}
