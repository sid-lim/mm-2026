// 2026 NCAA March Madness Bracket Data
// Sources: NCAA.com, KenPom ratings via Yahoo Sports, The Ringer analysis
// Selection Sunday: March 15, 2026

export type Region = 'East' | 'West' | 'South' | 'Midwest';

export interface Team {
  seed: number;
  name: string;
  shortName: string;
  record: string;
  kenpom: number;
  offKenpom: number;
  defKenpom: number;
  conference: string;
  keyPlayer?: string;
  notes?: string;
}

export interface Matchup {
  id: string;
  team1: Team;
  team2: Team;
  predictedWinner: 1 | 2;
  winProb1: number; // 0-100
  upsetAlert?: boolean;
}

export interface RegionData {
  name: Region;
  color: string;
  colorLight: string;
  borderColor: string;
  seed1: string;
  matchups: Matchup[];
  // Predicted bracket progression
  r32Winners: string[]; // 8 teams
  sweetSixteen: string[]; // 4 teams
  round32Matchups: Matchup[]; // 4 matchups (Round of 32 / Sweet 16)
  eliteEightMatchups: Matchup[]; // 2 matchups (Elite Eight)
  regionalFinals: Matchup; // 1 matchup (Regional Finals / Round of 16)
  eliteEightWinner: string; // 1 winner (deprecated, use regionalFinals winner)
  finalFour: string;
  finalFourMatchup?: Matchup; // Final Four matchup for this region's representative
}

// Win probability calculation based on KenPom differential
function calcWinProb(kp1: number, kp2: number): number {
  const diff = kp2 - kp1; // lower KenPom = better
  const prob = 50 + Math.min(48, Math.max(-48, diff * 2.5));
  return Math.round(prob);
}

// Helper to get team by name for Elite Eight matchups
function getTeamByName(name: string, regions: RegionData[]): Team {
  for (const region of regions) {
    for (const matchup of region.matchups) {
      if (matchup.team1.name === name) return matchup.team1;
      if (matchup.team2.name === name) return matchup.team2;
    }
  }
  return { seed: 0, name, shortName: name, record: '', kenpom: 200, offKenpom: 200, defKenpom: 200, conference: '' };
}

