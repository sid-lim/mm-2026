/*
 * TeamModal: Detailed team statistics modal
 * Design: Modern Sports Analytics Dashboard
 */

import { useEffect } from 'react';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import type { Team } from '@/lib/bracketData';
import { useTheme } from '@/contexts/ThemeContext';

interface TeamModalProps {
  team: Team;
  onClose: () => void;
}

const regionColorMap: Record<string, string> = {
  East: '#1D4ED8',
  West: '#15803D',
  South: '#B91C1C',
  Midwest: '#D97706',
};

function getRegionFromTeam(teamName: string): string {
  const regionMap: Record<string, string> = {
    'Duke': 'East', 'Ohio State': 'East', "St. John's": 'East', 'Kansas': 'East',
    'Louisville': 'East', 'Michigan State': 'East', 'UCLA': 'East', 'UConn': 'East',
    'Siena': 'East', 'TCU': 'East', 'Northern Iowa': 'East', 'Cal Baptist': 'East',
    'South Florida': 'East', 'North Dakota State': 'East', 'UCF': 'East', 'Furman': 'East',
    'Arizona': 'West', 'Villanova': 'West', 'Wisconsin': 'West', 'Arkansas': 'West',
    'BYU': 'West', 'Gonzaga': 'West', 'Miami (FL)': 'West', 'Purdue': 'West',
    'LIU': 'West', 'Utah State': 'West', 'High Point': 'West', 'Hawaii': 'West',
    'NC State': 'West', 'Kennesaw State': 'West', 'Missouri': 'West', 'Queens (N.C.)': 'West',
    'Florida': 'South', 'Clemson': 'South', 'Vanderbilt': 'South', 'Nebraska': 'South',
    'North Carolina': 'South', 'Illinois': 'South', "Saint Mary's": 'South', 'Houston': 'South',
    'Prairie View A&M': 'South', 'Iowa': 'South', 'McNeese': 'South', 'Troy': 'South',
    'VCU': 'South', 'Penn': 'South', 'Texas A&M': 'South', 'Idaho': 'South',
    'Michigan': 'Midwest', 'Georgia': 'Midwest', 'Texas Tech': 'Midwest', 'Alabama': 'Midwest',
    'Tennessee': 'Midwest', 'Virginia': 'Midwest', 'Kentucky': 'Midwest', 'Iowa State': 'Midwest',
    'UMBC': 'Midwest', 'Saint Louis': 'Midwest', 'Akron': 'Midwest', 'Hofstra': 'Midwest',
    'Miami (OH)': 'Midwest', 'Wright State': 'Midwest', 'Santa Clara': 'Midwest', 'Tennessee State': 'Midwest',
  };
  return regionMap[teamName] || 'East';
}

