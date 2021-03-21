import { getLeaderboard, addScoreIfQualified } from '../../utils/leaderboard';

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
        JSON.stringify([{ score: 2 }, { score: 1 }])
      );

      addScoreIfQualified(3);
      const leaderboard = getLeaderboard();

      expect(leaderboard).toEqual([{ score: 3 }, { score: 2 }, { score: 1 }]);
    });

    test('does not exceed max number of scores', () => {
      const savedLeaderboard = [];
      for (let i = 10; i > 0; i--) savedLeaderboard.push({ score: i });
      localStorage.setItem(leaderboardKey, JSON.stringify(savedLeaderboard));

      addScoreIfQualified(11);
      const leaderboard = getLeaderboard();

      expect(leaderboard).toHaveLength(10);
      expect(leaderboard[0].score).toBe(11);
      expect(leaderboard[9].score).toBe(2);
      expect(leaderboard.sort((a, b) => (a.score < b.score ? 1 : -1))).toEqual(
        leaderboard
      );
    });

    test('score not added if not among top scores', () => {
      const savedLeaderboard = [];
      for (let i = 10; i > 0; i--) savedLeaderboard.push({ score: i });
      localStorage.setItem(leaderboardKey, JSON.stringify(savedLeaderboard));

      addScoreIfQualified(0);
      const leaderboard = getLeaderboard();

      expect(leaderboard).toHaveLength(10);
      expect(leaderboard[0].score).toBe(10);
      expect(leaderboard[9].score).toBe(1);
      expect(leaderboard.sort((a, b) => (a.score < b.score ? 1 : -1))).toEqual(
        leaderboard
      );
    });

    test('inserts in proper sorted order', () => {
      const savedLeaderboard = [10, 9, 7, 6].map((score) => ({ score }));
      localStorage.setItem(leaderboardKey, JSON.stringify(savedLeaderboard));

      addScoreIfQualified(8);
      const leaderboard = getLeaderboard();

      expect(leaderboard).toEqual([
        { score: 10 },
        { score: 9 },
        { score: 8 },
        { score: 7 },
        { score: 6 },
      ]);
    });
  });
});
