import React from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';

import { useStyles } from './Leaderboard.styles';

export default function Leaderboard(props) {
  const { leaderboard } = props;
  const styles = useStyles();

  return (
    <Card className={styles.leaderboard}>
      <Typography variant='h5'>Leaderboard</Typography>
      {leaderboard.map((entry, index) => (
        <p key={`personalLeaderboard${index + 1}`}>
          <b>{index + 1})</b> {entry.streak}
        </p>
      ))}
    </Card>
  );
}
