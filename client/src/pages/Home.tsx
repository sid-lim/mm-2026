/*
 * Design: Modern Sports Analytics Dashboard
 * - Clean white base, region-coded colors (East=Blue, West=Green, South=Red, Midwest=Amber)
 * - Oswald headings, Nunito Sans body, JetBrains Mono for stats
 * - Bracket as central interactive element with integrated KenPom stats
 */

import { useState } from 'react';
import BracketView from '@/components/BracketView';
import StatsView from '@/components/StatsView';
import UpsetPicksView from '@/components/UpsetPicksView';
import TeamModal from '@/components/TeamModal';
import type { Team } from '@/lib/bracketData';

type Tab = 'bracket' | 'stats' | 'upsets';

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>('bracket');
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      {/* Hero Banner */}
      <header
        className="relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, #0D1B2A 0%, #1B2A4A 50%, #0D1B2A 100%)`,
          minHeight: '220px',
        }}
      >
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url(https://d2xsxph8kpxj0f.cloudfront.net/310519663444296833/dpAza5ssV5Dm4qUfyQxHpi/march-madness-hero-Wt8pBDYfbtHMRw83zYk5UP.webp)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="relative z-10 container py-8 md:py-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-semibold tracking-widest text-orange-400 uppercase font-stat">
                  NCAA Men's Basketball
                </span>
              </div>
              <h1
                className="text-4xl md:text-6xl font-bold text-white leading-none tracking-wide"
                style={{ fontFamily: 'Oswald, sans-serif' }}
              >
                MARCH MADNESS
                <span className="text-orange-400 ml-3">2026</span>
              </h1>
              <p className="text-slate-300 mt-2 text-sm md:text-base font-light">
                Statistical bracket predictions powered by KenPom ratings &bull; Selection Sunday: March 15, 2026
              </p>
            </div>
            <div className="flex gap-4 text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/20">
                <div className="text-2xl font-bold text-white" style={{ fontFamily: 'Oswald, sans-serif' }}>68</div>
                <div className="text-xs text-slate-400 uppercase tracking-wide">Teams</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/20">
                <div className="text-2xl font-bold text-orange-400" style={{ fontFamily: 'Oswald, sans-serif' }}>Duke</div>
                <div className="text-xs text-slate-400 uppercase tracking-wide">#1 Overall</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/20">
                <div className="text-2xl font-bold text-white" style={{ fontFamily: 'Oswald, sans-serif' }}>Duke</div>
                <div className="text-xs text-slate-400 uppercase tracking-wide">Predicted Champ</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
        <div className="container">
          <nav className="flex gap-0">
            {[
              { id: 'bracket' as Tab, label: 'Full Bracket', icon: '🏀' },
              { id: 'stats' as Tab, label: 'Team Statistics', icon: '📊' },
              { id: 'upsets' as Tab, label: 'Upset Picks', icon: '⚡' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-4 text-sm font-semibold transition-all border-b-2 -mb-px ${
                  activeTab === tab.id
                    ? 'border-blue-700 text-blue-700'
                    : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
                }`}
                style={{ fontFamily: 'Oswald, sans-serif', letterSpacing: '0.05em' }}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="container py-6">
        {activeTab === 'bracket' && (
          <BracketView onTeamClick={setSelectedTeam} />
        )}
        {activeTab === 'stats' && (
          <StatsView onTeamClick={setSelectedTeam} />
        )}
        {activeTab === 'upsets' && (
          <UpsetPicksView />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 mt-12">
        <div className="container text-center">
          <p className="text-sm">
            <span style={{ fontFamily: 'Oswald, sans-serif' }} className="text-white text-base">2026 NCAA March Madness Bracket</span>
          </p>
          <p className="text-xs mt-2">
            Predictions based on KenPom efficiency ratings, team records, and expert analysis from The Ringer, NCAA.com, and Yahoo Sports.
            Bracket data current as of Selection Sunday, March 15, 2026.
          </p>
          <p className="text-xs mt-1 text-slate-600">
            Not affiliated with the NCAA. For entertainment purposes only.
          </p>
        </div>
      </footer>

      {/* Team Detail Modal */}
      {selectedTeam && (
        <TeamModal team={selectedTeam} onClose={() => setSelectedTeam(null)} />
      )}
    </div>
  );
}
