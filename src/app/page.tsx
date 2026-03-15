import Link from 'next/link';

const projects = [
  {
    id: 'mission-control',
    name: 'MISSION CONTROL',
    subtitle: 'Autonomous Meta Ads Commander',
    description: 'Retro NASA command center for autonomous Meta ad campaign management. CRT aesthetics, agent node trees, oscilloscope analytics.',
    status: 'ONLINE',
    href: '/mission-control',
  },
];

export default function Hub() {
  return (
    <div className="min-h-screen bg-crt-black flex flex-col">
      {/* Header */}
      <header className="border-b border-crt-green p-6" style={{ boxShadow: '0 0 4px #00ff41' }}>
        <h1 className="text-crt-green text-center tracking-widest mb-2" style={{ fontFamily: "var(--font-press-start)", fontSize: '14px' }}>
          BRODY LAB
        </h1>
        <p className="text-crt-green text-center text-sm opacity-60">DASHBOARDS / AGENTS / TOOLS</p>
      </header>

      {/* Project Grid */}
      <main className="flex-1 p-8 max-w-5xl mx-auto w-full">
        <div className="mb-6 text-sm text-crt-green opacity-60">
          &gt; ACTIVE PROJECTS: {projects.length}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={project.href}
              className="border border-crt-green bg-crt-navy p-6 hover:border-crt-amber transition-all group block"
              style={{ boxShadow: '0 0 4px #00ff41' }}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-crt-amber text-xs tracking-widest">{project.id.toUpperCase()}</span>
                <span className="flex items-center gap-2 text-xs">
                  <span className="inline-block w-2 h-2 bg-crt-green" style={{ animation: 'pulse 2s infinite', boxShadow: '0 0 6px #00ff41' }} />
                  {project.status}
                </span>
              </div>
              <h2 className="text-crt-green group-hover:text-crt-amber transition-colors mb-1" style={{ fontFamily: "var(--font-press-start)", fontSize: '11px' }}>
                {project.name}
              </h2>
              <p className="text-crt-amber text-sm mb-3">{project.subtitle}</p>
              <p className="text-crt-green text-sm opacity-60 leading-relaxed">{project.description}</p>
              <div className="mt-4 pt-3 border-t border-crt-green opacity-40 text-xs">
                &gt; CLICK TO ENTER
              </div>
            </Link>
          ))}

          {/* Placeholder for future projects */}
          <div className="border border-dashed border-crt-green opacity-30 p-6 flex items-center justify-center">
            <span className="text-crt-green text-sm">+ NEXT PROJECT</span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-crt-green p-4 text-center text-xs text-crt-green opacity-40">
        BRODY LAB — ALL SYSTEMS NOMINAL
      </footer>
    </div>
  );
}
