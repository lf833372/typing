import { ChangeEvent, useEffect, useRef, useState } from "react";
import WordButton from "./components/WordButton";
import Layout from "./components/Layout";
import Word from "./components/Word";
import { getWordsByLength } from "./utils/words";

import { FaCheck, FaRedoAlt } from "react-icons/fa";

import "./App.css";
import { useInterval } from "./hooks/useInterval";
import { useCallback } from "react";

const App = () => {
    const [words, setWords] = useState<Array<string>>([]);
    const [current, setCurrent] = useState<number>(0);
    const [wrongs, setWrongs] = useState<Array<number>>([]);
    const [value, setValue] = useState<string>("");
    const [wordsNumber, setWordsNumber] = useState<number>(25);
    const inputRef = useRef<HTMLInputElement>(null);
    const [finish, setFinish] = useState<boolean>(false);
    const [start, setStart] = useState<boolean>(false);
    const [wpm, setWpm] = useState<number>(0);
    const [time, setTime] = useState<number>(0);
    const [typed, setTyped] = useState<number>(0);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        setTyped((t) => t + 1);
    };

    const updateWPM = useCallback(() => {
        if (!time || !typed) return;
        setWpm(Math.floor(((typed / time) * 60) / wordsNumber));
    }, [time, typed, wordsNumber]);

    useInterval(() => {
        if (!start) return;
        setTime((t) => t + 1);
    }, 1000);

    const handleRestart = () => {
        setTime(0);
        setWpm(0);
        setTyped(0);
        setStart(false);
        setFinish(false);
        setCurrent(0);
        setWrongs([]);
        setValue("");
        inputRef.current?.focus();
        setWords(getWordsByLength(wordsNumber));
    };

    useEffect(() => {
        setTime(0);
        setTyped(0);
        setStart(false);
        setFinish(false);
        setCurrent(0);
        setWrongs([]);
        setValue("");
        inputRef.current?.focus();
        setWords(getWordsByLength(wordsNumber));
    }, [wordsNumber]);

    useEffect(() => {
        if (!value.length) return;
        const word = value.trim();
        const space = value[value.length - 1] === " ";
        if (word.length) setStart(true);
        if (space) {
            if (word !== words[current]) {
                setWrongs((w) => [...w, current]);
            }
            setCurrent(current + 1);
            setValue("");
        } else if (current === words.length - 1 && word.length === words[words.length - 1].length) {
            setFinish(true);
            setStart(false);
            setValue("");
            if (word !== words[current]) {
                setWrongs((w) => [...w, current]);
            }
        }
        updateWPM();
    }, [value, current, words, updateWPM]);

    return (
        <Layout>
            <div className="controls">
                <div>
                    {[10, 25, 50, 100, 250].map((val) => (
                        <WordButton
                            value={val}
                            wordsNumber={wordsNumber}
                            setWordsNumber={setWordsNumber}
                        />
                    ))}
                </div>
                <div>
                    <p className="info">
                        {finish && (
                            <span className="finish">
                                <FaCheck />
                            </span>
                        )}
                        <span className="label">
                            {wpm}
                            <span className="nolabel"> wpm</span>
                        </span>
                        <span className="label">
                            {time}
                            <span className="nolabel"> sec</span>
                        </span>
                    </p>
                </div>
            </div>

            <div className="text">
                {words.map((word, i) => (
                    <Word key={i} word={word} current={i === current} wrong={wrongs.includes(i)} />
                ))}
            </div>

            <div className="inputs">
                <input
                    className="input"
                    ref={inputRef}
                    type="text"
                    value={value}
                    onChange={handleChange}
                    readOnly={finish}
                />
                <button className="restart" onClick={handleRestart}>
                    <FaRedoAlt />
                </button>
            </div>
        </Layout>
    );
};

export default App;
