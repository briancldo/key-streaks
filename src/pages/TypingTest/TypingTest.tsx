import React from 'react';

import Logo from '../../components/Logo';
import TestSection from './TestSection';
import { useRootStyles } from './TypingTest.styles';

const TypingTest: React.FC = () => {
  const styles = useRootStyles();

  return (
    <div className={styles.typingTestMain}>
      <Logo />
      <div className={styles.testSectionWrapper}>
        <TestSection />
      </div>
    </div>
  );
};

export default TypingTest;
