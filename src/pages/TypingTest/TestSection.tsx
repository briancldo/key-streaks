import React, { useEffect, useRef, useState } from 'react';
import Popper from '@material-ui/core/Popper';

import Input from './InputSection';
import WordSection from './WordSection';
import Mistake from './Mistake';
import LeaderboardUI from './Leaderboard';
import { useStyles } from './TestSection.styles';
import { getWordBatch } from '../../data/words';
import { Mistakes } from '../../data/constants';
import { getLeaderboard, addScoreIfQualified } from '../../utils/leaderboard';

const WORDS_PER_PAGE = 10;
enum GAME_STATUSES {
  ongoing = 0,
  won = 'You won!',
  lost = 'You lost!',
}

function getNextWordBatch() {
  return getWordBatch(WORDS_PER_PAGE);
}

export interface MistakeData {
  code: Mistakes;
  entry?: string;
}
const mistakeInitial: MistakeData = { code: Mistakes.NONE };

const TestSection: React.FC = () => {
  const [words, setWords] = useState(getNextWordBatch());
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentWord, setCurrentWord] = useState(words[0] as string);
  const [currentEntry, setCurrentEntry] = useState('');
  const [currentStreak, setCurrentStreak] = useState(0);
  const [gameStatus, setGameStatus] = useState(GAME_STATUSES.ongoing);
  const [mistake, setMistake] = useState<MistakeData>(mistakeInitial);
  const [leaderboard, setLeaderboard] = useState(getLeaderboard());
  const currentWordRef = useRef();
  const styles = useStyles();

  function updateLeaderboard() {
    const newLeaderboard = addScoreIfQualified(
      { streak: currentStreak },
      leaderboard
    );
    setLeaderboard(newLeaderboard);
  }
  function reactToGameOver() {
    if (gameStatus !== GAME_STATUSES.ongoing) {
      updateLeaderboard();
      const newGameButton = document.getElementById('new-game-button');
      if (!newGameButton) return;
      newGameButton.focus();
    }
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(reactToGameOver, [gameStatus]);

  function computeCurrentWord() {
    if (currentWordIndex >= words.length) return;

    const word = `${words[currentWordIndex]} `;
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
  function handleMistake(mistake: MistakeData) {
    setMistake(mistake);
    declareGameOver();
  }
  function finishCurrentWord(context?: { mistake: MistakeData }) {
    if (context) return handleMistake(context.mistake as MistakeData);

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
    setMistake(mistakeInitial);
    setGameStatus(GAME_STATUSES.ongoing);
  }

  return (
    <div className={styles.testSection}>
      <WordSection {...{ words, currentWordIndex, currentWordRef }} />
      <>
        <Popper open={mistake !== undefined} anchorEl={currentWordRef.current}>
          <Mistake {...{ ...mistake, currentWord }} />
        </Popper>
        <Input
          currentWord={currentWord}
          finishCurrentWord={finishCurrentWord}
          disabled={gameStatus !== GAME_STATUSES.ongoing}
          {...{ currentEntry, setCurrentEntry }}
        />
      </>
      <p>
        Streak: <b style={{ color: 'green' }}>{currentStreak}</b> words!
      </p>
      <p>{gameStatus}</p>
      {gameStatus !== GAME_STATUSES.ongoing && (
        <button id='new-game-button' onClick={restartGame}>
          New Game (Enter key)
        </button>
      )}
      <LeaderboardUI leaderboard={leaderboard} />
    </div>
  );
};

export default TestSection;
