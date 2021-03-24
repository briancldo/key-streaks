import React, { useEffect } from 'react';
import TextField from '@material-ui/core/TextField';

export default function InputSection(props) {
  const {
    currentWord,
    finishCurrentWord,
    disabled,
    currentEntry,
    setCurrentEntry,
  } = props;

  function focusOnInput() {
    if (!disabled) document.getElementById('typing-test-input').focus();
  }
  useEffect(focusOnInput, [disabled]);

  function clearCurrentEntry() {
    setCurrentEntry('');
  }
  useEffect(clearCurrentEntry, [currentWord, setCurrentEntry]);

  function checkLetter(event) {
    const value = event.target.value;

    if (value === currentWord) finishCurrentWord();
    if (!currentWord.startsWith(value)) finishCurrentWord(false);
    if (value.length < currentEntry.length) finishCurrentWord(false);

    setCurrentEntry(value);
  }

  return (
    <TextField
      id='typing-test-input'
      value={currentEntry}
      onChange={checkLetter}
      placeholder={currentWord}
      disabled={disabled}
      variant='outlined'
      size='medium'
      autoComplete='off'
    />
  );
}
