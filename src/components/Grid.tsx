import { Guess } from "@types";
import Row from "@components/Row";
import Cell from "@components/Cell";
import styles from "@components/Grid.module.css";

export default function Grid({ guesses, rowIdWithError, revealDelay }: Props) {
  return (
    <div className={styles.grid}>
      {guesses.map((guess, rowIdx) => (
        <Row key={rowIdx} hasError={rowIdx === rowIdWithError}>
          {guess.map(({ letter, state }, colIdx) => (
            <Cell
              key={colIdx}
              letter={letter}
              state={state}
              revealDelay={revealDelay * colIdx}
            />
          ))}
        </Row>
      ))}
    </div>
  );
}

type Props = {
  guesses: Guess[][];
  rowIdWithError: number | null;
  revealDelay: number;
};

// key={`${rowIdx}-${rowIdx === rowIdWithError ? Date.now() : 0}`}
