import React, { useState, useEffect } from 'react';
import styles from './App.module.css'
import WordCard from './components/wordCard';
import Speech from './components/speech';

// 型の宣言
type WordData = {
  word: string;
  meaning: string;
};

const App: React.FC = () => {
  //useState等の宣言
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [showMeaning, setShowMeaning] = useState(false)
  const [words, setWords] = useState<WordData[]>([])

  // 単語をランダムに並び替える
  const shuffleArray = (array: WordData[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // useEffect 最初やロードするときに読み込まれる場所 データをとってくる
  useEffect(() => {
    const endpointUrl = 'https://script.google.com/macros/s/AKfycbwtmdZr5BLRT9u-CNoTz-vkoLD1rVOXotvEFrOzGI6j0qagAGK0cLW11njo_SLop4eSjg/exec';
    fetch(endpointUrl)
      .then(response => response.json())
      .then(data => {
        setWords(shuffleArray(data));
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
    setWords(shuffleArray(words));
  }, [])

  const currentWordData = words[currentWordIndex] || { word: '', meaning: '' };




  const handleButtonClick = () => {
    setShowMeaning(!showMeaning);
  }

  const handleNextWord = () => {
    setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);

    // 発音を行う
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance();
    utterance.lang = 'en-US';
    utterance.text = words[(currentWordIndex + 1) % words.length].word; // 次の単語
    utterance.rate = 0.8
    synth.speak(utterance);
  };

  return (
    <div>
      <div className={styles.center}>
        <div className={styles.background}>
          <h1 className={styles.header}>単語勉強</h1>
          <button className={styles.flatButton} onClick={handleButtonClick}>
            {showMeaning ? 'Hide' : 'Show'}
          </button>
          <WordCard
            word={currentWordData.word}
            meaning={showMeaning ? currentWordData.meaning : ''}
          />
          <div className={styles.buttonContainer}>
            <button className={styles.outlineButton} onClick={handleNextWord}>
              Next Word
            </button>
            <Speech
              word={currentWordData.word}
              meaning={showMeaning ? currentWordData.meaning : ''}
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default App;