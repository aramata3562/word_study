import styles from './speech.module.css'

type WordCardProps = {
    word: string;
    meaning: string;
  };

const Speech = (props:WordCardProps) => {
    const speakWord = () => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance();
    utterance.lang = 'en-US';  // 英語のアクセントを指定
    utterance.text = props.word;
    utterance.rate = 0.8;
    synth.speak(utterance);
    }


return (
    <div >
        <button onClick={speakWord} className={styles.flatButton}>
            Speak
        </button>
    </div>
);
}

export default Speech;