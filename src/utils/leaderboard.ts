const MAX_SCORES = 10;
const leaderboardKey = 'personalLeaderboard';

interface LeaderboardEntry {
  streak: number;
}
export type Leaderboard = LeaderboardEntry[];

function validateLeaderboard(leaderboard: Leaderboard) {
  if (!Array.isArray(leaderboard)) throw new Error('noarr');

  for (const place of leaderboard) {
    if (typeof place.streak !== 'number') throw new Error('nonum');
  }
}

function getLeaderboard(): Leaderboard {
  try {
    const leaderboardString = localStorage.getItem(leaderboardKey) || '[]';
    const leaderboard: Leaderboard = JSON.parse(leaderboardString);
    validateLeaderboard(leaderboard);

    return leaderboard;
  } catch {
    localStorage.setItem(leaderboardKey, '[]');
    return [];
  }
}

function addScoreIfQualified(
  leaderboardEntry: LeaderboardEntry,
  leaderboard = getLeaderboard()
): Leaderboard {
  const newLeaderboard: Leaderboard = [...leaderboard, leaderboardEntry]
    .sort((a, b) => (a.streak < b.streak ? 1 : -1))
    .slice(0, MAX_SCORES);
  localStorage.setItem(leaderboardKey, JSON.stringify(newLeaderboard));

  return newLeaderboard;
}

export { getLeaderboard, addScoreIfQualified };
