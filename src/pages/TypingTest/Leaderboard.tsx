import React from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import { Leaderboard } from '../../utils/leaderboard';
import { useStyles } from './Leaderboard.styles';

interface LeaderboardProps {
  leaderboard: Leaderboard;
}

const LeaderboardUI: React.FC<LeaderboardProps> = (props) => {
  const { leaderboard } = props;
  const styles = useStyles();

  return (
    <Card className={styles.leaderboard}>
      <Typography variant='h5'>Leaderboard</Typography>
      <TableContainer component={Card}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Rank</TableCell>
              <TableCell>Streak</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leaderboard.map((entry, index) => (
              <TableRow key={`personalLeaderboardRank${index + 1}`}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{entry.streak}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default LeaderboardUI;