export default function TeamModal({ team, onClose }: TeamModalProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const region = getRegionFromTeam(team.name);
  const regionColor = regionColorMap[region] || '#1D4ED8';

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  // Radar chart data (inverted: lower rank = higher score)
  const radarData = [
    { subject: 'Overall', value: Math.max(5, Math.round(100 - (team.kenpom / 3))) },
    { subject: 'Offense', value: Math.max(5, Math.round(100 - (team.offKenpom / 3))) },
    { subject: 'Defense', value: Math.max(5, Math.round(100 - (team.defKenpom / 3))) },
    { subject: 'Seed Value', value: Math.max(5, Math.round(100 - (team.seed * 5))) },
    { subject: 'Experience', value: Math.min(95, 50 + Math.random() * 40) },
  ];

  const modalBg = isDark ? 'oklch(0.18 0.02 240)' : 'white';
  const statCardBg = isDark ? 'oklch(0.24 0.02 240)' : 'oklch(0.97 0.002 240)';
  const statCardBorder = isDark ? 'oklch(0.30 0.015 240)' : 'oklch(0.93 0.005 240)';
  const labelColor = isDark ? 'oklch(0.55 0.015 240)' : 'oklch(0.55 0.015 240)';
  const barTrack = isDark ? 'oklch(0.28 0.015 240)' : 'oklch(0.94 0.005 240)';
  const barLabel = isDark ? 'oklch(0.65 0.01 240)' : 'oklch(0.45 0.015 240)';
  const sectionHeading = isDark ? 'oklch(0.75 0.01 240)' : 'oklch(0.35 0.02 240)';
  const radarGrid = isDark ? 'oklch(0.30 0.015 240)' : '#E2E8F0';
  const radarTick = isDark ? '#94A3B8' : '#475569';
  const keyPlayerBg = isDark ? 'oklch(0.22 0.02 240)' : 'oklch(0.97 0.002 240)';
  const keyPlayerBorder = isDark ? 'oklch(0.30 0.015 240)' : 'oklch(0.93 0.005 240)';
  const keyPlayerName = isDark ? 'oklch(0.88 0.005 240)' : 'oklch(0.15 0.02 240)';
  const notesBg = isDark ? regionColor + '18' : regionColor + '08';
  const notesBorder = isDark ? regionColor + '50' : regionColor + '30';
  const notesText = isDark ? 'oklch(0.75 0.01 240)' : 'oklch(0.35 0.02 240)';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div
        className="relative rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-fade-in-up"
        style={{ backgroundColor: modalBg }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 text-white" style={{ backgroundColor: regionColor }}>
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <span className="seed-badge text-white bg-white/30 text-sm">{team.seed}</span>
                <span className="text-xs text-white/70 uppercase tracking-wider font-stat">{region} Region</span>
              </div>
              <h2 className="text-3xl font-bold" style={{ fontFamily: 'Oswald, sans-serif', letterSpacing: '0.05em' }}>
                {team.name}
              </h2>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-white/80 font-stat text-sm">{team.record}</span>
                {team.conference && <span className="text-white/60 text-sm">{team.conference}</span>}
              </div>
            </div>
            <button onClick={onClose} className="text-white/70 hover:text-white text-2xl leading-none p-1">
              ✕
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="p-6">
          {/* KenPom Rankings */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            {[
              { label: 'Overall KenPom', value: `#${team.kenpom}`, color: regionColor },
              { label: 'Offensive Rank', value: `#${team.offKenpom}`, color: '#15803D' },
              { label: 'Defensive Rank', value: `#${team.defKenpom}`, color: '#1D4ED8' },
            ].map((stat) => (
              <div key={stat.label} className="text-center p-3 rounded-xl" style={{ backgroundColor: statCardBg, border: `1px solid ${statCardBorder}` }}>
                <div className="text-xl font-bold font-stat" style={{ color: stat.color }}>{stat.value}</div>
                <div className="text-xs mt-0.5" style={{ color: labelColor }}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Radar Chart */}
          <div className="mb-4">
            <h3 className="text-sm font-bold mb-2" style={{ fontFamily: 'Oswald, sans-serif', color: sectionHeading }}>TEAM PROFILE</h3>
            <ResponsiveContainer width="100%" height={200}>
              <RadarChart data={radarData}>
                <PolarGrid stroke={radarGrid} />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fontFamily: 'Nunito Sans, sans-serif', fill: radarTick }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar name={team.name} dataKey="value" stroke={regionColor} fill={regionColor} fillOpacity={0.25} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Efficiency Bars */}
          <div className="space-y-3 mb-5">
            {[
              { label: 'Offensive Efficiency', rank: team.offKenpom, color: '#15803D', max: 200 },
              { label: 'Defensive Efficiency', rank: team.defKenpom, color: '#1D4ED8', max: 200 },
              { label: 'Overall Rating', rank: team.kenpom, color: regionColor, max: 200 },
            ].map((bar) => (
              <div key={bar.label}>
                <div className="flex justify-between text-xs mb-1">
                  <span style={{ color: barLabel }}>{bar.label}</span>
                  <span className="font-stat font-bold" style={{ color: bar.color }}>#{bar.rank}</span>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: barTrack }}>
                  <div
                    className="h-full rounded-full win-prob-bar"
                    style={{ width: `${Math.max(5, Math.round((1 - bar.rank / bar.max) * 100))}%`, backgroundColor: bar.color }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Key Player & Notes */}
          {team.keyPlayer && (
            <div className="mb-3 p-3 rounded-lg" style={{ backgroundColor: keyPlayerBg, border: `1px solid ${keyPlayerBorder}` }}>
              <div className="text-xs font-semibold uppercase tracking-wider mb-1 font-stat" style={{ color: labelColor }}>Key Player</div>
              <div className="font-bold" style={{ fontFamily: 'Oswald, sans-serif', color: keyPlayerName }}>{team.keyPlayer}</div>
            </div>
          )}
          {team.notes && (
            <div className="p-3 rounded-lg" style={{ backgroundColor: notesBg, border: `1px solid ${notesBorder}` }}>
              <div className="text-xs font-semibold uppercase tracking-wider mb-1 font-stat" style={{ color: regionColor }}>Analysis</div>
              <p className="text-sm leading-relaxed" style={{ color: notesText }}>{team.notes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
