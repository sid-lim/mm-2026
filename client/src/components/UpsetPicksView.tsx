/*
 * UpsetPicksView: Upset predictions with analysis
 * Design: Modern Sports Analytics Dashboard
 */

import { upsetPicks, regions } from '@/lib/bracketData';
import { useTheme } from '@/contexts/ThemeContext';

const regionColorMap: Record<string, string> = {
  East: '#1D4ED8',
  West: '#15803D',
  South: '#B91C1C',
  Midwest: '#D97706',
};

export default function UpsetPicksView() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const cardBg = isDark ? 'oklch(0.20 0.02 240)' : 'white';
  const cardBorder = isDark ? 'oklch(0.28 0.015 240)' : 'oklch(0.88 0.008 240)';
  const headingColor = isDark ? 'oklch(0.88 0.005 240)' : 'oklch(0.20 0.02 240)';
  const bodyText = isDark ? 'oklch(0.70 0.01 240)' : 'oklch(0.40 0.015 240)';
  const mutedText = isDark ? 'oklch(0.55 0.015 240)' : 'oklch(0.55 0.015 240)';
  const statBg = isDark ? 'oklch(0.17 0.02 240)' : 'oklch(0.97 0.002 240)';
  const statBorder = isDark ? 'oklch(0.26 0.015 240)' : 'oklch(0.93 0.005 240)';
  const statNum = isDark ? 'oklch(0.88 0.005 240)' : 'oklch(0.20 0.02 240)';
  const trendBg = isDark ? 'oklch(0.18 0.02 240)' : 'oklch(0.97 0.002 240)';
  const trendBorder = isDark ? 'oklch(0.28 0.015 240)' : 'oklch(0.88 0.008 240)';
  const injuryRowBg = isDark ? 'oklch(0.17 0.02 240)' : 'oklch(0.97 0.002 240)';
  const injuryRowBorder = isDark ? 'oklch(0.26 0.015 240)' : 'oklch(0.93 0.005 240)';
  const injuryName = isDark ? 'oklch(0.88 0.005 240)' : 'oklch(0.20 0.02 240)';
  const injuryDetail = isDark ? 'oklch(0.65 0.01 240)' : 'oklch(0.45 0.015 240)';

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
          <div key={item.year} className="rounded-xl p-4 text-center shadow-sm" style={{ backgroundColor: cardBg, border: `1px solid ${cardBorder}` }}>
            <div className="text-2xl font-bold font-stat" style={{ color: statNum }}>{item.upsets}</div>
            <div className="text-xs mt-1" style={{ color: mutedText }}>{item.year} {item.label}</div>
          </div>
        ))}
      </div>
      <p className="text-sm rounded-lg p-3" style={{ color: bodyText, backgroundColor: trendBg, border: `1px solid ${trendBorder}` }}>
        <strong style={{ color: headingColor }}>Trend Alert:</strong> The 2025 tournament had only 4 major upsets — the fewest in 18 years. Only 4 of 32 first-round games were decided by 5 or fewer points. The NIL/transfer portal era may be making upsets rarer. Still, these picks represent the best upset opportunities in 2026.
      </p>

      {/* Upset Picks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {upsetPicks.map((pick, i) => {
          const regionColor = regionColorMap[pick.region] || '#6B7280';
          const seedDiff = pick.overSeed - pick.seed;
          const headerBg = isDark ? regionColor + '20' : regionColor + '12';
          const headerBorder = isDark ? regionColor + '40' : regionColor + '20';
          return (
            <div key={i} className="rounded-xl overflow-hidden shadow-sm" style={{ backgroundColor: cardBg, border: `1px solid ${cardBorder}` }}>
              <div className="flex items-center gap-3 px-4 py-3" style={{ backgroundColor: headerBg, borderBottom: `1px solid ${headerBorder}` }}>
                <span className="text-2xl">⚡</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="seed-badge text-white" style={{ backgroundColor: '#94A3B8' }}>{pick.seed}</span>
                    <span className="font-bold" style={{ fontFamily: 'Oswald, sans-serif', fontSize: '1.05rem', color: headingColor }}>
                      {pick.team}
                    </span>
                    <span className="text-sm" style={{ color: mutedText }}>over</span>
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
                  <span
                    className="text-xs font-semibold px-2 py-0.5 rounded-full font-stat"
                    style={{
                      color: isDark ? '#FCD34D' : '#92400E',
                      backgroundColor: isDark ? 'oklch(0.25 0.08 60)' : '#FEF3C7',
                      border: `1px solid ${isDark ? 'oklch(0.35 0.10 60)' : '#FDE68A'}`,
                    }}
                  >
                    +{seedDiff} seed lines
                  </span>
                  <span className="text-xs" style={{ color: mutedText }}>upset margin</span>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: bodyText }}>{pick.rationale}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Teams to Watch */}
      <div className="rounded-xl shadow-sm p-5" style={{ backgroundColor: cardBg, border: `1px solid ${cardBorder}` }}>
        <h3 className="font-bold mb-4" style={{ fontFamily: 'Oswald, sans-serif', fontSize: '1.1rem', color: headingColor }}>
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
              reason: "Joshua Jefferson is a matchup nightmare. Milan Momcilovic is the best 3-point shooter in the field. Defense ranks 4th in KenPom adjusted efficiency.",
              risk: "Dropped in Michigan's region. Could face tough matchup with Virginia or Tennessee in Sweet 16.",
            },
            {
              team: 'Purdue (2-seed, West)',
              color: '#15803D',
              reason: "Best offensive efficiency in KenPom era history. Braden Smith about to break Bobby Hurley's all-time assist record. Big Ten tournament champions.",
              risk: "Can't guard the ball. Talented perimeter scorers have punished them all season.",
            },
            {
              team: "St. John's (5-seed, East)",
              color: '#1D4ED8',
              reason: "Won both Big East season and tournament title. Rick Pitino has taken 3 different programs to the Final Four. Could shock Duke in the Sweet 16.",
              risk: "Unusual to be a 5-seed after winning the Big East. Northern Iowa is a dangerous first-round opponent.",
            },
          ].map((item) => (
            <div key={item.team} className="p-4 rounded-lg" style={{ borderColor: item.color + '40', border: `1px solid ${item.color + '40'}`, backgroundColor: isDark ? item.color + '12' : item.color + '08' }}>
              <div className="font-bold mb-2" style={{ fontFamily: 'Oswald, sans-serif', color: item.color }}>{item.team}</div>
              <div className="text-xs mb-2 leading-relaxed" style={{ color: bodyText }}>
                <strong style={{ color: headingColor }}>Why they can go deep:</strong> {item.reason}
              </div>
              <div className="text-xs leading-relaxed" style={{ color: isDark ? '#F87171' : '#DC2626' }}>
                <strong>Risk:</strong> {item.risk}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Injury Report */}
      <div className="rounded-xl shadow-sm p-5" style={{ backgroundColor: cardBg, border: `1px solid ${cardBorder}` }}>
        <h3 className="font-bold mb-4" style={{ fontFamily: 'Oswald, sans-serif', fontSize: '1.1rem', color: headingColor }}>
          🏥 KEY INJURY REPORT
        </h3>
        <div className="space-y-3">
          {[
            { team: 'Duke', player: 'Patrick Ngongba II (C)', status: 'Questionable', detail: "Foot soreness. Expected back in early rounds. Critical for Duke's frontcourt depth.", color: '#1D4ED8' },
            { team: 'Duke', player: 'Caleb Foster (PG)', status: 'Out (early rounds)', detail: "Broken foot surgery. May return for Final Four. Duke will have playmaking pressure on Cameron Boozer.", color: '#1D4ED8' },
            { team: 'UCLA', player: 'Tyler Bilodeau & Donovan Dent', status: 'Questionable', detail: 'Both injured in Big Ten tournament. Their availability determines if UCLA can upset UCF.', color: '#1D4ED8' },
            { team: 'Louisville', player: 'Mikel Brown Jr. (G)', status: 'Questionable', detail: 'Back injury. Star freshman missed ACC tournament. His availability vs. South Florida is crucial.', color: '#1D4ED8' },
            { team: 'Texas Tech', player: 'JT Toppin (F)', status: 'Out for season', detail: "Torn ACL last month. Significantly lowers Texas Tech's ceiling and makes them vulnerable to Akron.", color: '#D97706' },
            { team: 'Arkansas', player: 'Karter Knox (F)', status: 'Out for season', detail: "Season-ending injury. Reduces Arkansas's depth heading into the Sweet 16 and beyond.", color: '#15803D' },
          ].map((item) => (
            <div key={`${item.team}-${item.player}`} className="flex items-start gap-3 p-3 rounded-lg" style={{ backgroundColor: injuryRowBg, border: `1px solid ${injuryRowBorder}` }}>
              <div className="flex-shrink-0 w-20 text-center">
                <span className="text-xs font-bold px-2 py-1 rounded text-white block" style={{ backgroundColor: item.color, fontFamily: 'Oswald, sans-serif' }}>
                  {item.team}
                </span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-semibold text-sm" style={{ color: injuryName }}>{item.player}</span>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full font-stat"
                    style={
                      item.status.includes('Out')
                        ? { backgroundColor: isDark ? 'oklch(0.22 0.08 25)' : '#FEE2E2', color: isDark ? '#FCA5A5' : '#B91C1C' }
                        : { backgroundColor: isDark ? 'oklch(0.24 0.08 60)' : '#FEF9C3', color: isDark ? '#FDE047' : '#92400E' }
                    }
                  >
                    {item.status}
                  </span>
                </div>
                <p className="text-xs" style={{ color: injuryDetail }}>{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
