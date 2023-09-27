import React, { useState, useEffect } from 'react';

import WordCard from './components/wordCard';
import words from './data/word.json';

type WordData = {
  word: string;
  meaning: string;
};

const App: React.FC = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [showMeaning, setShowMeaning] = useState(false)
  const [words, setWords] = useState<WordData[]>([])

  useEffect(() => {
    const endpointUrl = 'https://script.google.com/macros/s/AKfycbx0rnDDPvU3TlIYD4F37d1IUcCn_v39sDcioRJMu5-FGHGYREbTlFOkN5TGx7jOqsF1ZA/exec';
    fetch(endpointUrl)
      .then(response => response.json())
      .then(data => {
        setWords(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
    }, [])

  const handleButtonClick = () => {
    setShowMeaning(!showMeaning);
  };

  const currentWordData = words[currentWordIndex] || { word: '', meaning: '' };

  return (
    <div>
      <h1>単語勉強</h1>
      <button onClick={handleButtonClick}>
      {showMeaning ? 'Hide' : 'Show'}
        </button>
        <WordCard
        word={currentWordData.word}
        meaning={showMeaning ? currentWordData.meaning : ''}
      />
      <button onClick={() => setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length)}>
        Next Word
      </button>
    </div>
  );
};

export default App;