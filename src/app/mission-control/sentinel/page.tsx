'use client';

import { supportTickets, sentinelStats, recentDispatches } from '@/lib/mockData';

const severityOrder = { CRITICAL: 0, HIGH: 1, ROUTINE: 2 } as const;

const sortedTickets = [...supportTickets].sort(
  (a, b) => severityOrder[a.severity] - severityOrder[b.severity]
);

const processingTicket = supportTickets.find((t) => t.status === 'PROCESSING');

export default function SentinelDashboard() {
  return (
    <div className="p-3 grid grid-cols-[1fr_1.4fr_1fr] gap-2 h-[calc(100vh-64px)]">
      {/* ============ LEFT PANEL — THREAT BOARD ============ */}
      <div className="border border-[#333] bg-black p-3 overflow-hidden flex flex-col">
        <div className="text-xs text-term-dim mb-3">-- THREAT BOARD --</div>

        <div className="flex-1 overflow-y-auto space-y-1">
          {sortedTickets.map((ticket) => (
            <div
              key={ticket.id}
              className={`border border-[#333] px-2 py-1.5 text-xs ${
                ticket.status === 'RESOLVED' ? 'opacity-40' : ''
              }`}
            >
              <div className="flex items-center gap-2">
                {/* Severity indicator */}
                <span
                  className={
                    ticket.severity === 'CRITICAL'
                      ? 'text-white'
                      : ticket.severity === 'HIGH'
                      ? 'text-[#ccc]'
                      : 'text-term-dim'
                  }
                  style={
                    ticket.severity === 'CRITICAL'
                      ? { animation: 'pulse 1s infinite' }
                      : undefined
                  }
                >
                  {ticket.severity === 'CRITICAL'
                    ? '!!'
                    : ticket.severity === 'HIGH'
                    ? '!'
                    : '.'}
                </span>

                <span className="text-term-dim">{ticket.id}</span>

                <span
                  className={`ml-auto text-[10px] border border-[#333] px-1 ${
                    ticket.severity === 'CRITICAL'
                      ? 'text-white'
                      : 'text-term-dim'
                  }`}
                >
                  {ticket.category}
                </span>
              </div>

              <div className="mt-1 text-white truncate">{ticket.subject}</div>

              <div className="flex justify-between mt-1 text-term-dim text-[10px]">
                <span>{ticket.customer}</span>
                <span>{ticket.timeSince}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-2 pt-2 border-t border-[#333] text-[10px] text-term-dim">
          {supportTickets.filter((t) => t.status === 'OPEN').length} OPEN
          {' / '}
          {supportTickets.filter((t) => t.status === 'PROCESSING').length} PROCESSING
          {' / '}
          {supportTickets.filter((t) => t.status === 'RESOLVED').length} RESOLVED
        </div>
      </div>

      {/* ============ CENTER PANEL — AGENT OPERATIONS ============ */}
      <div className="border border-[#333] bg-black p-3 overflow-hidden flex flex-col">
        <div className="text-xs text-term-dim mb-3">-- AGENT OPERATIONS --</div>

        {/* Node tree SVG */}
        <div className="mb-4">
          <svg viewBox="0 0 520 60" className="w-full h-14">
            {/* Connection lines */}
            <line x1="85" y1="30" x2="155" y2="30" stroke="#333" strokeWidth="1" />
            <line x1="235" y1="30" x2="305" y2="30" stroke="#333" strokeWidth="1" />
            <line x1="395" y1="30" x2="450" y2="30" stroke="#333" strokeWidth="1" />

            {/* Animated dots on lines */}
            <circle r="2" fill="#fff">
              <animateMotion dur="2s" repeatCount="indefinite" path="M85,30 L155,30" />
            </circle>
            <circle r="2" fill="#fff">
              <animateMotion dur="2s" repeatCount="indefinite" path="M235,30 L305,30" />
            </circle>
            <circle r="2" fill="#fff">
              <animateMotion dur="2s" repeatCount="indefinite" path="M395,30 L450,30" />
            </circle>

            {/* Node 1: CLASSIFY */}
            <rect x="10" y="12" width="75" height="36" fill="none" stroke="#666" strokeWidth="1" />
            <text x="47" y="27" textAnchor="middle" fill="#fff" fontSize="8" fontFamily="monospace">
              CLASSIFY
            </text>
            <text x="47" y="40" textAnchor="middle" fill="#666" fontSize="7" fontFamily="monospace">
              NODE-01
            </text>

            {/* Node 2: SEARCH KB */}
            <rect x="155" y="12" width="80" height="36" fill="none" stroke="#666" strokeWidth="1" />
            <text x="195" y="27" textAnchor="middle" fill="#fff" fontSize="8" fontFamily="monospace">
              SEARCH KB
            </text>
            <text x="195" y="40" textAnchor="middle" fill="#666" fontSize="7" fontFamily="monospace">
              NODE-02
            </text>

            {/* Node 3: DRAFT RESPONSE */}
            <rect x="305" y="12" width="90" height="36" fill="none" stroke="#999" strokeWidth="1" />
            <text x="350" y="27" textAnchor="middle" fill="#fff" fontSize="8" fontFamily="monospace">
              DRAFT RESP
            </text>
            <text x="350" y="40" textAnchor="middle" fill="#999" fontSize="7" fontFamily="monospace">
              ACTIVE
            </text>

            {/* Node 4: AWAIT REVIEW */}
            <rect x="450" y="12" width="65" height="36" fill="none" stroke="#333" strokeWidth="1" />
            <text x="482" y="27" textAnchor="middle" fill="#666" fontSize="8" fontFamily="monospace">
              REVIEW
            </text>
            <text x="482" y="40" textAnchor="middle" fill="#333" fontSize="7" fontFamily="monospace">
              PENDING
            </text>
          </svg>
        </div>

        {/* Current processing ticket */}
        {processingTicket && (
          <div className="mb-3 border border-[#333] p-2">
            <div className="text-[10px] text-term-dim mb-1">PROCESSING</div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-white" style={{ animation: 'pulse 1s infinite' }}>
                !!
              </span>
              <span className="text-term-dim">{processingTicket.id}</span>
              <span className="text-white">{processingTicket.subject}</span>
            </div>
            <div className="text-[10px] text-term-dim mt-1">
              CUSTOMER: {processingTicket.customer} / {processingTicket.severity} / {processingTicket.category} / {processingTicket.timeSince}
            </div>
          </div>
        )}

        {/* Draft response terminal block */}
        <div className="flex-1 border border-[#333] p-3 bg-black overflow-y-auto">
          <div className="text-[10px] text-term-dim mb-2">-- DRAFT RESPONSE --</div>
          <div className="text-xs text-white leading-relaxed">
            <p className="mb-2">
              {'>'} SUBJECT: RE: {processingTicket?.subject}
            </p>
            <p className="mb-2 text-term-dim">TO: {processingTicket?.customer}</p>
            <p className="mb-2">
              HI {processingTicket?.customer.split(' ')[0]},
            </p>
            <p className="mb-2">
              THANK YOU FOR REACHING OUT. I CAN SEE THE PAYMENT FAILURE ON YOUR
              ACCOUNT AND HAVE IDENTIFIED THE ROOT CAUSE — YOUR CARD ISSUER
              DECLINED THE TRANSACTION DUE TO AN EXPIRED CVV ON FILE.
            </p>
            <p className="mb-2">
              I HAVE TAKEN THE FOLLOWING ACTIONS:
            </p>
            <p className="mb-1 text-[#ccc]">1. RESET YOUR PAYMENT METHOD STATUS</p>
            <p className="mb-1 text-[#ccc]">2. UNLOCKED FULL COURSE ACCESS FOR 48HRS</p>
            <p className="mb-2 text-[#ccc]">3. SENT A SECURE LINK TO UPDATE YOUR CARD</p>
            <p className="mb-2">
              PLEASE UPDATE YOUR PAYMENT DETAILS AT YOUR EARLIEST CONVENIENCE.
              YOUR ACCESS WILL REMAIN ACTIVE DURING THIS WINDOW.
            </p>
            <p className="text-term-dim">
              — SENTINEL AI SUPPORT AGENT
            </p>
            <span
              className="inline-block w-2 h-3.5 bg-white ml-1 align-middle"
              style={{ animation: 'blink 1s infinite' }}
            />
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 mt-3">
          <button className="border border-[#333] text-xs px-3 py-1 text-white hover:bg-[#111] transition-colors cursor-pointer">
            AUTHORIZE RESPONSE
          </button>
          <button className="border border-[#333] text-xs px-3 py-1 text-term-dim hover:bg-[#111] hover:text-white transition-colors cursor-pointer">
            OVERRIDE — MANUAL
          </button>
        </div>
      </div>

      {/* ============ RIGHT PANEL — SYSTEM READOUTS ============ */}
      <div className="border border-[#333] bg-black p-3 overflow-hidden flex flex-col">
        <div className="text-xs text-term-dim mb-3">-- SYSTEM READOUTS --</div>

        <div className="space-y-4 mb-4">
          {/* TICKETS TODAY */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-term-dim">TICKETS TODAY</span>
              <span className="text-white">{sentinelStats.ticketsToday}</span>
            </div>
            <div className="flex gap-px">
              {Array.from({ length: 50 }).map((_, i) => (
                <div
                  key={i}
                  className={`h-2 flex-1 ${
                    i < Math.round((sentinelStats.ticketsToday / 60) * 50)
                      ? 'bg-white'
                      : 'bg-[#222]'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* AVG RESPONSE */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-term-dim">AVG RESPONSE</span>
              <span className="text-white">{sentinelStats.avgResponseTime}</span>
            </div>
            <div className="text-xs text-term-dim font-mono">
              {'|'}{'='.repeat(8)}{'>'}{' '.repeat(42)}{'|'}
            </div>
          </div>

          {/* AI RESOLUTION % */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-term-dim">AI RESOLUTION %</span>
              <span className="text-white">{sentinelStats.aiResolutionRate}%</span>
            </div>
            <div className="flex gap-px">
              {Array.from({ length: 50 }).map((_, i) => (
                <div
                  key={i}
                  className={`h-2 flex-1 ${
                    i < Math.round((sentinelStats.aiResolutionRate / 100) * 50)
                      ? 'bg-[#ccc]'
                      : 'bg-[#222]'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* CSAT */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-term-dim">CSAT %</span>
              <span className="text-white">{sentinelStats.customerSatisfaction}%</span>
            </div>
            <div className="flex gap-px">
              {Array.from({ length: 50 }).map((_, i) => (
                <div
                  key={i}
                  className={`h-2 flex-1 ${
                    i < Math.round((sentinelStats.customerSatisfaction / 100) * 50)
                      ? 'bg-white'
                      : 'bg-[#222]'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Separator */}
        <div className="border-t border-[#333] my-2" />

        {/* Recent dispatches */}
        <div className="text-xs text-term-dim mb-2">-- RECENT DISPATCHES --</div>
        <div className="flex-1 overflow-y-auto space-y-2">
          {recentDispatches.map((dispatch) => (
            <div key={dispatch.id} className="border border-[#333] px-2 py-1.5">
              <div className="flex items-center gap-2 text-xs">
                <span className="text-term-dim">{dispatch.id}</span>
                <span className="text-[10px] text-term-dim border border-[#333] px-1">
                  AUTO-RESOLVED
                </span>
              </div>
              <div className="text-[10px] text-[#999] mt-1 leading-snug">
                {dispatch.resolution}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom system line */}
        <div className="mt-2 pt-2 border-t border-[#333] text-[10px] text-term-dim">
          SENTINEL v2.1.0 / UPTIME 99.97% / LAST CYCLE 14S AGO
        </div>
      </div>
    </div>
  );
}
