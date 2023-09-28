/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
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

const guessesQty = 3

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);

  const [words] = useState(wordsList);

  const [pickedWord, setPickedWord] = useState("");

  const [pickedCategory, setPickedCategory] = useState("");

  const [letters, setLetters] = useState([]);

  const [guessedLetters, setGuessedLetters] = useState([]);

  const [wrongLetters, setWrongLetters] = useState([]);

  const [guesses, setGuesses] = useState(guessesQty);

  const [score, setScore] = useState(0);
  //funcao para escolher palavra e categoria de palavra
  const pickWordAndCategory = useCallback(() => {
    //transforma o array de objetos (words) em uma variavel dentro da funcao
    const categories = Object.keys(words);
    //pega uma categoria aleatoria dentro daquele array de objetos, com o math random
    const category =
      categories[Math.floor(Math.random() * Object.keys(categories).length)];
    //pega uma palavra aleatoria dentro de uma categoria dentro do objeto words
    const word =
      words[category][Math.floor(Math.random() * words[category].length)];

    //transforma a palavra e a categoria que foram pegas em um objeto que e passado para outra funcao
    return { word, category };
  }, [words]);

  //start the game
  const startGame = useCallback(() => {
    clearLetterStates()
    //puxa os objetos da função pickWordAndCategory
    const { word, category } = pickWordAndCategory();
    //separa cada letra da palavra escolhida
    let wordLetters = word.split("");
    //passa um map em cada letra da palavra escolhida e deixa todas em minuscula
    wordLetters = wordLetters.map((l) => l.toLowerCase());

    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);
    setGameStage(stages[1].name);
  }, [pickWordAndCategory]);
  //process the letter input
  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase();

    // check if letter has already been utilized
    if (
      guessedLetters.includes(normalizedLetter) ||
      wrongLetters.includes(normalizedLetter)
    ) {
      return;
    }

    // push guessed letter or remove a chance
    if (letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        letter,
      ]);
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter,
      ]);

      setGuesses((actualGuesses) => actualGuesses - 1);
    }
  };

  const clearLetterStates = () => {
    setGuessedLetters([])
    setWrongLetters([])
  }

useEffect (() => {
  if(guesses <= 0) {
    clearLetterStates()

    setGameStage(stages[2].name)
  }
}, [guesses])

useEffect(() => {
  const uniqueLetters = [...new Set(letters)];


  // win condition
  if (guessedLetters.length === uniqueLetters.length) {
    // add score
    setScore((actualScore) => (actualScore += 100));

    // restart game with new word
    startGame();
  }
}, [guessedLetters, letters, startGame]);

//goes to the start again
  const retry = () => {
    setScore(0)
    setGuesses(guessesQty)
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
      {gameStage === "end" && <GameOver retry={retry} score={score} />}
    </div>
  );
}

export default App;
