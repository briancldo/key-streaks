import { getLeaderboard } from '../../utils/leaderboard';

const leaderboardKey = 'personalLeaderboard';

describe('leaderboard', () => {
  describe('#getLeaderboard', () => {
    test('returns empty array if not stored', () => {
      const leaderboard = getLeaderboard();

      expect(leaderboard).toEqual([]);
    });

    test('returns leaderboard if stored', () => {
      const leaderboard = [{ score: 123 }, { score: 122 }, { score: 121 }];
      localStorage.setItem(leaderboardKey, JSON.stringify(leaderboard));

      const returnedLeaderboard = getLeaderboard();

      expect(returnedLeaderboard).toEqual(leaderboard);
    });

    test('clears leaderboard and returns empty array if stored leaderboard is corrupt', () => {
      localStorage.setItem(leaderboardKey, 'I messed with leadboard settings');

      const leaderboard = getLeaderboard();

      expect(leaderboard).toEqual([]);
      expect(localStorage.getItem(leaderboardKey)).toBe('[]');
    });
  });
});
