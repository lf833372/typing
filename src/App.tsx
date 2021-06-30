import { useEffect, useRef, useState } from "react";
import WordButton from "./components/WordButton";
import Layout from "./components/Layout";
import Word from "./components/Word";
import { getWordsByLength } from "./utils/words";

import {FaCheck, FaRedoAlt} from "react-icons/fa"

import "./App.css";

const App = () => {
  const [words, setWords] = useState<Array<string>>([]);
  const [current, setCurrent] = useState(0);
  const [wrongs, setWrongs] = useState<Array<number>>([])
  const [value, setValue] = useState("");
  const [wordsNumber, setWordsNumber] = useState(25);
  const inputRef = useRef<HTMLInputElement>(null);
  const [finish, setFinish] = useState(false);
  const [start, setStart] = useState(false);

  const handleRestart = () => {
    setStart(false);
    setFinish(false);
    setCurrent(0);
    setWrongs([]);
    setValue("");
    inputRef.current?.focus()
    setWords(getWordsByLength(wordsNumber));
  }

  useEffect(() => {
    setStart(false);
    setFinish(false);
    setCurrent(0);
    setWrongs([]);
    setValue("");
    inputRef.current?.focus()
    setWords(getWordsByLength(wordsNumber));
  }, [wordsNumber])

  useEffect(() => {
    if(!value.length) return;
    const word = value.trim();
    const space = value[value.length-1] === ' ';
    if(word.length) setStart(true);
    if(space) {

      if(word !== words[current]) {
        setWrongs(w => [...w, current]);
      }
      setCurrent(current + 1);
      setValue("");
    } else if(current === words.length - 1 && word.length === words[words.length - 1].length) {
      setFinish(true);
      setValue("");
    }
  }, [value, current, words])


  return (
    <Layout>
      {/* {start && <p>start</p>} */}
      <div className="controls">
        <div>
          <WordButton value={10} wordsNumber={wordsNumber} setWordsNumber={setWordsNumber} />
          <WordButton value={25} wordsNumber={wordsNumber} setWordsNumber={setWordsNumber} />
          <WordButton value={50} wordsNumber={wordsNumber} setWordsNumber={setWordsNumber} />
          <WordButton value={100} wordsNumber={wordsNumber} setWordsNumber={setWordsNumber} />
          <WordButton value={250} wordsNumber={wordsNumber} setWordsNumber={setWordsNumber} />
        </div>
        {finish && (
          <div>
            <p className="info">{start && <span></span>}<span className="finish"><FaCheck /></span></p>
          </div>
        )}
      </div>

      <div className="text">
        {words.map((word, i) => <Word key={i} word={word} current={i === current} wrong={wrongs.includes(i)} />)}
      </div>

      <div className="inputs">
        <input
          style={{
            flexGrow: 1,
            padding: ".3rem",
            backgroundColor: "rgba(255, 255, 255, .1)",
            fontSize: "1.1rem",
            outline: "none",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            fontFamily: "Roboto Mono"
          }}
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          readOnly={finish}
        />
        <button className="restart"
          onClick={handleRestart}
        >
          <FaRedoAlt />
        </button>
      </div>
    </Layout>
  )
}

export default App;