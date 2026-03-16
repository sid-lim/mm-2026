/*
 * StatsView: KenPom rankings, efficiency charts, conference breakdown
 * Design: Modern Sports Analytics Dashboard
 */

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, PieChart, Pie, Cell, Legend } from 'recharts';
import { topTeamsKenpom, conferenceBreakdown, regions, type Team } from '@/lib/bracketData';

interface StatsViewProps {
  onTeamClick: (team: Team) => void;
}

const regionColorMap: Record<string, string> = {
  East: '#1D4ED8',
  West: '#15803D',
  South: '#B91C1C',
  Midwest: '#D97706',
};

function KenPomTable({ onTeamClick }: { onTeamClick: (team: Team) => void }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
        <h3 className="font-bold text-slate-800" style={{ fontFamily: 'Oswald, sans-serif', fontSize: '1.1rem' }}>
          TOP 12 TEAMS BY KENPOM RATING
        </h3>
        <span className="text-xs text-slate-500 font-stat">Lower rank = better</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="text-left px-4 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wider font-stat">Rank</th>
              <th className="text-left px-4 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wider font-stat">Team</th>
              <th className="text-center px-4 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wider font-stat">Seed</th>
              <th className="text-center px-4 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wider font-stat">Region</th>
              <th className="text-center px-4 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wider font-stat">Record</th>
              <th className="text-center px-4 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wider font-stat">Off. Rank</th>
              <th className="text-center px-4 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wider font-stat">Def. Rank</th>
              <th className="text-left px-4 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wider font-stat">Efficiency Profile</th>
            </tr>
          </thead>
          <tbody>
            {topTeamsKenpom.map((team, i) => {
              const regionColor = regionColorMap[team.region] || '#6B7280';
              const offWidth = Math.max(5, Math.round(100 - (team.offRank / 60) * 100));
              const defWidth = Math.max(5, Math.round(100 - (team.defRank / 60) * 100));
              return (
                <tr key={team.name} className={`border-b border-slate-100 hover:bg-slate-50 transition-colors ${i < 4 ? 'bg-blue-50/30' : ''}`}>
                  <td className="px-4 py-3">
                    <span className="font-bold font-stat text-slate-700" style={{ color: i < 4 ? regionColor : undefined }}>
                      #{team.rank}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-bold" style={{ fontFamily: 'Oswald, sans-serif', color: regionColor }}>
                      {team.name}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="seed-badge text-white" style={{ backgroundColor: team.seed <= 2 ? regionColor : '#94A3B8' }}>
                      {team.seed}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: regionColor }}>
                      {team.region}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center font-stat text-slate-600 text-xs">{team.record}</td>
                  <td className="px-4 py-3 text-center font-stat font-bold text-xs" style={{ color: team.offRank <= 10 ? '#15803D' : '#6B7280' }}>
                    #{team.offRank}
                  </td>
                  <td className="px-4 py-3 text-center font-stat font-bold text-xs" style={{ color: team.defRank <= 10 ? '#1D4ED8' : '#6B7280' }}>
                    #{team.defRank}
                  </td>
                  <td className="px-4 py-3 min-w-[140px]">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-400 w-6 font-stat">OFF</span>
                        <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${offWidth}%`, backgroundColor: '#15803D' }} />
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-400 w-6 font-stat">DEF</span>
                        <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${defWidth}%`, backgroundColor: '#1D4ED8' }} />
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function KenPomBarChart() {
  const data = topTeamsKenpom.slice(0, 10).map((t) => ({
    name: t.name.length > 10 ? t.name.slice(0, 10) : t.name,
    'Off. Rank': t.offRank,
    'Def. Rank': t.defRank,
    region: t.region,
  }));

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
      <h3 className="font-bold text-slate-800 mb-1" style={{ fontFamily: 'Oswald, sans-serif', fontSize: '1.1rem' }}>
        OFFENSIVE vs DEFENSIVE KENPOM RANKINGS
      </h3>
      <p className="text-xs text-slate-500 mb-4 font-stat">Lower rank = better efficiency</p>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 40 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
          <XAxis dataKey="name" tick={{ fontSize: 11, fontFamily: 'Oswald, sans-serif' }} angle={-35} textAnchor="end" interval={0} />
          <YAxis tick={{ fontSize: 11, fontFamily: 'JetBrains Mono, monospace' }} label={{ value: 'KenPom Rank', angle: -90, position: 'insideLeft', style: { fontSize: 10 } }} />
          <Tooltip
            contentStyle={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: 12, borderRadius: 8 }}
            formatter={(value, name) => [`#${value}`, name]}
          />
          <Legend wrapperStyle={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: 12, paddingTop: 8 }} />
          <Bar dataKey="Off. Rank" fill="#15803D" radius={[3, 3, 0, 0]} />
          <Bar dataKey="Def. Rank" fill="#1D4ED8" radius={[3, 3, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function ConferenceChart() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
      <h3 className="font-bold text-slate-800 mb-1" style={{ fontFamily: 'Oswald, sans-serif', fontSize: '1.1rem' }}>
        CONFERENCE REPRESENTATION
      </h3>
      <p className="text-xs text-slate-500 mb-4 font-stat">Number of teams in the 2026 field</p>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={conferenceBreakdown}
            cx="50%"
            cy="50%"
            outerRadius={100}
            dataKey="bids"
            nameKey="conference"
            label={({ conference, bids }) => `${conference}: ${bids}`}
            labelLine={true}
          >
            {conferenceBreakdown.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: 12, borderRadius: 8 }}
            formatter={(value) => [`${value} teams`]}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

function RegionStrengthChart() {
  const regionData = regions.map((r) => {
    const avgKenpom = r.matchups.reduce((sum, m) => sum + m.team1.kenpom, 0) / r.matchups.length;
    const topTeamKenpom = Math.min(...r.matchups.map((m) => m.team1.kenpom));
    return {
      region: r.name,
      'Avg KenPom (top 4 seeds)': Math.round(avgKenpom),
      'Best Team KenPom': topTeamKenpom,
      color: r.color,
    };
  });

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
      <h3 className="font-bold text-slate-800 mb-1" style={{ fontFamily: 'Oswald, sans-serif', fontSize: '1.1rem' }}>
        REGION STRENGTH COMPARISON
      </h3>
      <p className="text-xs text-slate-500 mb-4 font-stat">Average KenPom rank of top seeds per region (lower = stronger)</p>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={regionData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
          <XAxis dataKey="region" tick={{ fontSize: 12, fontFamily: 'Oswald, sans-serif' }} />
          <YAxis tick={{ fontSize: 11, fontFamily: 'JetBrains Mono, monospace' }} />
          <Tooltip
            contentStyle={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: 12, borderRadius: 8 }}
            formatter={(value, name) => [`#${value}`, name]}
          />
          <Bar dataKey="Avg KenPom (top 4 seeds)" radius={[4, 4, 0, 0]}>
            {regionData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-3 grid grid-cols-4 gap-2">
        {regionData.map((r) => (
          <div key={r.region} className="text-center p-2 rounded-lg" style={{ backgroundColor: r.color + '15' }}>
            <div className="text-xs font-bold" style={{ color: r.color, fontFamily: 'Oswald, sans-serif' }}>{r.region}</div>
            <div className="text-xs font-stat text-slate-600">Avg: #{r['Avg KenPom (top 4 seeds)']}</div>
            <div className="text-xs font-stat text-slate-600">Best: #{r['Best Team KenPom']}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function KeyStatsCards() {
  const stats = [
    { label: 'Best Overall KenPom', value: 'Duke', sub: '#1 Overall, #1 Defense', color: '#1D4ED8' },
    { label: 'Best Offense (KenPom)', value: 'Illinois', sub: '#1 Off. — 131.1 pts/100', color: '#B91C1C' },
    { label: 'Best Defense (KenPom)', value: 'Duke', sub: '#1 Def. — Elite perimeter D', color: '#1D4ED8' },
    { label: 'Best Record', value: 'Duke / Arizona', sub: '32-2 each', color: '#7C3AED' },
    { label: 'Defending Champion', value: 'Florida', sub: '26-7 record, #4 KenPom', color: '#B91C1C' },
    { label: 'Longest Win Streak', value: 'High Point', sub: '14 games (12-seed)', color: '#D97706' },
    { label: 'Most Consec. Appearances', value: 'Kansas', sub: '36th consecutive', color: '#15803D' },
    { label: 'Predicted Champion', value: 'Duke', sub: 'KenPom #1, 55% win prob', color: '#F59E0B' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
      {stats.map((s) => (
        <div key={s.label} className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <div className="text-xs text-slate-500 uppercase tracking-wider mb-1 font-stat">{s.label}</div>
          <div className="font-bold text-base" style={{ fontFamily: 'Oswald, sans-serif', color: s.color }}>{s.value}</div>
          <div className="text-xs text-slate-500 mt-0.5">{s.sub}</div>
        </div>
      ))}
    </div>
  );
}

export default function StatsView({ onTeamClick }: StatsViewProps) {
  return (
    <div className="space-y-6">
      <KeyStatsCards />
      <KenPomTable onTeamClick={onTeamClick} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <KenPomBarChart />
        <ConferenceChart />
      </div>
      <RegionStrengthChart />

      {/* Notable Stats */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
        <h3 className="font-bold text-slate-800 mb-4" style={{ fontFamily: 'Oswald, sans-serif', fontSize: '1.1rem' }}>
          NOTABLE STATISTICAL STORYLINES
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { icon: '🏀', title: 'Illinois Historic Offense', desc: 'The Fighting Illini rank #1 in KenPom offensive efficiency at 131.1 points per 100 possessions — the best in KenPom history dating back to 1997. However, they are 0-4 in overtime games this season.' },
            { icon: '🛡️', title: 'Duke\'s Elite Defense', desc: 'Duke\'s defense ranks #1 in KenPom adjusted defensive efficiency. Cameron Boozer is the best big man in the tournament and arguably the best passer regardless of position.' },
            { icon: '📈', title: 'Purdue\'s Record Offense', desc: 'Purdue currently has the best offensive efficiency in KenPom era history. Braden Smith needs just 2 assists to break Bobby Hurley\'s all-time NCAA assist record.' },
            { icon: '⚡', title: 'AJ Dybantsa Factor', desc: 'BYU\'s AJ Dybantsa is considered the best player in the tournament and projected #1 NBA draft pick (ahead of Kansas\'s Darryn Peterson). His performance could carry BYU deep.' },
            { icon: '🔄', title: 'Florida\'s Shooting Turnaround', desc: 'Florida ranked 349th in 3-point shooting through January but has ranked 65th since February. Guards Boogie Fland and Xaivian Lee improved from 23.4% to 32.6% from deep.' },
            { icon: '🏆', title: 'Houston\'s Home Advantage', desc: 'Houston\'s Toyota Center (home arena) is just 3 miles from the South Regional site. The Cougars have made 6 consecutive Sweet 16s — the longest active streak in the country.' },
          ].map((item) => (
            <div key={item.title} className="flex gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100">
              <span className="text-2xl flex-shrink-0">{item.icon}</span>
              <div>
                <div className="font-bold text-slate-800 text-sm" style={{ fontFamily: 'Oswald, sans-serif' }}>{item.title}</div>
                <div className="text-xs text-slate-600 mt-1 leading-relaxed">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
