import Link from 'next/link';

const projects = [
  { id: 'missions', name: 'MISSION CONTROL', description: 'autonomous meta ads commander — agent node trees, campaign ops, signal analysis', status: 'RUNNING', pid: '4821', href: '/mission-control' },
  { id: 'broadcast', name: 'BROADCAST', description: 'content ideation + auto-posting system — radar sweep, deployment queue, performance telemetry', status: 'RUNNING', pid: '4822', href: '/mission-control/broadcast' },
  { id: 'interceptor', name: 'INTERCEPTOR', description: 'cold email + follow-up outreach engine — pipeline ops, intercept log, response detection', status: 'RUNNING', pid: '4823', href: '/mission-control/interceptor' },
  { id: 'dealflow', name: 'DEALFLOW', description: 'brand deal + partnership CRM pipeline — kanban tracking, deal telemetry', status: 'RUNNING', pid: '4824', href: '/mission-control/dealflow' },
  { id: 'sentinel', name: 'SENTINEL', description: 'ai customer support ticket agent — threat board, agent ops, auto-dispatch', status: 'RUNNING', pid: '4825', href: '/mission-control/sentinel' },
  { id: 'harvest', name: 'HARVEST', description: 'lead gen funnel + scoring system — acquisition funnel, lead matrix, source signals', status: 'RUNNING', pid: '4826', href: '/mission-control/harvest' },
  { id: 'ledger', name: 'LEDGER', description: 'revenue ops + p&l command center — income streams, expenditure log, financial telemetry', status: 'RUNNING', pid: '4827', href: '/mission-control/ledger' },
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

      <main className="flex-1 p-6 max-w-4xl mx-auto w-full">
        <div className="text-xs text-term-dim mb-4">
          <div>$ ps aux | grep brody-lab</div>
          <div className="mt-1">ACTIVE PROCESSES: {projects.length}</div>
        </div>

        <div className="space-y-2">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={project.href}
              className="block border border-[#333] p-3 hover:border-[#666] transition-colors"
            >
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-white">{project.name}</span>
                <span className="text-term-dim flex items-center gap-2">
                  <span className="text-white" style={{ animation: 'pulse 3s infinite' }}>●</span>
                  {project.status} PID:{project.pid}
                </span>
              </div>
              <div className="text-xs text-term-dim">{project.description}</div>
            </Link>
          ))}
        </div>

        <div className="border border-dashed border-[#222] p-3 text-xs text-term-dim text-center mt-2">
          — AWAITING NEW PROCESS —
        </div>

        <div className="mt-4 text-xs text-term-dim">
          <span style={{ animation: 'blink 1s infinite' }}>█</span>
        </div>
      </main>
    </div>
  );
}
