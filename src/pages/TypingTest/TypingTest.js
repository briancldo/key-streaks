import React from 'react';

import Logo from '../../components/Logo';
import TestSection from './TestSection';
import { useRootStyles } from './TypingTest.styles';

export default function TypingTest() {
  const styles = useRootStyles();

  return (
    <div className={styles.typingTestMain}>
      <Logo />
      <div className={styles.testSection}>
        <TestSection />
      </div>
    </div>
  );
}
