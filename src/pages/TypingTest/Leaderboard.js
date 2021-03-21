import React from 'react';

import { getLeaderboard } from '../../utils/leaderboard';

export default function Leaderboard() {
  getLeaderboard();

  return <p>Leaderboard</p>;
}
