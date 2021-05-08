import React, { useEffect } from 'react';
import TextField from '@material-ui/core/TextField';

import { useStyles } from './InputSection.styles';
import { mistakes } from '../../data/constants';

const inputSectionInputProps = {
  style: {
    fontSize: 25,
  },
};

export default function InputSection(props) {
  const {
    currentWord,
    finishCurrentWord,
    disabled,
    currentEntry,
    setCurrentEntry,
    inputRef,
  } = props;
  const styles = useStyles();

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
    if (!currentWord.startsWith(value))
      finishCurrentWord({
        mistake: { code: mistakes.INCORRECT_CHARACTER, entry: value },
      });
    if (value.length < currentEntry.length)
      finishCurrentWord({ mistake: { code: mistakes.BACKSPACE } });

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
      className={styles.inputSection}
      InputProps={inputSectionInputProps}
      innerRef={inputRef}
    />
  );
}
