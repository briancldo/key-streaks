import React, { useEffect, useState } from 'react';

import Input from './InputSection';
import WordSection from './WordSection';
import Leaderboard from './Leaderboard';
import { useStyles } from './TestSection.styles';
import { getWordBatch } from '../../data/words';
import { mistakes } from '../../data/constants';
import { getLeaderboard, addScoreIfQualified } from '../../utils/leaderboard';

const WORDS_PER_PAGE = 10;
const GAME_STATUSES = {
  ongoing: undefined,
  won: 'You won!',
  lost: 'You lost!',
};

function getNextWordBatch() {
  return getWordBatch(WORDS_PER_PAGE);
}

export default function TestSection() {
  const [words, setWords] = useState(getNextWordBatch());
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentWord, setCurrentWord] = useState(words[0]);
  const [currentEntry, setCurrentEntry] = useState('');
  const [currentStreak, setCurrentStreak] = useState(0);
  const [gameStatus, setGameStatus] = useState(GAME_STATUSES.ongoing);
  const [mistake, setMistake] = useState();
  const [leaderboard, setLeaderboard] = useState(getLeaderboard());
  const styles = useStyles();

  function updateLeaderboard() {
    const newLeaderboard = addScoreIfQualified(currentStreak, leaderboard);
    setLeaderboard(newLeaderboard);
  }
  function reactToGameOver() {
    if (gameStatus !== GAME_STATUSES.ongoing) {
      updateLeaderboard();
      document.getElementById('new-game-button').focus();
    }
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(reactToGameOver, [gameStatus]);

  function computeCurrentWord() {
    if (currentWordIndex >= words.length) return;

    let word = `${words[currentWordIndex]} `;
    setCurrentWord(word);
  }
  useEffect(computeCurrentWord, [currentWordIndex, words]);

  function declareGameOver() {
    setGameStatus(GAME_STATUSES.lost);
  }

  function finishCurrentPage() {
    setWords(getNextWordBatch());
    setCurrentWordIndex(0);
  }
  function handleMistake(mistake = {}) {
    const { code, entry } = mistake;

    if (code === mistakes.INCORRECT_CHARACTER)
      setMistake(`${currentWord} = ✅, ${entry} = ❌`);
    if (code === mistakes.BACKSPACE) setMistake('backspace');

    declareGameOver();
  }
  function finishCurrentWord({ mistake } = {}) {
    if (mistake) return handleMistake(mistake);

    setCurrentWordIndex((index) => {
      if (index + 1 === words.length) finishCurrentPage();
      return index + 1;
    });
    setCurrentStreak((streak) => streak + 1);
  }

  function restartGame() {
    setWords(getWordBatch(WORDS_PER_PAGE));
    setCurrentEntry('');
    setCurrentStreak(0);
    setCurrentWordIndex(0);
    setMistake();
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
      {mistake && <p>Mistake: {mistake}</p>}
      <Leaderboard leaderboard={leaderboard} />
    </div>
  );
}
