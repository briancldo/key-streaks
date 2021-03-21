import React from 'react';
import Card from '@material-ui/core/Card';

export default function Leaderboard(props) {
  const { leaderboard } = props;

  return (
    <Card>
      <h3>Leaderboard</h3>
      {leaderboard.map((entry, index) => (
        <p key={`personalLeaderboard${index + 1}`}>
          <b>{index + 1})</b> {entry.score}
        </p>
      ))}
    </Card>
  );
}
