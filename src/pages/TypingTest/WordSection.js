import React, { useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';

function getWordsStringFromArray(wordsArray) {
  return wordsArray.join(' ');
}

export default function WordSection(props) {
  const { words = [] } = props;
  const [wordsString, setWordsString] = useState(
    getWordsStringFromArray(words)
  );

  useEffect(() => {
    setWordsString(getWordsStringFromArray(words));
  }, [words]);

  return (
    <Card>
      <p>{wordsString}</p>
    </Card>
  );
}
