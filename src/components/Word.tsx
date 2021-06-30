import { FC } from "react"
interface WordProps {
    word: string;
    current: boolean;
    wrong: boolean;
}
const Word: FC<WordProps> = ({word, current, wrong}) => {
    const color = wrong ? "#f94348" : current ? "#9261ff" : "#fff";
    return (
        <span
            style={{
                marginRight: ".4rem",
                marginBottom: ".2rem",
                fontFamily: "Roboto Mono",
                color
            }}
        >{word}</span>
    )
}

export default Word;