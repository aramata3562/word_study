import React from 'react';
import styles from './wordCard.module.css';
type WordCardProps = {
  word: string;
  meaning: string;
};

const WordCard: React.FC<WordCardProps> = ({ word, meaning }) => {
  return (
    <div>
      <h2 className={styles.test}>{word}</h2>
      <p className={styles.meaning}>{meaning}</p>
    </div>
  );
};

export default WordCard;
