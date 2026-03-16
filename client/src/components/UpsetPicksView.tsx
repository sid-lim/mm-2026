/*
 * UpsetPicksView: Upset predictions with analysis
 * Design: Modern Sports Analytics Dashboard
 */

import { upsetPicks, regions } from '@/lib/bracketData';

const regionColorMap: Record<string, string> = {
  East: '#1D4ED8',
  West: '#15803D',
  South: '#B91C1C',
  Midwest: '#D97706',
};

export default function UpsetPicksView() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl p-5 text-white">
        <h2 className="text-2xl font-bold mb-1" style={{ fontFamily: 'Oswald, sans-serif', letterSpacing: '0.05em' }}>
          ⚡ UPSET PICKS &amp; BRACKET BUSTERS
        </h2>
        <p className="text-amber-100 text-sm">
          These matchups where advanced metrics suggest a higher upset probability than the seed differential implies.
          Based on KenPom ratings, injury reports, and stylistic matchup analysis.
        </p>
      </div>

      {/* Historical Context */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { year: '2021', upsets: 14, label: 'Major Upsets' },
          { year: '2022', upsets: 13, label: 'Major Upsets' },
          { year: '2023', upsets: 9, label: 'Major Upsets' },
          { year: '2025', upsets: 4, label: 'Major Upsets (lowest in 18 yrs)' },
        ].map((item) => (
          <div key={item.year} className="bg-white rounded-xl border border-slate-200 p-4 text-center shadow-sm">
            <div className="text-2xl font-bold text-slate-800 font-stat">{item.upsets}</div>
            <div className="text-xs text-slate-500 mt-1">{item.year} {item.label}</div>
          </div>
        ))}
      </div>
      <p className="text-sm text-slate-600 bg-slate-50 rounded-lg p-3 border border-slate-200">
        <strong>Trend Alert:</strong> The 2025 tournament had only 4 major upsets — the fewest in 18 years. Only 4 of 32 first-round games were decided by 5 or fewer points. The NIL/transfer portal era may be making upsets rarer. Still, these picks represent the best upset opportunities in 2026.
      </p>

      {/* Upset Picks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {upsetPicks.map((pick, i) => {
          const regionColor = regionColorMap[pick.region] || '#6B7280';
          const seedDiff = pick.overSeed - pick.seed;
          return (
            <div key={i} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-100" style={{ backgroundColor: regionColor + '12' }}>
                <span className="text-2xl">⚡</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="seed-badge text-white" style={{ backgroundColor: '#94A3B8' }}>{pick.seed}</span>
                    <span className="font-bold text-slate-800" style={{ fontFamily: 'Oswald, sans-serif', fontSize: '1.05rem' }}>
                      {pick.team}
                    </span>
                    <span className="text-slate-400 text-sm">over</span>
                    <span className="seed-badge text-white" style={{ backgroundColor: regionColor }}>{pick.overSeed}</span>
                    <span className="font-bold" style={{ fontFamily: 'Oswald, sans-serif', color: regionColor }}>{pick.over}</span>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className="text-xs font-bold px-2 py-1 rounded-full text-white" style={{ backgroundColor: regionColor }}>
                    {pick.region}
                  </span>
                </div>
              </div>
              <div className="px-4 py-3">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold text-amber-600 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full font-stat">
                    +{seedDiff} seed lines
                  </span>
                  <span className="text-xs text-slate-500">upset margin</span>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">{pick.rationale}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Teams to Watch */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
        <h3 className="font-bold text-slate-800 mb-4" style={{ fontFamily: 'Oswald, sans-serif', fontSize: '1.1rem' }}>
          🔍 TEAMS TO WATCH — DEEP RUN POTENTIAL
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              team: 'Illinois (3-seed, South)',
              color: '#B91C1C',
              reason: 'KenPom #5 overall with the #1 ranked offense in KenPom history (131.1 pts/100 possessions). If they can avoid overtime situations (0-4 in OT), they can beat anyone.',
              risk: 'Inconsistent in close games. 0-4 in overtime this season.',
            },
            {
              team: 'Iowa State (2-seed, Midwest)',
              color: '#D97706',
              reason: 'Joshua Jefferson is a matchup nightmare. Milan Momcilovic is the best 3-point shooter in the field. Defense ranks 4th in KenPom adjusted efficiency.',
              risk: 'Dropped in Michigan\'s region. Could face tough matchup with Virginia or Tennessee in Sweet 16.',
            },
            {
              team: 'Purdue (2-seed, West)',
              color: '#15803D',
              reason: 'Best offensive efficiency in KenPom era history. Braden Smith about to break Bobby Hurley\'s all-time assist record. Big Ten tournament champions.',
              risk: 'Can\'t guard the ball. Talented perimeter scorers have punished them all season.',
            },
            {
              team: 'St. John\'s (5-seed, East)',
              color: '#1D4ED8',
              reason: 'Won both Big East season and tournament title. Rick Pitino has taken 3 different programs to the Final Four. Could shock Duke in the Sweet 16.',
              risk: 'Unusual to be a 5-seed after winning the Big East. Northern Iowa is a dangerous first-round opponent.',
            },
          ].map((item) => (
            <div key={item.team} className="p-4 rounded-lg border" style={{ borderColor: item.color + '40', backgroundColor: item.color + '08' }}>
              <div className="font-bold mb-2" style={{ fontFamily: 'Oswald, sans-serif', color: item.color }}>{item.team}</div>
              <div className="text-xs text-slate-700 mb-2 leading-relaxed">
                <strong>Why they can go deep:</strong> {item.reason}
              </div>
              <div className="text-xs text-red-600 leading-relaxed">
                <strong>Risk:</strong> {item.risk}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Injury Report */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
        <h3 className="font-bold text-slate-800 mb-4" style={{ fontFamily: 'Oswald, sans-serif', fontSize: '1.1rem' }}>
          🏥 KEY INJURY REPORT
        </h3>
        <div className="space-y-3">
          {[
            { team: 'Duke', player: 'Patrick Ngongba II (C)', status: 'Questionable', detail: 'Foot soreness. Expected back in early rounds. Critical for Duke\'s frontcourt depth.', color: '#1D4ED8' },
            { team: 'Duke', player: 'Caleb Foster (PG)', status: 'Out (early rounds)', detail: 'Broken foot surgery. May return for Final Four. Duke will have playmaking pressure on Cameron Boozer.', color: '#1D4ED8' },
            { team: 'UCLA', player: 'Tyler Bilodeau & Donovan Dent', status: 'Questionable', detail: 'Both injured in Big Ten tournament. Their availability determines if UCLA can upset UCF.', color: '#1D4ED8' },
            { team: 'Louisville', player: 'Mikel Brown Jr. (G)', status: 'Questionable', detail: 'Back injury. Star freshman missed ACC tournament. His availability vs. South Florida is crucial.', color: '#1D4ED8' },
            { team: 'Texas Tech', player: 'JT Toppin (F)', status: 'Out for season', detail: 'Torn ACL last month. Significantly lowers Texas Tech\'s ceiling and makes them vulnerable to Akron.', color: '#D97706' },
            { team: 'Arkansas', player: 'Karter Knox (F)', status: 'Out for season', detail: 'Season-ending injury. Reduces Arkansas\'s depth heading into the Sweet 16 and beyond.', color: '#15803D' },
          ].map((item) => (
            <div key={`${item.team}-${item.player}`} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100">
              <div className="flex-shrink-0 w-20 text-center">
                <span className="text-xs font-bold px-2 py-1 rounded text-white block" style={{ backgroundColor: item.color, fontFamily: 'Oswald, sans-serif' }}>
                  {item.team}
                </span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-semibold text-sm text-slate-800">{item.player}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-stat ${item.status.includes('Out') ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {item.status}
                  </span>
                </div>
                <p className="text-xs text-slate-600">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
