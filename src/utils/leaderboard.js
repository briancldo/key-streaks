const MAX_SCORES = 10;
const leaderboardKey = 'personalLeaderboard';

function validateLeaderboard(leaderboard) {
  if (!Array.isArray(leaderboard)) throw new Error('noarr');

  for (const place of leaderboard) {
    if (typeof place.streak !== 'number') throw new Error('nonum');
  }
}

function getLeaderboard() {
  try {
    const leaderboardString = localStorage.getItem(leaderboardKey) || '[]';
    const leaderboard = JSON.parse(leaderboardString);
    validateLeaderboard(leaderboard);

    return leaderboard;
  } catch {
    localStorage.setItem(leaderboardKey, '[]');
    return [];
  }
}

function addScoreIfQualified(streak, leaderboard = getLeaderboard()) {
  const newLeaderboard = [...leaderboard, { streak }]
    .sort((a, b) => (a.streak < b.streak ? 1 : -1))
    .slice(0, MAX_SCORES);
  localStorage.setItem(leaderboardKey, JSON.stringify(newLeaderboard));

  return newLeaderboard;
}

export { getLeaderboard, addScoreIfQualified };
