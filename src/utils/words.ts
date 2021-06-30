import src from "./words.json";

const getRandomNumber = (to: number): number => Math.floor(Math.random() * to);

const getWordsByLength = (len: number): Array<string> => {
    const str: string = src.words as string;
    const words: Array<string> = str.split(" ");
    const result: Array<string> = [];
    for(let i = 0; i < len; ++i) {
        const index = getRandomNumber(words.length);
        result.push(words[index]);
    }
    return result;
}

const getUniqueWords = (arr: Array<string>): Array<string> => {
    const set = new Set<string>();
    arr.forEach(str => set.add(str));
    const uniqueWords: Array<string> = [];
    set.forEach(str => uniqueWords.push(str));
    console.log(uniqueWords.join(" "))
    return uniqueWords;
}

export { getWordsByLength, getUniqueWords };