export const regions: RegionData[] = [
  {
    name: 'East',
    color: '#1D4ED8',
    colorLight: '#EFF6FF',
    borderColor: '#1D4ED8',
    seed1: 'Duke',
    matchups: [
      {
        id: 'E1',
        team1: { seed: 1, name: 'Duke', shortName: 'Duke', record: '32-2', kenpom: 1, offKenpom: 5, defKenpom: 1, conference: 'ACC', keyPlayer: 'Cameron Boozer', notes: 'No. 1 overall seed. Best defense in the nation. Injury concerns with Ngongba II & Foster.' },
        team2: { seed: 16, name: 'Siena', shortName: 'Siena', record: '22-12', kenpom: 155, offKenpom: 148, defKenpom: 152, conference: 'MAAC', notes: 'Coached by former Syracuse star Gerry McNamara.' },
        predictedWinner: 1, winProb1: 98,
      },
      {
        id: 'E2',
        team1: { seed: 8, name: 'Ohio State', shortName: 'Ohio St.', record: '22-13', kenpom: 26, offKenpom: 16, defKenpom: 57, conference: 'Big Ten', keyPlayer: 'Bruce Thornton', notes: 'Two best scorers in Bruce Thornton and John Mobley Jr.' },
        team2: { seed: 9, name: 'TCU', shortName: 'TCU', record: '21-13', kenpom: 43, offKenpom: 81, defKenpom: 23, conference: 'Big 12', notes: 'Struggles to score. Ohio State favored.' },
        predictedWinner: 1, winProb1: 62,
      },
      {
        id: 'E3',
        team1: { seed: 5, name: "St. John's", shortName: "St. John's", record: '30-5', kenpom: 21, offKenpom: 52, defKenpom: 15, conference: 'Big East', keyPlayer: 'Zuby Ejiofor', notes: 'Big East season and tournament champion. Rick Pitino coaching.' },
        team2: { seed: 12, name: 'Northern Iowa', shortName: 'N. Iowa', record: '22-12', kenpom: 70, offKenpom: 153, defKenpom: 25, conference: 'MVC', notes: '#1 scoring defense in the nation. Dangerous upset pick.', },
        predictedWinner: 1, winProb1: 56, upsetAlert: true,
      },
      {
        id: 'E4',
        team1: { seed: 4, name: 'Kansas', shortName: 'Kansas', record: '22-12', kenpom: 18, offKenpom: 53, defKenpom: 10, conference: 'Big 12', keyPlayer: 'Darryn Peterson', notes: '36th consecutive tournament. Star Peterson battled injuries all season.' },
        team2: { seed: 13, name: 'Cal Baptist', shortName: 'Cal Baptist', record: '26-8', kenpom: 80, offKenpom: 70, defKenpom: 95, conference: 'WAC', notes: 'First NCAA tournament appearance.' },
        predictedWinner: 1, winProb1: 82,
      },
      {
        id: 'E5',
        team1: { seed: 6, name: 'Louisville', shortName: 'Louisville', record: '24-10', kenpom: 17, offKenpom: 19, defKenpom: 26, conference: 'ACC', keyPlayer: 'Mikel Brown Jr.', notes: 'Star freshman Mikel Brown Jr. missed ACC tournament with back injury.' },
        team2: { seed: 11, name: 'South Florida', shortName: 'S. Florida', record: '24-10', kenpom: 52, offKenpom: 60, defKenpom: 52, conference: 'American', notes: '12-game win streak. Won American Conference. Hot team.', },
        predictedWinner: 1, winProb1: 54, upsetAlert: true,
      },
      {
        id: 'E6',
        team1: { seed: 3, name: 'Michigan State', shortName: 'Mich. St.', record: '24-12', kenpom: 9, offKenpom: 27, defKenpom: 8, conference: 'Big Ten', keyPlayer: 'Jeremy Fears Jr.', notes: 'Classic Tom Izzo team. Fears leads nation in assist rate. Coen Carr best dunker in field.' },
        team2: { seed: 14, name: 'North Dakota State', shortName: 'ND State', record: '23-11', kenpom: 60, offKenpom: 62, defKenpom: 71, conference: 'Summit', notes: 'Good rebounding team but outmatched.' },
        predictedWinner: 1, winProb1: 88,
      },
      {
        id: 'E7',
        team1: { seed: 7, name: 'UCLA', shortName: 'UCLA', record: '22-13', kenpom: 29, offKenpom: 24, defKenpom: 44, conference: 'Big Ten', keyPlayer: 'Tyler Bilodeau', notes: 'Top scorers Bilodeau & Dent injured in Big Ten tournament. Availability uncertain.' },
        team2: { seed: 10, name: 'UCF', shortName: 'UCF', record: '22-12', kenpom: 54, offKenpom: 39, defKenpom: 101, conference: 'Big 12', notes: '7-foot-2 center John Bol. Under-seeded per analysts.', },
        predictedWinner: 1, winProb1: 55, upsetAlert: true,
      },
      {
        id: 'E8',
        team1: { seed: 2, name: 'UConn', shortName: 'UConn', record: '26-11', kenpom: 10, offKenpom: 22, defKenpom: 13, conference: 'Big East', keyPlayer: 'Solo Ball', notes: '2023 & 2024 national champions. Shooting struggles this season. Solo Ball lost touch.' },
        team2: { seed: 15, name: 'Furman', shortName: 'Furman', record: '24-10', kenpom: 125, offKenpom: 118, defKenpom: 127, conference: 'SoCon', notes: 'Struggled defensively in SoCon.' },
        predictedWinner: 1, winProb1: 93,
      },
    ],
    r32Winners: ['Duke', "St. John's", 'Kansas', 'Michigan State', 'UConn', 'Ohio State', 'Louisville', 'UCLA'],
    sweetSixteen: ['Duke', 'Kansas', 'Michigan State', 'UConn'],
    round32Matchups: [
      {
        id: 'E-R32-1',
        team1: { seed: 1, name: 'Duke', shortName: 'Duke', record: '32-2', kenpom: 1, offKenpom: 5, defKenpom: 1, conference: 'ACC' },
        team2: { seed: 8, name: 'Ohio State', shortName: 'Ohio St.', record: '22-13', kenpom: 26, offKenpom: 16, defKenpom: 57, conference: 'Big Ten' },
        predictedWinner: 1, winProb1: 78,
      },
      {
        id: 'E-R32-2',
        team1: { seed: 5, name: "St. John's", shortName: "St. John's", record: '30-5', kenpom: 21, offKenpom: 52, defKenpom: 15, conference: 'Big East' },
        team2: { seed: 4, name: 'Kansas', shortName: 'Kansas', record: '22-12', kenpom: 18, offKenpom: 53, defKenpom: 10, conference: 'Big 12' },
        predictedWinner: 2, winProb1: 42,
      },
      {
        id: 'E-R32-3',
        team1: { seed: 6, name: 'Louisville', shortName: 'Louisville', record: '24-10', kenpom: 17, offKenpom: 19, defKenpom: 26, conference: 'ACC' },
        team2: { seed: 3, name: 'Michigan State', shortName: 'Mich. St.', record: '24-12', kenpom: 9, offKenpom: 27, defKenpom: 8, conference: 'Big Ten' },
        predictedWinner: 2, winProb1: 38,
      },
      {
        id: 'E-R32-4',
        team1: { seed: 7, name: 'UCLA', shortName: 'UCLA', record: '22-13', kenpom: 29, offKenpom: 24, defKenpom: 44, conference: 'Big Ten' },
        team2: { seed: 2, name: 'UConn', shortName: 'UConn', record: '26-11', kenpom: 10, offKenpom: 22, defKenpom: 13, conference: 'Big East' },
        predictedWinner: 2, winProb1: 25,
      },
    ],
    eliteEightMatchups: [
      {
        id: 'E-E8-1',
        team1: { seed: 1, name: 'Duke', shortName: 'Duke', record: '32-2', kenpom: 1, offKenpom: 5, defKenpom: 1, conference: 'ACC' },
        team2: { seed: 4, name: 'Kansas', shortName: 'Kansas', record: '22-12', kenpom: 18, offKenpom: 53, defKenpom: 10, conference: 'Big 12' },
        predictedWinner: 1, winProb1: 72,
      },
      {
        id: 'E-E8-2',
        team1: { seed: 3, name: 'Michigan State', shortName: 'Mich. St.', record: '24-12', kenpom: 9, offKenpom: 27, defKenpom: 8, conference: 'Big Ten' },
        team2: { seed: 2, name: 'UConn', shortName: 'UConn', record: '26-11', kenpom: 10, offKenpom: 22, defKenpom: 13, conference: 'Big East' },
        predictedWinner: 2, winProb1: 48,
      },
    ],
    regionalFinals: {
      id: 'E-RF-1',
      team1: { seed: 1, name: 'Duke', shortName: 'Duke', record: '32-2', kenpom: 1, offKenpom: 5, defKenpom: 1, conference: 'ACC' },
      team2: { seed: 2, name: 'UConn', shortName: 'UConn', record: '26-11', kenpom: 10, offKenpom: 22, defKenpom: 13, conference: 'Big East' },
      predictedWinner: 1, winProb1: 60,
    },
    eliteEightWinner: 'Duke',
    finalFour: 'Duke',
    finalFourMatchup: {
      id: 'FF-1',
      team1: { seed: 1, name: 'Duke', shortName: 'Duke', record: '32-2', kenpom: 1, offKenpom: 5, defKenpom: 1, conference: 'ACC' },
      team2: { seed: 1, name: 'Florida', shortName: 'Florida', record: '26-7', kenpom: 4, offKenpom: 8, defKenpom: 5, conference: 'SEC' },
      predictedWinner: 1, winProb1: 56,
    },
  },
  {
    name: 'West',
    color: '#15803D',
    colorLight: '#F0FDF4',
    borderColor: '#15803D',
    seed1: 'Arizona',
    matchups: [
      {
        id: 'W1',
        team1: { seed: 1, name: 'Arizona', shortName: 'Arizona', record: '32-2', kenpom: 3, offKenpom: 7, defKenpom: 2, conference: 'Big 12', keyPlayer: 'Jaden Bradley', notes: 'KenPom #3. Elite defense. Bradley won Big 12 POY. Brayden Burries dynamic freshman scorer.' },
        team2: { seed: 16, name: 'LIU', shortName: 'LIU', record: '21-12', kenpom: 168, offKenpom: 162, defKenpom: 157, conference: 'Coastal Athletic', notes: 'Coached by former NBA PG Rod Strickland. Turnover-prone.' },
        predictedWinner: 1, winProb1: 98,
      },
      {
        id: 'W2',
        team1: { seed: 8, name: 'Villanova', shortName: 'Villanova', record: '21-13', kenpom: 33, offKenpom: 42, defKenpom: 35, conference: 'Big East', keyPlayer: 'Kevin Willard', notes: 'Kevin Willard defense struggles vs. teams that move the ball.' },
        team2: { seed: 9, name: 'Utah State', shortName: 'Utah St.', record: '24-10', kenpom: 32, offKenpom: 28, defKenpom: 54, conference: 'Mountain West', notes: 'Excellent shooting team. Tough matchup for Villanova.', },
        predictedWinner: 2, winProb1: 45, upsetAlert: true,
      },
      {
        id: 'W3',
        team1: { seed: 5, name: 'Wisconsin', shortName: 'Wisconsin', record: '24-10', kenpom: 24, offKenpom: 9, defKenpom: 62, conference: 'Big Ten', keyPlayer: 'Nick Boyd', notes: '33 three-point attempts per game. Nick Boyd 21 ppg, John Blackwell 19 ppg.' },
        team2: { seed: 12, name: 'High Point', shortName: 'High Point', record: '27-7', kenpom: 57, offKenpom: 57, defKenpom: 92, conference: 'Big South', notes: 'Nation\'s longest win streak (14). +19.7 avg scoring margin.', },
        predictedWinner: 1, winProb1: 58, upsetAlert: true,
      },
      {
        id: 'W4',
        team1: { seed: 4, name: 'Arkansas', shortName: 'Arkansas', record: '22-12', kenpom: 16, offKenpom: 6, defKenpom: 46, conference: 'SEC', keyPlayer: 'Darius Acuff Jr.', notes: 'John Calipari coaching. Darius Acuff Jr. is best PG in country. Lost Karter Knox for season.' },
        team2: { seed: 13, name: 'Hawaii', shortName: 'Hawaii', record: '22-11', kenpom: 78, offKenpom: 68, defKenpom: 88, conference: 'Big West', notes: '5 married players. First tournament since 2016.' },
        predictedWinner: 1, winProb1: 83,
      },
      {
        id: 'W5',
        team1: { seed: 6, name: 'BYU', shortName: 'BYU', record: '21-13', kenpom: 22, offKenpom: 11, defKenpom: 53, conference: 'Big 12', keyPlayer: 'AJ Dybantsa', notes: 'AJ Dybantsa is best player in the tournament. Projected #1 NBA draft pick.' },
        team2: { seed: 11, name: 'NC State', shortName: 'NC State', record: 'TBD', kenpom: 34, offKenpom: 20, defKenpom: 86, conference: 'ACC', notes: 'First Four winner. BYU should be rooting for NC State over Texas.', },
        predictedWinner: 1, winProb1: 65,
      },
      {
        id: 'W6',
        team1: { seed: 3, name: 'Gonzaga', shortName: 'Gonzaga', record: '30-9', kenpom: 11, offKenpom: 30, defKenpom: 11, conference: 'WCC', keyPlayer: 'Graham Ike', notes: '27th consecutive tournament. Injuries lowered ceiling. Graham Ike dominant on low block.' },
        team2: { seed: 14, name: 'Kennesaw State', shortName: 'Kennesaw St.', record: '22-13', kenpom: 102, offKenpom: 112, defKenpom: 75, conference: 'ASUN', notes: 'No answer for Graham Ike.' },
        predictedWinner: 1, winProb1: 89,
      },
      {
        id: 'W7',
        team1: { seed: 7, name: 'Miami (FL)', shortName: 'Miami FL', record: '21-13', kenpom: 27, offKenpom: 32, defKenpom: 32, conference: 'ACC', notes: 'First-year coach Jai Lucas (former Duke assistant). Remade from 7-24 last season. Wants to run.' },
        team2: { seed: 10, name: 'Missouri', shortName: 'Missouri', record: '20-14', kenpom: 51, offKenpom: 51, defKenpom: 76, conference: 'SEC', notes: 'Both teams want to run. High-scoring game expected.', },
        predictedWinner: 1, winProb1: 60,
      },
      {
        id: 'W8',
        team1: { seed: 2, name: 'Purdue', shortName: 'Purdue', record: '26-10', kenpom: 8, offKenpom: 2, defKenpom: 39, conference: 'Big Ten', keyPlayer: 'Braden Smith', notes: 'Best offensive efficiency in KenPom era. Braden Smith about to break Bobby Hurley assist record.' },
        team2: { seed: 15, name: 'Queens (N.C.)', shortName: 'Queens', record: '24-10', kenpom: 118, offKenpom: 105, defKenpom: 120, conference: 'ASUN', notes: 'Ranks outside top 300 in defensive efficiency.' },
        predictedWinner: 1, winProb1: 97,
      },
    ],
    r32Winners: ['Arizona', 'Utah State', 'Wisconsin', 'Arkansas', 'BYU', 'Gonzaga', 'Miami (FL)', 'Purdue'],
    sweetSixteen: ['Arizona', 'Arkansas', 'Gonzaga', 'Purdue'],
    regionalFinals: {
      id: 'W-RF-1',
      team1: { seed: 1, name: 'Arizona', shortName: 'Arizona', record: '32-2', kenpom: 3, offKenpom: 7, defKenpom: 2, conference: 'Big 12' },
      team2: { seed: 3, name: 'Gonzaga', shortName: 'Gonzaga', record: '30-9', kenpom: 11, offKenpom: 30, defKenpom: 11, conference: 'WCC' },
      predictedWinner: 1, winProb1: 65,
    },
    finalFourMatchup: {
      id: 'FF-2',
      team1: { seed: 1, name: 'Arizona', shortName: 'Arizona', record: '32-2', kenpom: 3, offKenpom: 7, defKenpom: 2, conference: 'Big 12' },
      team2: { seed: 1, name: 'Michigan', shortName: 'Michigan', record: '31-3', kenpom: 2, offKenpom: 4, defKenpom: 3, conference: 'Big Ten' },
      predictedWinner: 2, winProb1: 46,
    },
    round32Matchups: [
      {
        id: 'W-R32-1',
        team1: { seed: 1, name: 'Arizona', shortName: 'Arizona', record: '32-2', kenpom: 3, offKenpom: 7, defKenpom: 2, conference: 'Big 12' },
        team2: { seed: 8, name: 'Villanova', shortName: 'Villanova', record: '21-13', kenpom: 33, offKenpom: 42, defKenpom: 35, conference: 'Big East' },
        predictedWinner: 1, winProb1: 75,
      },
      {
        id: 'W-R32-2',
        team1: { seed: 5, name: 'Wisconsin', shortName: 'Wisconsin', record: '24-10', kenpom: 24, offKenpom: 9, defKenpom: 62, conference: 'Big Ten' },
        team2: { seed: 4, name: 'Arkansas', shortName: 'Arkansas', record: '22-12', kenpom: 16, offKenpom: 6, defKenpom: 46, conference: 'SEC' },
        predictedWinner: 2, winProb1: 40,
      },
      {
        id: 'W-R32-3',
        team1: { seed: 6, name: 'BYU', shortName: 'BYU', record: '21-13', kenpom: 22, offKenpom: 11, defKenpom: 53, conference: 'Big 12' },
        team2: { seed: 3, name: 'Gonzaga', shortName: 'Gonzaga', record: '30-9', kenpom: 11, offKenpom: 30, defKenpom: 11, conference: 'WCC' },
        predictedWinner: 2, winProb1: 35,
      },
      {
        id: 'W-R32-4',
        team1: { seed: 7, name: 'Miami (FL)', shortName: 'Miami FL', record: '21-13', kenpom: 27, offKenpom: 32, defKenpom: 32, conference: 'ACC' },
        team2: { seed: 2, name: 'Purdue', shortName: 'Purdue', record: '26-10', kenpom: 8, offKenpom: 2, defKenpom: 39, conference: 'Big Ten' },
        predictedWinner: 2, winProb1: 20,
      },
    ],
    eliteEightMatchups: [
      {
        id: 'W-E8-1',
        team1: { seed: 1, name: 'Arizona', shortName: 'Arizona', record: '32-2', kenpom: 3, offKenpom: 7, defKenpom: 2, conference: 'Big 12' },
        team2: { seed: 4, name: 'Arkansas', shortName: 'Arkansas', record: '22-12', kenpom: 16, offKenpom: 6, defKenpom: 46, conference: 'SEC' },
        predictedWinner: 1, winProb1: 68,
      },
      {
        id: 'W-E8-2',
        team1: { seed: 3, name: 'Gonzaga', shortName: 'Gonzaga', record: '30-9', kenpom: 11, offKenpom: 30, defKenpom: 11, conference: 'WCC' },
        team2: { seed: 2, name: 'Purdue', shortName: 'Purdue', record: '26-10', kenpom: 8, offKenpom: 2, defKenpom: 39, conference: 'Big Ten' },
        predictedWinner: 2, winProb1: 44,
      },
    ],
    eliteEightWinner: 'Arizona',
    finalFour: 'Arizona',
  },
  {
    name: 'South',
    color: '#B91C1C',
    colorLight: '#FEF2F2',
    borderColor: '#B91C1C',
    seed1: 'Florida',
    matchups: [
      {
        id: 'S1',
        team1: { seed: 1, name: 'Florida', shortName: 'Florida', record: '26-7', kenpom: 4, offKenpom: 8, defKenpom: 5, conference: 'SEC', keyPlayer: 'Boogie Fland', notes: 'Defending national champions. 12-game win streak before SEC tournament loss. Strong frontcourt.' },
        team2: { seed: 16, name: 'Prairie View A&M', shortName: 'PV A&M', record: '18-17', kenpom: 285, offKenpom: 278, defKenpom: 290, conference: 'SWAC', notes: 'Won SWAC tournament from 8th place. 18-17 record.' },
        predictedWinner: 1, winProb1: 99,
      },
      {
        id: 'S2',
        team1: { seed: 8, name: 'Clemson', shortName: 'Clemson', record: '22-13', kenpom: 36, offKenpom: 71, defKenpom: 19, conference: 'ACC', notes: 'Slow pace, can\'t score. Defense is strength.' },
        team2: { seed: 9, name: 'Iowa', shortName: 'Iowa', record: '21-13', kenpom: 25, offKenpom: 31, defKenpom: 30, conference: 'Big Ten', notes: 'Very picky shot selection. Both teams play slow. Iowa should win.', },
        predictedWinner: 2, winProb1: 44,
      },
      {
        id: 'S3',
        team1: { seed: 5, name: 'Vanderbilt', shortName: 'Vanderbilt', record: '26-8', kenpom: 13, offKenpom: 10, defKenpom: 28, conference: 'SEC', keyPlayer: 'Duke Miles', notes: 'SEC tournament runners-up. Duke Miles back from injury. Upset Florida in SEC semis.' },
        team2: { seed: 12, name: 'McNeese', shortName: 'McNeese', record: '28-5', kenpom: 66, offKenpom: 91, defKenpom: 45, conference: 'Southland', notes: '2nd in nation in forcing turnovers. Popular upset pick.', },
        predictedWinner: 1, winProb1: 67,
      },
      {
        id: 'S4',
        team1: { seed: 4, name: 'Nebraska', shortName: 'Nebraska', record: '26-6', kenpom: 12, offKenpom: 54, defKenpom: 7, conference: 'Big Ten', notes: 'Started 20-0. 0-8 all-time in NCAA tournament. Attacking defense.' },
        team2: { seed: 13, name: 'Troy', shortName: 'Troy', record: '22-11', kenpom: 82, offKenpom: 88, defKenpom: 66, conference: 'Sun Belt', notes: 'Ballhandling issues. Nebraska will exploit.' },
        predictedWinner: 1, winProb1: 80,
      },
      {
        id: 'S5',
        team1: { seed: 6, name: 'North Carolina', shortName: 'N. Carolina', record: '22-13', kenpom: 30, offKenpom: 33, defKenpom: 37, conference: 'ACC', keyPlayer: 'Henri Veesaar', notes: 'Lost Caleb Wilson (lottery pick) for season. More reliant on Henri Veesaar.' },
        team2: { seed: 11, name: 'VCU', shortName: 'VCU', record: '22-12', kenpom: 47, offKenpom: 45, defKenpom: 63, conference: 'Atlantic 10', notes: 'Lazar Djokovic (6-11) can guard Veesaar. Dangerous without Wilson.', },
        predictedWinner: 1, winProb1: 58, upsetAlert: true,
      },
      {
        id: 'S6',
        team1: { seed: 3, name: 'Illinois', shortName: 'Illinois', record: '24-12', kenpom: 5, offKenpom: 1, defKenpom: 27, conference: 'Big Ten', notes: '#1 offense in KenPom history (131.1 pts/100). 0-4 in OT this season. Breathtaking offense.' },
        team2: { seed: 14, name: 'Penn', shortName: 'Penn', record: '22-10', kenpom: 76, offKenpom: 66, defKenpom: 87, conference: 'Ivy', notes: 'Coached by former Iowa coach Fran McCaffery.' },
        predictedWinner: 1, winProb1: 91,
      },
      {
        id: 'S7',
        team1: { seed: 7, name: "Saint Mary's", shortName: "St. Mary's", record: '26-8', kenpom: 23, offKenpom: 41, defKenpom: 20, conference: 'WCC', notes: 'Wants to slow the pace. Young team.' },
        team2: { seed: 10, name: 'Texas A&M', shortName: 'Texas A&M', record: '20-14', kenpom: 40, offKenpom: 48, defKenpom: 38, conference: 'SEC', notes: '"Bucky Ball" - pressing and fast-break style. Wants 75 possessions.', },
        predictedWinner: 2, winProb1: 46, upsetAlert: true,
      },
      {
        id: 'S8',
        team1: { seed: 2, name: 'Houston', shortName: 'Houston', record: '27-7', kenpom: 6, offKenpom: 17, defKenpom: 6, conference: 'Big 12', keyPlayer: 'Kingston Flemings', notes: 'Playing South Regional at Toyota Center (home arena nearby). 6 consecutive Sweet 16s. Kelvin Sampson.' },
        team2: { seed: 15, name: 'Idaho', shortName: 'Idaho', record: '22-12', kenpom: 138, offKenpom: 128, defKenpom: 142, conference: 'Big Sky', notes: 'Returned to tournament after 36 years.' },
        predictedWinner: 1, winProb1: 97,
      },
    ],
    r32Winners: ['Florida', 'Iowa', 'Vanderbilt', 'Nebraska', 'North Carolina', 'Illinois', 'Texas A&M', 'Houston'],
    sweetSixteen: ['Florida', 'Nebraska', 'Illinois', 'Houston'],
    regionalFinals: {
      id: 'S-RF-1',
      team1: { seed: 1, name: 'Florida', shortName: 'Florida', record: '26-7', kenpom: 4, offKenpom: 8, defKenpom: 5, conference: 'SEC' },
      team2: { seed: 2, name: 'Houston', shortName: 'Houston', record: '27-7', kenpom: 6, offKenpom: 17, defKenpom: 6, conference: 'Big 12' },
      predictedWinner: 1, winProb1: 62,
    },
    finalFourMatchup: {
      id: 'FF-1',
      team1: { seed: 1, name: 'Florida', shortName: 'Florida', record: '26-7', kenpom: 4, offKenpom: 8, defKenpom: 5, conference: 'SEC' },
      team2: { seed: 1, name: 'Duke', shortName: 'Duke', record: '32-2', kenpom: 1, offKenpom: 5, defKenpom: 1, conference: 'ACC' },
      predictedWinner: 2, winProb1: 44,
    },
    round32Matchups: [
      {
        id: 'S-R32-1',
        team1: { seed: 1, name: 'Florida', shortName: 'Florida', record: '26-7', kenpom: 4, offKenpom: 8, defKenpom: 5, conference: 'SEC' },
        team2: { seed: 8, name: 'Clemson', shortName: 'Clemson', record: '22-13', kenpom: 36, offKenpom: 71, defKenpom: 19, conference: 'ACC' },
        predictedWinner: 1, winProb1: 76,
      },
      {
        id: 'S-R32-2',
        team1: { seed: 5, name: 'Vanderbilt', shortName: 'Vanderbilt', record: '26-8', kenpom: 13, offKenpom: 10, defKenpom: 28, conference: 'SEC' },
        team2: { seed: 4, name: 'Nebraska', shortName: 'Nebraska', record: '26-6', kenpom: 12, offKenpom: 54, defKenpom: 7, conference: 'Big Ten' },
        predictedWinner: 2, winProb1: 45,
      },
      {
        id: 'S-R32-3',
        team1: { seed: 6, name: 'North Carolina', shortName: 'N. Carolina', record: '22-13', kenpom: 30, offKenpom: 33, defKenpom: 37, conference: 'ACC' },
        team2: { seed: 3, name: 'Illinois', shortName: 'Illinois', record: '24-12', kenpom: 5, offKenpom: 1, defKenpom: 27, conference: 'Big Ten' },
        predictedWinner: 2, winProb1: 28,
      },
      {
        id: 'S-R32-4',
        team1: { seed: 7, name: "Saint Mary's", shortName: "St. Mary's", record: '26-8', kenpom: 23, offKenpom: 41, defKenpom: 20, conference: 'WCC' },
        team2: { seed: 2, name: 'Houston', shortName: 'Houston', record: '27-7', kenpom: 6, offKenpom: 17, defKenpom: 6, conference: 'Big 12' },
        predictedWinner: 2, winProb1: 22,
      },
    ],
    eliteEightMatchups: [
      {
        id: 'S-E8-1',
        team1: { seed: 1, name: 'Florida', shortName: 'Florida', record: '26-7', kenpom: 4, offKenpom: 8, defKenpom: 5, conference: 'SEC' },
        team2: { seed: 4, name: 'Nebraska', shortName: 'Nebraska', record: '26-6', kenpom: 12, offKenpom: 54, defKenpom: 7, conference: 'Big Ten' },
        predictedWinner: 1, winProb1: 65,
      },
      {
        id: 'S-E8-2',
        team1: { seed: 3, name: 'Illinois', shortName: 'Illinois', record: '24-12', kenpom: 5, offKenpom: 1, defKenpom: 27, conference: 'Big Ten' },
        team2: { seed: 2, name: 'Houston', shortName: 'Houston', record: '27-7', kenpom: 6, offKenpom: 17, defKenpom: 6, conference: 'Big 12' },
        predictedWinner: 2, winProb1: 52,
      },
    ],
    eliteEightWinner: 'Florida',
    finalFour: 'Florida',
  },
  {
    name: 'Midwest',
    color: '#D97706',
    colorLight: '#FFFBEB',
    borderColor: '#D97706',
    seed1: 'Michigan',
    matchups: [
      {
        id: 'M1',
        team1: { seed: 1, name: 'Michigan', shortName: 'Michigan', record: '31-3', kenpom: 2, offKenpom: 4, defKenpom: 3, conference: 'Big Ten', keyPlayer: 'Yaxel Lendeborg', notes: 'KenPom #2. Most efficient defense in country. Dusty May\'s NBA-style roster. Turnover-prone.' },
        team2: { seed: 16, name: 'UMBC', shortName: 'UMBC', record: 'TBD', kenpom: 130, offKenpom: 120, defKenpom: 133, conference: 'America East', notes: 'First Four winner. Famous for 2018 upset of Virginia.' },
        predictedWinner: 1, winProb1: 98,
      },
      {
        id: 'M2',
        team1: { seed: 8, name: 'Georgia', shortName: 'Georgia', record: '21-14', kenpom: 31, offKenpom: 15, defKenpom: 82, conference: 'SEC', notes: 'Scoring in 80s and 90s in SEC. High-tempo offense.' },
        team2: { seed: 9, name: 'Saint Louis', shortName: 'Saint Louis', record: '22-12', kenpom: 39, offKenpom: 46, defKenpom: 40, conference: 'Atlantic 10', keyPlayer: 'Robbie Avila', notes: 'Robbie Avila "Cream Abdul-Jabbar" viral highlights. High-scoring matchup.', },
        predictedWinner: 2, winProb1: 47,
      },
      {
        id: 'M3',
        team1: { seed: 5, name: 'Texas Tech', shortName: 'Texas Tech', record: '22-12', kenpom: 20, offKenpom: 12, defKenpom: 33, conference: 'Big 12', keyPlayer: 'Christian Anderson', notes: 'Lost star JT Toppin (ACL) last month. Christian Anderson elite perimeter scorer.' },
        team2: { seed: 12, name: 'Akron', shortName: 'Akron', record: '25-9', kenpom: 64, offKenpom: 50, defKenpom: 118, conference: 'MAC', notes: 'Won 19 of 20. Texas Tech without Toppin is vulnerable.', },
        predictedWinner: 1, winProb1: 62, upsetAlert: true,
      },
      {
        id: 'M4',
        team1: { seed: 4, name: 'Alabama', shortName: 'Alabama', record: '22-13', kenpom: 15, offKenpom: 3, defKenpom: 68, conference: 'SEC', notes: 'KenPom #3 offense but #68 defense. Takes and makes lots of 3s. Aden Holloway arrested.' },
        team2: { seed: 13, name: 'Hofstra', shortName: 'Hofstra', record: '26-8', kenpom: 55, offKenpom: 55, defKenpom: 72, conference: 'CAA', notes: 'Gives up lots of 3-point attempts. Bad matchup vs. Alabama.', },
        predictedWinner: 1, winProb1: 78,
      },
      {
        id: 'M5',
        team1: { seed: 6, name: 'Tennessee', shortName: 'Tennessee', record: '22-13', kenpom: 14, offKenpom: 36, defKenpom: 14, conference: 'SEC', notes: 'Better than either First Four opponent.' },
        team2: { seed: 11, name: 'Miami (OH)', shortName: 'Miami OH', record: '31-1', kenpom: 44, offKenpom: 40, defKenpom: 64, conference: 'MAC', notes: 'First Four winner. 31-1 record. Never faced Quad 1 opponent. "Ain\'t played nobody."', },
        predictedWinner: 1, winProb1: 70,
      },
      {
        id: 'M6',
        team1: { seed: 3, name: 'Virginia', shortName: 'Virginia', record: '24-10', kenpom: 19, offKenpom: 34, defKenpom: 16, conference: 'ACC', notes: 'Classic Virginia defense. Will guard Wright State full court.' },
        team2: { seed: 14, name: 'Wright State', shortName: 'Wright St.', record: '22-12', kenpom: 95, offKenpom: 83, defKenpom: 97, conference: 'Horizon', notes: 'Horizon League champion. Virginia defense will be suffocating.' },
        predictedWinner: 1, winProb1: 85,
      },
      {
        id: 'M7',
        team1: { seed: 7, name: 'Kentucky', shortName: 'Kentucky', record: '19-15', kenpom: 28, offKenpom: 35, defKenpom: 31, conference: 'SEC', notes: '$22M NIL roster but can\'t score in half court. 64th tournament appearance.' },
        team2: { seed: 10, name: 'Santa Clara', shortName: 'Santa Clara', record: '24-10', kenpom: 35, offKenpom: 21, defKenpom: 81, conference: 'WCC', notes: 'Beat both Gonzaga and Saint Mary\'s this season. Upset pick.', },
        predictedWinner: 2, winProb1: 43, upsetAlert: true,
      },
      {
        id: 'M8',
        team1: { seed: 2, name: 'Iowa State', shortName: 'Iowa State', record: '27-7', kenpom: 7, offKenpom: 23, defKenpom: 4, conference: 'Big 12', keyPlayer: 'Joshua Jefferson', notes: 'KenPom #7. Joshua Jefferson matchup nightmare. Milan Momcilovic best 3-pt shooter in field. Elite defense.' },
        team2: { seed: 15, name: 'Tennessee State', shortName: 'TN State', record: '21-13', kenpom: 165, offKenpom: 155, defKenpom: 168, conference: 'Ohio Valley', notes: 'First tournament appearance ever. Coached by former Duke star Nolan Smith.' },
        predictedWinner: 1, winProb1: 97,
      },
    ],
    r32Winners: ['Michigan', 'Saint Louis', 'Texas Tech', 'Alabama', 'Tennessee', 'Virginia', 'Santa Clara', 'Iowa State'],
    sweetSixteen: ['Michigan', 'Alabama', 'Virginia', 'Iowa State'],
    regionalFinals: {
      id: 'M-RF-1',
      team1: { seed: 1, name: 'Michigan', shortName: 'Michigan', record: '31-3', kenpom: 2, offKenpom: 4, defKenpom: 3, conference: 'Big Ten' },
      team2: { seed: 2, name: 'Iowa State', shortName: 'Iowa State', record: '27-7', kenpom: 7, offKenpom: 23, defKenpom: 4, conference: 'Big 12' },
      predictedWinner: 1, winProb1: 68,
    },
    finalFourMatchup: {
      id: 'FF-2',
      team1: { seed: 1, name: 'Michigan', shortName: 'Michigan', record: '31-3', kenpom: 2, offKenpom: 4, defKenpom: 3, conference: 'Big Ten' },
      team2: { seed: 1, name: 'Arizona', shortName: 'Arizona', record: '32-2', kenpom: 3, offKenpom: 7, defKenpom: 2, conference: 'Big 12' },
      predictedWinner: 1, winProb1: 54,
    },
    round32Matchups: [
      {
        id: 'M-R32-1',
        team1: { seed: 1, name: 'Michigan', shortName: 'Michigan', record: '31-3', kenpom: 2, offKenpom: 4, defKenpom: 3, conference: 'Big Ten' },
        team2: { seed: 8, name: 'Georgia', shortName: 'Georgia', record: '21-14', kenpom: 31, offKenpom: 15, defKenpom: 82, conference: 'SEC' },
        predictedWinner: 1, winProb1: 77,
      },
      {
        id: 'M-R32-2',
        team1: { seed: 5, name: 'Texas Tech', shortName: 'Texas Tech', record: '22-12', kenpom: 20, offKenpom: 12, defKenpom: 33, conference: 'Big 12' },
        team2: { seed: 4, name: 'Alabama', shortName: 'Alabama', record: '22-13', kenpom: 15, offKenpom: 3, defKenpom: 68, conference: 'SEC' },
        predictedWinner: 2, winProb1: 43,
      },
      {
        id: 'M-R32-3',
        team1: { seed: 6, name: 'Tennessee', shortName: 'Tennessee', record: '22-13', kenpom: 14, offKenpom: 36, defKenpom: 14, conference: 'SEC' },
        team2: { seed: 3, name: 'Virginia', shortName: 'Virginia', record: '24-10', kenpom: 19, offKenpom: 34, defKenpom: 16, conference: 'ACC' },
        predictedWinner: 2, winProb1: 40,
      },
      {
        id: 'M-R32-4',
        team1: { seed: 7, name: 'Kentucky', shortName: 'Kentucky', record: '19-15', kenpom: 28, offKenpom: 35, defKenpom: 31, conference: 'SEC' },
        team2: { seed: 2, name: 'Iowa State', shortName: 'Iowa State', record: '27-7', kenpom: 7, offKenpom: 23, defKenpom: 4, conference: 'Big 12' },
        predictedWinner: 2, winProb1: 18,
      },
    ],
    eliteEightMatchups: [
      {
        id: 'M-E8-1',
        team1: { seed: 1, name: 'Michigan', shortName: 'Michigan', record: '31-3', kenpom: 2, offKenpom: 4, defKenpom: 3, conference: 'Big Ten' },
        team2: { seed: 4, name: 'Alabama', shortName: 'Alabama', record: '22-13', kenpom: 15, offKenpom: 3, defKenpom: 68, conference: 'SEC' },
        predictedWinner: 1, winProb1: 70,
      },
      {
        id: 'M-E8-2',
        team1: { seed: 3, name: 'Virginia', shortName: 'Virginia', record: '24-10', kenpom: 19, offKenpom: 34, defKenpom: 16, conference: 'ACC' },
        team2: { seed: 2, name: 'Iowa State', shortName: 'Iowa State', record: '27-7', kenpom: 7, offKenpom: 23, defKenpom: 4, conference: 'Big 12' },
        predictedWinner: 2, winProb1: 58,
      },
    ],
    eliteEightWinner: 'Michigan',
    finalFour: 'Michigan',
  },
];

