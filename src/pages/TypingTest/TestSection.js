import React, { useEffect, useState } from 'react';

import Input from './InputSection';
import WordSection from './WordSection';

const GAME_STATUSES = {
  ongoing: undefined,
  won: 'You won!',
  lost: 'You lost!',
};

export default function TestSection() {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const words = ['bdo', 'is', 'the', 'goat'];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentWord, setCurrentWord] = useState(words[0]);
  const [currentEntry, setCurrentEntry] = useState('');
  const [currentStreak, setCurrentStreak] = useState(0);
  const [gameStatus, setGameStatus] = useState(GAME_STATUSES.ongoing);

  useEffect(() => {
    if (currentWordIndex < words.length) {
      let word = words[currentWordIndex];
      if (currentWordIndex < words.length - 1) word = `${word} `;
      setCurrentWord(word);
    }
  }, [currentWordIndex, words]);

  function finishCurrentWord(passed = true) {
    if (!passed) return setGameStatus(GAME_STATUSES.lost);

    setCurrentWordIndex((index) => {
      if (index + 1 === words.length) setGameStatus(GAME_STATUSES.won);
      setCurrentStreak((streak) => streak + 1);
      return index + 1;
    });
  }

  function restartGame() {
    setCurrentEntry('');
    setCurrentWordIndex(0);
    setGameStatus(GAME_STATUSES.ongoing);
  }

  return (
    <div>
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
        <button onClick={restartGame}>New Game</button>
      )}
    </div>
  );
}
