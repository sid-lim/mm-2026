/*
 * BracketView: Full 68-team bracket with region-coded colors and win probability
 * Design: Modern Sports Analytics Dashboard
 */

import { useState } from 'react';
import { regions, finalFourPrediction, type Team, type Matchup, type RegionData } from '@/lib/bracketData';
import { useTheme } from '@/contexts/ThemeContext';

interface BracketViewProps {
  onTeamClick: (team: Team) => void;
}

function SeedBadge({ seed, color }: { seed: number; color: string }) {
  const isTopSeed = seed <= 4;
  return (
    <span
      className="seed-badge text-white mr-2 flex-shrink-0"
      style={{ backgroundColor: isTopSeed ? color : '#94A3B8' }}
    >
      {seed}
    </span>
  );
}

function WinProbBar({ prob, color, isDark }: { prob: number; color: string; isDark: boolean }) {
  return (
    <div className="w-full h-1 rounded-full overflow-hidden" style={{ backgroundColor: isDark ? 'oklch(0.28 0.015 240)' : 'oklch(0.94 0.005 240)' }}>
      <div className="h-full rounded-full win-prob-bar" style={{ width: `${prob}%`, backgroundColor: color }} />
    </div>
  );
}

function MatchupCard({ matchup, color, onTeamClick, isDark }: { matchup: Matchup; color: string; onTeamClick: (team: Team) => void; isDark: boolean }) {
  const { team1, team2, predictedWinner, winProb1, upsetAlert } = matchup;
  const winProb2 = 100 - winProb1;

  const cardBg = isDark ? 'oklch(0.20 0.02 240)' : 'white';
  const cardBorder = isDark ? 'oklch(0.30 0.015 240)' : 'oklch(0.88 0.008 240)';
  const hoverBg = isDark ? 'oklch(0.24 0.02 240)' : 'oklch(0.97 0.002 240)';
  const dividerColor = isDark ? 'oklch(0.26 0.015 240)' : 'oklch(0.93 0.005 240)';
  const textColor = isDark ? 'oklch(0.88 0.005 240)' : 'oklch(0.15 0.02 240)';
  const mutedColor = isDark ? 'oklch(0.55 0.015 240)' : 'oklch(0.55 0.015 240)';

  return (
    <div
      className="matchup-card rounded-lg overflow-hidden shadow-sm"
      style={{
        backgroundColor: cardBg,
        border: `1px solid ${cardBorder}`,
        borderLeftWidth: '3px',
        borderLeftColor: color,
      }}
    >
      {upsetAlert && (
        <div className="text-xs font-bold px-2 py-0.5 text-white" style={{ backgroundColor: '#F59E0B', fontFamily: 'Oswald, sans-serif' }}>
          ⚡ UPSET ALERT
        </div>
      )}
      <div
        className={`flex items-center px-2 py-1.5 cursor-pointer transition-colors ${predictedWinner === 1 ? '' : 'opacity-60'}`}
        style={{ '--hover-bg': hoverBg } as React.CSSProperties}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = hoverBg)}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
        onClick={() => onTeamClick(team1)}
      >
        <SeedBadge seed={team1.seed} color={color} />
        <span className="text-xs flex-1 truncate font-semibold" style={{ fontFamily: 'Oswald, sans-serif', color: textColor }}>{team1.shortName}</span>
        <span className="text-xs font-stat ml-1 flex-shrink-0" style={{ color: mutedColor }}>{team1.record}</span>
        {predictedWinner === 1 && <span className="ml-1 text-yellow-500 text-xs">★</span>}
      </div>
      <div className="px-2 pb-1"><WinProbBar prob={winProb1} color={color} isDark={isDark} /></div>
      <div className="mx-2" style={{ borderTop: `1px solid ${dividerColor}` }} />
      <div
        className={`flex items-center px-2 py-1.5 cursor-pointer transition-colors ${predictedWinner === 2 ? '' : 'opacity-60'}`}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = hoverBg)}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
        onClick={() => onTeamClick(team2)}
      >
        <SeedBadge seed={team2.seed} color={color} />
        <span className="text-xs flex-1 truncate font-semibold" style={{ fontFamily: 'Oswald, sans-serif', color: textColor }}>{team2.shortName}</span>
        <span className="text-xs font-stat ml-1 flex-shrink-0" style={{ color: mutedColor }}>{team2.record}</span>
        {predictedWinner === 2 && <span className="ml-1 text-yellow-500 text-xs">★</span>}
      </div>
      <div className="px-2 pb-1"><WinProbBar prob={winProb2} color={color} isDark={isDark} /></div>
      <div className="px-2 pb-1.5 flex justify-between items-center">
        <span className="text-xs font-stat" style={{ color: mutedColor }}>Win Prob</span>
        <span className="text-xs font-bold font-stat" style={{ color }}>
          {predictedWinner === 1 ? team1.shortName : team2.shortName}: {predictedWinner === 1 ? winProb1 : winProb2}%
        </span>
      </div>
    </div>
  );
}