export const finalFourPrediction = {
  matchup1: { team1: 'Duke', team2: 'Florida', winner: 'Duke', winProb: 56 },
  matchup2: { team1: 'Michigan', team2: 'Arizona', winner: 'Michigan', winProb: 54 },
  championship: { team1: 'Duke', team2: 'Michigan', winner: 'Duke', winProb: 55 },
};

export const topTeamsKenpom = [
  { rank: 1, name: 'Duke', seed: 1, region: 'East', offRank: 5, defRank: 1, record: '32-2' },
  { rank: 2, name: 'Michigan', seed: 1, region: 'Midwest', offRank: 4, defRank: 3, record: '31-3' },
  { rank: 3, name: 'Arizona', seed: 1, region: 'West', offRank: 7, defRank: 2, record: '32-2' },
  { rank: 4, name: 'Florida', seed: 1, region: 'South', offRank: 8, defRank: 5, record: '26-7' },
  { rank: 5, name: 'Illinois', seed: 3, region: 'South', offRank: 1, defRank: 27, record: '24-12' },
  { rank: 6, name: 'Houston', seed: 2, region: 'South', offRank: 17, defRank: 6, record: '27-7' },
  { rank: 7, name: 'Iowa State', seed: 2, region: 'Midwest', offRank: 23, defRank: 4, record: '27-7' },
  { rank: 8, name: 'Purdue', seed: 2, region: 'West', offRank: 2, defRank: 39, record: '26-10' },
  { rank: 9, name: 'Michigan State', seed: 3, region: 'East', offRank: 27, defRank: 8, record: '24-12' },
  { rank: 10, name: 'UConn', seed: 2, region: 'East', offRank: 22, defRank: 13, record: '26-11' },
  { rank: 11, name: 'Gonzaga', seed: 3, region: 'West', offRank: 30, defRank: 11, record: '30-9' },
  { rank: 12, name: 'Nebraska', seed: 4, region: 'South', offRank: 54, defRank: 7, record: '26-6' },
];

