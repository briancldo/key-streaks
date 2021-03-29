import React from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';

import { useStyles, useIncorrectCharacterStyles } from './Mistake.styles';
import { mistakes } from '../../data/constants';

const mistakeContentMapping = {
  [mistakes.BACKSPACE]: BackspaceMistake,
  [mistakes.INCORRECT_CHARACTER]: IncorrectCharacterMistake,
};

function BackspaceMistake() {
  return <Typography variant='body1'>Backspace</Typography>;
}

function IncorrectCharacterMistake(props) {
  const { entry, currentWord } = props;
  const styles = useIncorrectCharacterStyles();

  return (
    <span>
      <Typography variant='body1'>
        {entry.slice(0, -1)}
        <span className={styles.incorrectCharacter}>
          {entry[entry.length - 1]}
        </span>
      </Typography>

      <Typography variant='body1'>
        {currentWord.slice(0, entry.length - 1)}
        <span className={styles.incorrectCharacter}>
          {currentWord[entry.length - 1]}
        </span>
        {currentWord.slice(entry.length)}
      </Typography>
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
