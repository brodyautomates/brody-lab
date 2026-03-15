'use client';

export default function CRTOverlay() {
  return (
    <>
      {/* Scan lines */}
      <div
        className="pointer-events-none fixed inset-0 z-50"
        style={{
          background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.15) 0px, rgba(0,0,0,0.15) 1px, transparent 1px, transparent 2px)',
        }}
      />
      {/* Vignette */}
      <div
        className="pointer-events-none fixed inset-0 z-50"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.6) 100%)',
        }}
      />
      {/* Flicker */}
      <div
        className="pointer-events-none fixed inset-0 z-50"
        style={{
          animation: 'flicker 0.15s infinite',
          opacity: 0,
          background: 'rgba(0,255,65,0.02)',
        }}
      />
    </>
  );
}