function RegionSection({ region, onTeamClick, isDark }: { region: RegionData; onTeamClick: (team: Team) => void; isDark: boolean }) {
  const [expanded, setExpanded] = useState(true);

  const bodyBg = isDark ? 'oklch(0.17 0.02 240)' : 'white';
  const bodyBorder = isDark ? 'oklch(0.28 0.015 240)' : 'oklch(0.88 0.008 240)';
  const sectionDivider = isDark ? 'oklch(0.24 0.015 240)' : 'oklch(0.93 0.005 240)';
  const labelColor = isDark ? 'oklch(0.55 0.015 240)' : 'oklch(0.55 0.015 240)';
  const subLabelColor = isDark ? 'oklch(0.65 0.01 240)' : 'oklch(0.45 0.015 240)';

  return (
    <div className="mb-8">
      {/* Region Header */}
      <div
        className="flex items-center justify-between px-4 py-3 rounded-t-xl cursor-pointer"
        style={{ backgroundColor: region.color }}
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-3">
          <span className="text-white text-xl font-bold" style={{ fontFamily: 'Oswald, sans-serif', letterSpacing: '0.1em' }}>
            {region.name.toUpperCase()} REGION
          </span>
          <span className="text-white/70 text-sm">No. 1 Seed: {region.seed1}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-white/80 text-sm font-stat">Predicted Winner: <strong className="text-white">{region.finalFour}</strong></span>
          <span className="text-white text-lg">{expanded ? '▲' : '▼'}</span>
        </div>
      </div>

      {expanded && (
        <div
          className="rounded-b-xl shadow-sm p-4"
          style={{
            backgroundColor: bodyBg,
            border: `1px solid ${bodyBorder}`,
            borderTop: 'none',
          }}
        >
          {/* First Round Matchups */}
          <div className="mb-6">
            <h3 className="text-xs font-bold uppercase tracking-wider mb-3 font-stat" style={{ color: labelColor }}>First Round (Round of 64)</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {region.matchups.map((matchup) => (
                <MatchupCard key={matchup.id} matchup={matchup} color={region.color} onTeamClick={onTeamClick} isDark={isDark} />
              ))}
            </div>
          </div>

          {/* Second Round (Round of 32) */}
          <div className="mb-6 pt-4" style={{ borderTop: `1px solid ${sectionDivider}` }}>
            <h3 className="text-xs font-bold uppercase tracking-wider mb-3 font-stat" style={{ color: labelColor }}>Second Round (Round of 32)</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {region.round32Matchups.map((matchup) => (
                <MatchupCard key={matchup.id} matchup={matchup} color={region.color} onTeamClick={onTeamClick} isDark={isDark} />
              ))}
            </div>
          </div>

          {/* Sweet 16 */}
          <div className="pt-4 mb-4" style={{ borderTop: `1px solid ${sectionDivider}` }}>
            <h3 className="text-xs font-bold uppercase tracking-wider mb-3 font-stat" style={{ color: labelColor }}>Sweet 16 (Regional Semifinals)</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {region.eliteEightMatchups.map((matchup) => (
                <MatchupCard key={matchup.id} matchup={matchup} color={region.color} onTeamClick={onTeamClick} isDark={isDark} />
              ))}
            </div>
          </div>

          {/* Elite Eight */}
          <div className="pt-4 mb-4" style={{ borderTop: `1px solid ${sectionDivider}` }}>
            <h3 className="text-xs font-bold uppercase tracking-wider mb-3 font-stat" style={{ color: labelColor }}>Elite Eight (Regional Finals)</h3>
            <div className="grid grid-cols-1 gap-3">
              <MatchupCard matchup={region.regionalFinals} color={region.color} onTeamClick={onTeamClick} isDark={isDark} />
            </div>
          </div>

          {/* Predicted Progression Summary */}
          <div className="pt-4" style={{ borderTop: `1px solid ${sectionDivider}` }}>
            <h3 className="text-xs font-bold uppercase tracking-wider mb-3 font-stat" style={{ color: labelColor }}>Predicted Progression Summary</h3>
            <div className="grid grid-cols-3 gap-3">
              {/* Sweet 16 */}
              <div>
                <div className="text-xs font-semibold mb-2" style={{ fontFamily: 'Oswald, sans-serif', color: subLabelColor }}>Sweet 16 (4 teams per region)</div>
                <div className="space-y-1">
                  {region.sweetSixteen.map((team) => (
                    <div key={team} className="flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold text-white" style={{ backgroundColor: region.color, fontFamily: 'Oswald, sans-serif' }}>
                      <span>→</span> {team}
                    </div>
                  ))}
                </div>
              </div>
              {/* Elite 8 Teams */}
              <div>
                <div className="text-xs font-semibold mb-2" style={{ fontFamily: 'Oswald, sans-serif', color: subLabelColor }}>Elite Eight (2 teams per region)</div>
                <div className="space-y-1">
                  {region.eliteEightMatchups.map((matchup) => {
                    const winner = matchup.predictedWinner === 1 ? matchup.team1.shortName : matchup.team2.shortName;
                    return (
                      <div key={matchup.id} className="flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold text-white" style={{ backgroundColor: region.color, fontFamily: 'Oswald, sans-serif' }}>
                        <span>→</span> {winner}
                      </div>
                    );
                  })}
                </div>
              </div>
              {/* Final Four */}
              <div>
                <div className="text-xs font-semibold mb-2" style={{ fontFamily: 'Oswald, sans-serif', color: subLabelColor }}>Final Four (1 team per region)</div>
                <div className="px-2 py-1 rounded-md text-xs font-bold text-white text-center animate-pulse-glow" style={{ backgroundColor: region.color, fontFamily: 'Oswald, sans-serif', boxShadow: `0 0 12px ${region.color}40` }}>
                  🏆 {region.finalFour}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function BracketView({ onTeamClick }: BracketViewProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const introBg = isDark ? 'oklch(0.20 0.02 240)' : 'oklch(0.25 0.02 240)';

  return (
    <div>
      {/* Intro Banner */}
      <div className="rounded-xl p-4 mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4" style={{ backgroundColor: introBg }}>
        <div>
          <h2 className="text-white text-lg font-bold" style={{ fontFamily: 'Oswald, sans-serif' }}>
            STATISTICAL BRACKET PREDICTIONS
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            All 4 rounds: First Round (64 teams) → Second Round (32 teams) → Elite Eight (8 teams) → Final Four (4 teams) → Championship. Click any team for detailed stats.
          </p>
        </div>
        <div className="flex gap-3 flex-shrink-0">
          <div className="text-center">
            <div className="text-white font-bold text-lg" style={{ fontFamily: 'Oswald, sans-serif' }}>Duke</div>
            <div className="text-slate-400 text-xs">Predicted Champion</div>
          </div>
          <div className="w-px bg-slate-600" />
          <div className="text-center">
            <div className="text-white font-bold text-lg" style={{ fontFamily: 'Oswald, sans-serif' }}>Michigan</div>
            <div className="text-slate-400 text-xs">Runner-Up</div>
          </div>
        </div>
      </div>

      {/* Region Brackets */}
      {regions.map((region) => (
        <RegionSection key={region.name} region={region} onTeamClick={onTeamClick} isDark={isDark} />
      ))}

      {/* Final Four */}
      <div className="mt-8 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700">
        <h2 className="text-white text-2xl font-bold text-center mb-6" style={{ fontFamily: 'Oswald, sans-serif', letterSpacing: '0.1em' }}>
          🏆 FINAL FOUR &amp; CHAMPIONSHIP PREDICTIONS
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* Semifinal 1 */}
          <div className="bg-white/10 rounded-xl p-4 border border-white/20">
            <div className="text-slate-400 text-xs uppercase tracking-wider mb-3 font-stat">Semifinal 1 (East vs South)</div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-white font-bold" style={{ fontFamily: 'Oswald, sans-serif' }}>{finalFourPrediction.matchup1.team1}</span>
                <span className="text-slate-400 font-stat text-sm">{finalFourPrediction.matchup1.winProb}%</span>
              </div>
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${finalFourPrediction.matchup1.winProb}%`, backgroundColor: '#1D4ED8' }} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400" style={{ fontFamily: 'Oswald, sans-serif' }}>{finalFourPrediction.matchup1.team2}</span>
                <span className="text-slate-500 font-stat text-sm">{100 - finalFourPrediction.matchup1.winProb}%</span>
              </div>
            </div>
            <div className="mt-3 text-center">
              <span className="text-yellow-400 font-bold text-sm" style={{ fontFamily: 'Oswald, sans-serif' }}>
                ★ {finalFourPrediction.matchup1.winner} ADVANCES
              </span>
            </div>
          </div>

          {/* Championship */}
          <div className="bg-gradient-to-b from-yellow-500/20 to-yellow-600/10 rounded-xl p-5 border border-yellow-500/40 text-center">
            <div className="text-yellow-400 text-xs uppercase tracking-wider mb-3 font-stat">🏆 National Championship</div>
            <div className="text-white text-3xl font-bold mb-1" style={{ fontFamily: 'Oswald, sans-serif' }}>
              {finalFourPrediction.championship.winner}
            </div>
            <div className="text-yellow-400 text-sm mb-3 font-stat">Predicted Champion</div>
            <div className="text-slate-400 text-xs">
              {finalFourPrediction.championship.team1} vs {finalFourPrediction.championship.team2}
            </div>
            <div className="text-slate-400 text-xs font-stat mt-1">
              Win Probability: {finalFourPrediction.championship.winProb}%
            </div>
            <div className="mt-3 text-xs text-slate-500">
              Indianapolis, Indiana &bull; April 6, 2026
            </div>
          </div>

          {/* Semifinal 2 */}
          <div className="bg-white/10 rounded-xl p-4 border border-white/20">
            <div className="text-slate-400 text-xs uppercase tracking-wider mb-3 font-stat">Semifinal 2 (Midwest vs West)</div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-white font-bold" style={{ fontFamily: 'Oswald, sans-serif' }}>{finalFourPrediction.matchup2.team1}</span>
                <span className="text-slate-400 font-stat text-sm">{finalFourPrediction.matchup2.winProb}%</span>
              </div>
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${finalFourPrediction.matchup2.winProb}%`, backgroundColor: '#D97706' }} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400" style={{ fontFamily: 'Oswald, sans-serif' }}>{finalFourPrediction.matchup2.team2}</span>
                <span className="text-slate-500 font-stat text-sm">{100 - finalFourPrediction.matchup2.winProb}%</span>
              </div>
            </div>
            <div className="mt-3 text-center">
              <span className="text-yellow-400 font-bold text-sm" style={{ fontFamily: 'Oswald, sans-serif' }}>
                ★ {finalFourPrediction.matchup2.winner} ADVANCES
              </span>
            </div>
          </div>
        </div>

        {/* Final Four Teams */}
        <div className="mt-6 pt-6 border-t border-white/10">
          <div className="text-slate-400 text-xs uppercase tracking-wider text-center mb-4 font-stat">Predicted Final Four</div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {regions.map((r) => (
              <div key={r.name} className="text-center p-3 rounded-lg border" style={{ borderColor: r.color + '60', backgroundColor: r.color + '15' }}>
                <div className="text-xs text-slate-400 mb-1 font-stat">{r.name}</div>
                <div className="font-bold text-white" style={{ fontFamily: 'Oswald, sans-serif', color: r.color === '#D97706' ? '#FCD34D' : 'white' }}>
                  {r.finalFour}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Methodology Note */}
      <div
        className="mt-6 rounded-xl p-4"
        style={{
          backgroundColor: isDark ? 'oklch(0.18 0.04 264)' : 'oklch(0.96 0.02 264)',
          border: `1px solid ${isDark ? 'oklch(0.30 0.06 264)' : 'oklch(0.82 0.06 264)'}`,
        }}
      >
        <h3
          className="font-bold text-sm mb-2"
          style={{ fontFamily: 'Oswald, sans-serif', color: isDark ? 'oklch(0.75 0.12 264)' : 'oklch(0.35 0.15 264)' }}
        >
          📐 PREDICTION METHODOLOGY
        </h3>
        <p className="text-xs leading-relaxed" style={{ color: isDark ? 'oklch(0.65 0.08 264)' : 'oklch(0.40 0.12 264)' }}>
          Bracket predictions are based on <strong>KenPom adjusted efficiency ratings</strong> (offensive and defensive efficiency per 100 possessions),
          team win-loss records, injury reports, conference strength, and expert analysis from The Ringer and NCAA.com.
          Win probabilities are calculated from KenPom differential — a difference of 10 KenPom spots roughly translates to a 25% win probability edge.
          Upset alerts indicate matchups where advanced metrics suggest a higher upset probability than the seed differential implies.
        </p>
      </div>
    </div>
  );
}
