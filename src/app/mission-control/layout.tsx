import CRTOverlay from '@/components/CRTOverlay';
import SystemSelector from '@/components/SystemSelector';
import StatusTicker from '@/components/StatusTicker';

export default function MissionControlLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen h-screen bg-black flex flex-col relative overflow-hidden">
      <CRTOverlay />
      <SystemSelector />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
      <StatusTicker />
    </div>
  );
}
