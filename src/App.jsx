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
//cria uma variavel contendo os estagios do jogo: comeco, meio, fim
const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
];

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);

  const [words] = useState(wordsList);

  const [pickedWord, setPickedWord] = useState("");

  const [pickedCategory, setPickedCategory] = useState("");

  const [letters, setLetters] = useState([]);

  const [guessedLetters, setGuessedLetters] = useState([]);

  const [wrongLetters, setWrongLetters] = useState([]);

  const [guesses, setGuesses] = useState(3);

  const [score, setScore] = useState(0);
  //funcao para escolher palavra e categoria de palavra
  const pickWordAndCategory = () => {
    //transforma o array de objetos (words) em uma variavel dentro da funcao
    const categories = Object.keys(words);
    //pega uma categoria aleatoria dentro daquele array de objetos, com o math random
    const category =
      categories[Math.floor(Math.random() * Object.keys(categories).length)];
    console.log(category);
    //pega uma palavra aleatoria dentro de uma categoria dentro do objeto words
    const word =
      words[category][Math.floor(Math.random() * words[category].length)];
    console.log(word);

    //transforma a palavra e a categoria que foram pegas em um objeto que e passado para outra funcao
    return { word, category };
  };

  //start the game
  const startGame = () => {
    //puxa os objetos da função pickWordAndCategory
    const { word, category } = pickWordAndCategory();
    //separa cada letra da palavra escolhida
    let wordLetters = word.split("");
    //passa um map em cada letra da palavra escolhida e deixa todas em minuscula
    wordLetters = wordLetters.map((l) => l.toLowerCase());

    console.log(word, category);
    console.log(wordLetters);
    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);
    setGameStage(stages[1].name);
  };
  //process the letter input
  const verifyLetter = () => {
    setGameStage(stages[2].name);
  };
  //goes to the start again
  const retry = () => {
    setGameStage(stages[0].name);
  };

  return (
    <div className="global">
      {gameStage === "start" && <StartScreen startGame={startGame} />}
      {gameStage === "game" && (
        <Game
          verifyLetter={verifyLetter}
          pickedWord={pickedWord}
          pickedCategory={pickedCategory}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
        />
      )}
      {gameStage === "end" && <GameOver retry={retry} />}
    </div>
  );
}

export default App;
