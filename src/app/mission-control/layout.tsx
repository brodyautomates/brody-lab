import CRTOverlay from '@/components/CRTOverlay';
import TerminalHeader from '@/components/TerminalHeader';
import StatusTicker from '@/components/StatusTicker';
import SideNav from '@/components/SideNav';

export default function MissionControlLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen h-screen bg-black flex flex-col relative overflow-hidden">
      <CRTOverlay />
      <TerminalHeader />
      <div className="flex flex-1 overflow-hidden">
        <SideNav />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
      <StatusTicker />
    </div>
  );
}
