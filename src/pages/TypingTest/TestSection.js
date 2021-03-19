import React from 'react';

import Input from './InputSection';
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
