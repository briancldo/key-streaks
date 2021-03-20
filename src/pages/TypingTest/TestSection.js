import React, { useEffect, useState } from 'react';

import Input from './InputSection';
import WordSection from './WordSection';
import { useStyles } from './TestSection.styles';
import { getWordBatch } from '../../data/words';

const WORDS_PER_PAGE = 40;
const GAME_STATUSES = {
  ongoing: undefined,
  won: 'You won!',
  lost: 'You lost!',
};

function getNextWordBatch() {
  return getWordBatch(WORDS_PER_PAGE);
}

export default function TestSection() {
  const [words, setWords] = useState(getNextWordBatch);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentWord, setCurrentWord] = useState(words[0]);
  const [currentEntry, setCurrentEntry] = useState('');
  const [currentStreak, setCurrentStreak] = useState(0);
  const [gameStatus, setGameStatus] = useState(GAME_STATUSES.ongoing);
  const styles = useStyles();

  function reactToGameOver() {
    if (gameStatus !== GAME_STATUSES.ongoing) {
      document.getElementById('new-game-button').focus();
    }
  }
  useEffect(reactToGameOver, [gameStatus]);

  function computeCurrentWord() {
    if (currentWordIndex >= words.length) return;

    let word = words[currentWordIndex];
    if (currentWordIndex < words.length - 1) word = `${word} `;
    setCurrentWord(word);
  }
  useEffect(computeCurrentWord, [currentWordIndex, words]);

  function declareGameOver() {
    setGameStatus(GAME_STATUSES.lost);
  }

  function finishCurrentWord(passed = true) {
    if (!passed) return declareGameOver();

    setCurrentWordIndex((index) => {
      if (index + 1 === words.length) setGameStatus(GAME_STATUSES.won);
      return index + 1;
    });
    setCurrentStreak((streak) => streak + 1);
  }

  function restartGame() {
    setWords(getWordBatch(WORDS_PER_PAGE));
    setCurrentEntry('');
    setCurrentStreak(0);
    setCurrentWordIndex(0);
    setGameStatus(GAME_STATUSES.ongoing);
  }

  return (
    <div className={styles.testSection}>
      <WordSection {...{ words, currentWordIndex }} />
      <Input
        currentWord={currentWord}
        finishCurrentWord={finishCurrentWord}
        disabled={gameStatus !== GAME_STATUSES.ongoing}
        {...{ currentEntry, setCurrentEntry }}
      />
      <p>
        Streak: <b style={{ color: 'green' }}>{currentStreak}</b> words!
      </p>
      <p>{gameStatus}</p>
      {gameStatus !== GAME_STATUSES.ongoing && (
        <button id='new-game-button' onClick={restartGame}>
          New Game (Enter key)
        </button>
      )}
    </div>
  );
}
