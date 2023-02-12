import { Guess } from "@types";
import styles from "@components/Cell.module.css";
import { State } from "@types";

export default function Cell({ letter, state, revealDelay }: Props) {
  return (
    <span
      style={{
        animationDelay: `${STATES.includes(state) ? revealDelay : 0}s`,
      }}
      className={`${styles.cell} ${
        state ? styles[state] : letter ? styles.pop : ""
      } ${STATES.includes(state) ? styles.reveal : ""}`}
    >
      {letter}
    </span>
  );
}

const STATES: State[] = ["correct", "incorrect", "exists"];

type Props = {
  revealDelay: number;
} & Guess;
