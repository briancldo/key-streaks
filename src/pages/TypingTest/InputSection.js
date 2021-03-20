import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';

export default function InputSection(props) {
  const { currentWord, finishCurrentWord, disabled } = props;
  const [currentEntry, setCurrentEntry] = useState('');

  useEffect(() => {
    console.log('new word');
    setCurrentEntry('');
  }, [currentWord]);

  function checkLetter(event) {
    const value = event.target.value;

    if (value === currentWord) finishCurrentWord();
    if (!currentWord.startsWith(value)) finishCurrentWord(false);

    setCurrentEntry(value);
  }

  return (
    <TextField
      value={currentEntry}
      onChange={checkLetter}
      placeholder={currentWord}
      disabled={disabled}
    />
  );
}
