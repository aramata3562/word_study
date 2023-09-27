import React, { useState } from 'react';
import WordCard from './components/wordCard';
import words from './data/word.json';

type WordData = {
  word: string;
  meaning: string;
};

const App: React.FC = () => {
  return (
    <div>
      <h1>単語勉強</h1>
      {words.map((wordData: WordData, index: number) => (
        <WordCard key={index} word={wordData.word} meaning={wordData.meaning} />
      ))}
    </div>
  );
};

export default App;
