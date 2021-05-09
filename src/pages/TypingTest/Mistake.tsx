import React from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';

import { useStyles, useIncorrectCharacterStyles } from './Mistake.styles';
import { Mistakes } from '../../data/constants';

interface BackspaceMistakeProps {
  code: Mistakes;
  currentWord: string;
}

interface IncorrectCharacterMistakeProps {
  code: Mistakes;
  entry: string;
  currentWord: string;
}

type MistakeProps = BackspaceMistakeProps | IncorrectCharacterMistakeProps;

const BackspaceMistake: React.FC<MistakeProps> = () => {
  return <Typography variant='h4'>Backspace</Typography>;
};

const IncorrectCharacterMistake: React.FC<MistakeProps> = (props) => {
  const styles = useIncorrectCharacterStyles();
  if (!('entry' in props)) return null;
  const { entry, currentWord } = props;

  function getIncorrectCharacter(
    incorrectCharacter: string,
    correctCharacter: string
  ) {
    if (incorrectCharacter !== ' ')
      return (
        <span className={styles.incorrectCharacter}>{incorrectCharacter}</span>
      );

    return (
      <span className={styles.incorrectCharacterSpace}>{correctCharacter}</span>
    );
  }

  return (
    <span>
      <Typography variant='h4'>
        {entry.slice(0, -1)}
        {getIncorrectCharacter(
          entry[entry.length - 1] as string,
          currentWord[entry.length - 1] as string
        )}
      </Typography>

      <Typography variant='h4'>
        {currentWord.slice(0, entry.length - 1)}
        <span className={styles.incorrectCharacter}>
          {currentWord[entry.length - 1]}
        </span>
        {currentWord.slice(entry.length)}
      </Typography>
    </span>
  );
};

interface MistakeMapping {
  [Mistakes.BACKSPACE]: React.FC<MistakeProps>;
  [Mistakes.INCORRECT_CHARACTER]: React.FC<MistakeProps>;
}
const mistakeContentMapping: MistakeMapping = {
  [Mistakes.BACKSPACE]: BackspaceMistake,
  [Mistakes.INCORRECT_CHARACTER]: IncorrectCharacterMistake,
};

const Mistake: React.FC<MistakeProps> = (props) => {
  const styles = useStyles();
  if (props.code === Mistakes.NONE) return null;

  const MistakeContent = mistakeContentMapping[props.code];
  return (
    <Card className={styles.mistakeWrapper} raised>
      <MistakeContent {...props} />
    </Card>
  );
};
export default Mistake;
