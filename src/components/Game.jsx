/* eslint-disable react/prop-types */
import { useState, useRef } from "react";
import styles from "../styles/game.module.css";
export const Game = ({
  verifyLetter,
  pickedWord,
  pickedCategory,
  letters,
  guessedLetters,
  wrongLetters,
  guesses,
  score,
}) => {
  const [letter, setLetter] = useState("");

  const letterInputRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()

    verifyLetter(letter)

    setLetter("")

    letterInputRef.current.focus()
  }
  return (
    <div className={styles.game}>
      <p className={styles.points}>
        <span>pontuacao {score}</span>
      </p>
      <h1>advinhe a palavra</h1>
      <h3 className={styles.tip}>
        dica da palavra: <span>{pickedCategory}</span>
      </h3>
      <p>voce ainda tem {guesses} tentativas(s)</p>
      <div className={styles.wordContainer}>
        {letters.map((letter, i) =>
          guessedLetters.includes(letters) ? (
            <span key={i} className={styles.letter}>
              {letter}
            </span>
          ) : (
            <span key={i} className={styles.blankSquare}>
              {" "}
            </span>
          )
        )}
      </div>
      <div className={styles.letterContainer}>
        <p>tente advinhar a letra</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="letter"
            maxLength={1}
            required
            onChange={(e) => setLetter(e.target.value)}
            value={letter}
            ref={letterInputRef}
          />
          <button>jogar</button>
        </form>
      </div>
      <div className={styles.wrongLetters}>
        <p>letras ja utilizadas</p>
        {wrongLetters.map((letter, i) => (
          <span key={i}>{letter},</span>
        ))}
      </div>
    </div>
  );
};
