import React from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';

import { useStyles } from './Mistake.styles';
import { mistakes } from '../../data/constants';

const mistakeContentMapping = {
  [mistakes.BACKSPACE]: BackspaceMistake,
  [mistakes.INCORRECT_CHARACTER]: IncorrectCharacterMistake,
};

function BackspaceMistake() {
  return <Typography>Backspace</Typography>;
}

function IncorrectCharacterMistake(props) {
  const { entry, currentWord } = props;

  return (
    <span>
      <Typography variant='body1' color='secondary'>
        {entry}
      </Typography>
      <Typography variant='body1'>{currentWord}</Typography>
    </span>
  );
}

export default function Mistake(props) {
  const styles = useStyles();
  const MistakeContent = mistakeContentMapping[props.code];

  return (
    <Card className={styles.mistakeWrapper} raised>
      <MistakeContent {...props} />
    </Card>
  );
}
