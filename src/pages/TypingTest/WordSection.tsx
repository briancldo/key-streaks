import React from 'react';
import Card from '@material-ui/core/Card';

import { useStyles } from './WordSection.styles';

function joinWords(wordsArray: string[]) {
  return wordsArray.join(' ');
}

interface WordSectionProps {
  words?: string[];
  currentWordIndex: number;
  currentWordRef: any;
}

const WordSection: React.FC<WordSectionProps> = (props) => {
  const { words = [], currentWordIndex, currentWordRef } = props;
  const completedWords = words.slice(0, currentWordIndex);
  const incompleteWords =
    currentWordIndex + 1 === words.length
      ? []
      : words.slice(currentWordIndex + 1);
  currentWordIndex < words.length / 2
    ? incompleteWords.splice(
        words.length / 2 - completedWords.length - 1,
        0,
        '\n'
      )
    : completedWords.splice(words.length / 2, 0, '\n');
  const completedWordsString = joinWords(completedWords);
  const incompleteWordsString = joinWords(incompleteWords);
  const styles = useStyles();

  return (
    <Card className={styles.card}>
      <p style={{ whiteSpace: 'pre-wrap' }}>
        <span style={{ color: '#ccc' }}>{completedWordsString}</span>
        &nbsp;
        <span style={{ color: 'red' }} ref={currentWordRef}>
          {words[currentWordIndex]}
        </span>
        &nbsp;
        {incompleteWordsString}
      </p>
    </Card>
  );
};

export default WordSection;
