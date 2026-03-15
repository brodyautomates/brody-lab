import Link from 'next/link';

const projects = [
  {
    id: 'mission-control',
    name: 'MISSION CONTROL',
    description: 'autonomous meta ads commander — agent node trees, campaign ops, signal analysis',
    status: 'RUNNING',
    pid: '4821',
    href: '/mission-control',
  },
];

export default function Hub() {
  return (
    <div className="min-h-screen bg-black flex flex-col font-mono">
      <header className="border-b border-[#222] p-4">
        <pre className="text-term-dim text-xs text-center">{`
 ██████╗ ██████╗  ██████╗ ██████╗ ██╗   ██╗    ██╗      █████╗ ██████╗
 ██╔══██╗██╔══██╗██╔═══██╗██╔══██╗╚██╗ ██╔╝    ██║     ██╔══██╗██╔══██╗
 ██████╔╝██████╔╝██║   ██║██║  ██║ ╚████╔╝     ██║     ███████║██████╔╝
 ██╔══██╗██╔══██╗██║   ██║██║  ██║  ╚██╔╝      ██║     ██╔══██║██╔══██╗
 ██████╔╝██║  ██║╚██████╔╝██████╔╝   ██║       ███████╗██║  ██║██████╔╝
 ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚═════╝   ╚═╝       ╚══════╝╚═╝  ╚═╝╚═════╝`}</pre>
      </header>

      <main className="flex-1 p-6 max-w-3xl mx-auto w-full">
        <div className="text-xs text-term-dim mb-6">
          <div>$ ls -la /proc/active</div>
          <div className="mt-1">TOTAL {projects.length}</div>
        </div>

        {projects.map((project) => (
          <Link
            key={project.id}
            href={project.href}
            className="block border border-[#333] p-4 hover:border-[#666] transition-colors mb-3"
          >
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="text-white">{project.name}</span>
              <span className="text-term-dim flex items-center gap-2">
                <span className="text-white" style={{ animation: 'pulse 3s infinite' }}>●</span>
                {project.status} PID:{project.pid}
              </span>
            </div>
            <div className="text-xs text-term-dim">{project.description}</div>
          </Link>
        ))}

        <div className="border border-dashed border-[#222] p-4 text-xs text-term-dim text-center mt-3">
          — AWAITING NEW PROCESS —
        </div>

        <div className="mt-6 text-xs text-term-dim">
          <span style={{ animation: 'blink 1s infinite' }}>█</span>
        </div>
      </main>
    </div>
  );
}
