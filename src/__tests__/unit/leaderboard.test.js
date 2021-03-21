import { getLeaderboard, addScoreIfQualified } from '../../utils/leaderboard';

const leaderboardKey = 'personalLeaderboard';

describe('leaderboard', () => {
  describe('#getLeaderboard', () => {
    test('returns empty array if not stored', () => {
      const leaderboard = getLeaderboard();

      expect(leaderboard).toEqual([]);
    });

    test('returns leaderboard if stored', () => {
      const leaderboard = [{ streak: 123 }, { streak: 122 }, { streak: 121 }];
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

    test('clears leaderboard and returns empty array if incorrectly formed leaderboard', () => {
      const incorrectKeys = [{}, [1, 2], [{}], [{ a: 3 }]];

      for (const incorrectKey of incorrectKeys) {
        localStorage.setItem(leaderboardKey, JSON.stringify(incorrectKey));
        const leaderboard = getLeaderboard();

        expect(leaderboard).toEqual([]);
        expect(localStorage.getItem(leaderboardKey)).toBe('[]');
      }
    });
  });

  describe('#addScoreIfQualified', () => {
    test('simply adds if fewer than max number of scores', () => {
      localStorage.setItem(
        leaderboardKey,
        JSON.stringify([{ streak: 2 }, { streak: 1 }])
      );

      addScoreIfQualified(3);
      const leaderboard = getLeaderboard();

      expect(leaderboard).toEqual([
        { streak: 3 },
        { streak: 2 },
        { streak: 1 },
      ]);
    });

    test('does not exceed max number of scores', () => {
      const savedLeaderboard = [];
      for (let i = 10; i > 0; i--) savedLeaderboard.push({ streak: i });
      localStorage.setItem(leaderboardKey, JSON.stringify(savedLeaderboard));

      addScoreIfQualified(11);
      const leaderboard = getLeaderboard();

      expect(leaderboard).toHaveLength(10);
      expect(leaderboard[0].streak).toBe(11);
      expect(leaderboard[9].streak).toBe(2);
      expect(
        leaderboard.sort((a, b) => (a.streak < b.streak ? 1 : -1))
      ).toEqual(leaderboard);
    });

    test('score not added if not among top scores', () => {
      const savedLeaderboard = [];
      for (let i = 10; i > 0; i--) savedLeaderboard.push({ streak: i });
      localStorage.setItem(leaderboardKey, JSON.stringify(savedLeaderboard));

      addScoreIfQualified(0);
      const leaderboard = getLeaderboard();

      expect(leaderboard).toHaveLength(10);
      expect(leaderboard[0].streak).toBe(10);
      expect(leaderboard[9].streak).toBe(1);
      expect(
        leaderboard.sort((a, b) => (a.streak < b.streak ? 1 : -1))
      ).toEqual(leaderboard);
    });

    test('inserts in proper sorted order', () => {
      const savedLeaderboard = [10, 9, 7, 6].map((streak) => ({ streak }));
      localStorage.setItem(leaderboardKey, JSON.stringify(savedLeaderboard));

      addScoreIfQualified(8);
      const leaderboard = getLeaderboard();

      expect(leaderboard).toEqual([
        { streak: 10 },
        { streak: 9 },
        { streak: 8 },
        { streak: 7 },
        { streak: 6 },
      ]);
    });
  });
});
