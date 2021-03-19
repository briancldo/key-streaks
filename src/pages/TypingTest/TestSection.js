import React from 'react';

import Input from './TypingTestInput';
import WordSection from './WordSection';

export default function TestSection() {
  const words = ['bdo', 'is', 'the', 'goat'];

  return (
    <div>
      <WordSection words={words} />
      <Input />
    </div>
  );
}
