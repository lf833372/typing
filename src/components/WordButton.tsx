import { FC } from "react"
interface WordButtonProps {
    value: number;
    wordsNumber: number;
    setWordsNumber: any;
}
const WordButton: FC<WordButtonProps> = ({ value, wordsNumber, setWordsNumber }) => {
   return (
    <button style={{
        background: "transparent",
        color: "#ffd543",
        border: "none",
        borderBottom: value === wordsNumber ? "2px solid #ffd543" : "none",
        outline: "none",
        marginRight: "1rem",
        fontSize: ".9rem"
    }}
        onClick={() => setWordsNumber(value)}
    >{value}</button>
   ) 
}

export default WordButton