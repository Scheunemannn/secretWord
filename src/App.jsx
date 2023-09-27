/* eslint-disable no-unused-vars */
//css
import "./app.css";
//components
import { StartScreen } from "./components/startScreen";
import { Game } from "./components/game";
import { GameOver } from "./components/GameOver";
//hooks
import { useCallback, useState, useEffect } from "react";
//data
import { wordsList } from "./data/words";

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
];

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);

  const [words] = useState(wordsList);

  const [pickedWord, setPickedWord] = useState("")

  const [pickedCategory, setPickedCategory] = useState("")

  const [letters, setLetters] = useState([])

  const pickWordAndCategory = () => {
    const categories = Object.keys(words)
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]
    console.log(category)
    const word = words[category][Math.floor(Math.random() * words[category].length)]
    console.log(word)

    return {word, category}
  }

//start the game
  const startGame = () => {
    const {word, category } = pickWordAndCategory()
    let wordLetters = word.split("")

    wordLetters = wordLetters.map((l) => l.toLowerCase())
    console.log(word, category)
    console.log(wordLetters)
    setPickedWord(word)
    setPickedCategory(category)
    setLetters(letters)
    setGameStage(stages[1].name);
  };
//process the letter input
const verifyLetter =() => {
  setGameStage(stages[2].name)
}
//goes to the start again
const retry = () => {
  setGameStage(stages[0].name)
}

  return (
    <div className="global">
      {gameStage === "start" && <StartScreen startGame={startGame} />}
      {gameStage === "game" && <Game verifyLetter={verifyLetter} />}
      {gameStage === "end" && <GameOver retry={retry} />}
    </div>
  );
}

export default App;
