import React from 'react';
import Card from '@material-ui/core/Card';

function getWordsStringFromArray(wordsArray) {
  return wordsArray.join(' ');
}

export default function WordSection(props) {
  const { words = [], currentWordIndex } = props;
  const completedWordsString = getWordsStringFromArray(
    words.slice(0, currentWordIndex)
  );
  const incompleteWordsString = getWordsStringFromArray(
    currentWordIndex + 1 === words.length
      ? []
      : words.slice(currentWordIndex + 1)
  );

  return (
    <Card>
      <p>
        <span style={{ color: '#ccc' }}>{completedWordsString}</span>&nbsp;
        <span style={{ color: 'red' }}>{words[currentWordIndex]}</span>&nbsp;
        {incompleteWordsString}
      </p>
    </Card>
  );
}
