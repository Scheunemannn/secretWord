/* eslint-disable react/prop-types */
import styles from "../styles/startScreen.module.css";

export const StartScreen = ({startGame}) => {
  return (
    <div className={styles.start}>
      <h1>Secret World</h1>
      <p>Clique no botão abaixo para começar a jogar</p>
      <button onClick={startGame}>Começar o jogo</button>
    </div>
  );
};
