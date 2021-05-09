import React, { useEffect } from 'react';
import TextField from '@material-ui/core/TextField';

import { useStyles } from './InputSection.styles';
import { Mistakes } from '../../data/constants';
import { MistakeData } from './TestSection';

const inputSectionInputProps = {
  style: {
    fontSize: 25,
  },
};

interface InputSectionProps {
  currentWord: string;
  finishCurrentWord: (context?: { mistake: MistakeData }) => void;
  disabled: boolean;
  currentEntry: string;
  setCurrentEntry: React.Dispatch<React.SetStateAction<string>>;
}
const InputSection: React.FC<InputSectionProps> = (props) => {
  const {
    currentWord,
    finishCurrentWord,
    disabled,
    currentEntry,
    setCurrentEntry,
  } = props;
  const styles = useStyles();

  function focusOnInput() {
    if (disabled) return;

    const typingTestInput = document.getElementById('typing-test-input');
    if (!typingTestInput) return;
    typingTestInput.focus();
  }
  useEffect(focusOnInput, [disabled]);

  function clearCurrentEntry() {
    setCurrentEntry('');
  }
  useEffect(clearCurrentEntry, [currentWord, setCurrentEntry]);

  function checkLetter(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event?.target) return;
    const value = event.target.value;

    if (value === currentWord) finishCurrentWord();
    if (!currentWord.startsWith(value))
      finishCurrentWord({
        mistake: { code: Mistakes.INCORRECT_CHARACTER, entry: value },
      });
    if (value.length < currentEntry.length)
      finishCurrentWord({ mistake: { code: Mistakes.BACKSPACE } });

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
      // innerRef={inputRef}
    />
  );
};

export default InputSection;
