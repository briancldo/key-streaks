import React from 'react';

import TestSection from './TestSection';
import { useRootStyles } from './TypingTest.styles';

export default function TypingTest() {
  const styles = useRootStyles();

  return (
    <div className={styles.typingTestMain}>
      <h1>Typing Test</h1>
      <div className={styles.testSection}>
        <TestSection />
      </div>
    </div>
  );
}