export const upsetPicks = [
  { team: 'Santa Clara', seed: 10, over: 'Kentucky', overSeed: 7, region: 'Midwest', rationale: 'Beat both Gonzaga and Saint Mary\'s this season. Kentucky can\'t score in half court despite $22M NIL roster.' },
  { team: 'South Florida', seed: 11, over: 'Louisville', overSeed: 6, region: 'East', rationale: '12-game win streak. Won American Conference. Louisville missing star freshman Mikel Brown Jr.' },
  { team: 'High Point', seed: 12, over: 'Wisconsin', overSeed: 5, region: 'West', rationale: 'Nation\'s longest win streak (14 games). +19.7 avg scoring margin. Wisconsin relies on 3-pointers.' },
  { team: 'Northern Iowa', seed: 12, over: "St. John's", overSeed: 5, region: 'East', rationale: '#1 scoring defense in the nation. Advanced metrics love this team despite modest record.' },
  { team: 'Iowa', seed: 9, over: 'Clemson', overSeed: 8, region: 'South', rationale: 'Both teams play slow. Iowa wins the half-court battle with better shot selection.' },
  { team: 'Utah State', seed: 9, over: 'Villanova', overSeed: 8, region: 'West', rationale: 'Excellent shooting team. Villanova struggles vs. teams that move the ball and attack the glass.' },
];

export const conferenceBreakdown = [
  { conference: 'SEC', bids: 9, color: '#FF6B35' },
  { conference: 'Big Ten', bids: 8, color: '#1D4ED8' },
  { conference: 'Big 12', bids: 7, color: '#B91C1C' },
  { conference: 'ACC', bids: 6, color: '#15803D' },
  { conference: 'Big East', bids: 4, color: '#7C3AED' },
  { conference: 'WCC', bids: 3, color: '#0891B2' },
  { conference: 'Others', bids: 31, color: '#6B7280' },
];
