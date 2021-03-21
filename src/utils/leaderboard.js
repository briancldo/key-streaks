// const MAX_SCORES = 10;
const leaderboardKey = 'personalLeaderboard';

function getLeaderboard() {
  try {
    const leaderboardString = localStorage.getItem(leaderboardKey) || [];
    return JSON.parse(leaderboardString);
  } catch {
    localStorage.setItem(leaderboardKey, '[]');
  }
}

// function addScoreIfQualified(score) {}

export { getLeaderboard };
