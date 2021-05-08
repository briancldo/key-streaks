import React from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';

import { useStyles, useIncorrectCharacterStyles } from './Mistake.styles';
import { mistakes } from '../../data/mistakes';

const BackspaceMistake: React.FC<Record<string, unknown>> = () => {
  return <Typography variant='h4'>Backspace</Typography>;
};

interface IncorrectCharacterMistakeProps {
  entry: string;
  currentWord: string;
}
const IncorrectCharacterMistake: React.FC<IncorrectCharacterMistakeProps> = (
  props
) => {
  const { entry, currentWord } = props;
  const styles = useIncorrectCharacterStyles();

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
  [mistakes.BACKSPACE]: React.FC<Record<string, unknown>>;
  [mistakes.INCORRECT_CHARACTER]: React.FC<IncorrectCharacterMistakeProps>;
}
const mistakeContentMapping: MistakeMapping = {
  [mistakes.BACKSPACE]: BackspaceMistake,
  [mistakes.INCORRECT_CHARACTER]: IncorrectCharacterMistake,
};

interface MistakeProps extends IncorrectCharacterMistakeProps {
  code: mistakes;
}
const Mistake: React.FC<MistakeProps> = (props) => {
  const styles = useStyles();
  const MistakeContent = mistakeContentMapping[props.code];

  return (
    <Card className={styles.mistakeWrapper} raised>
      <MistakeContent {...props} />
    </Card>
  );
};
export default Mistake;
