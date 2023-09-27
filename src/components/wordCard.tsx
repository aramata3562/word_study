import React from 'react';

type WordCardProps = {
  word: string;
  meaning: string;
};

const WordCard: React.FC<WordCardProps> = ({ word, meaning }) => {
  return (
    <div>
      <h2>{word}</h2>
      <p>{meaning}</p>
    </div>
  );
};

export default WordCard;
