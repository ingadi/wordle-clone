import { MouseEvent } from "react";
import { State } from "@types";
import Row from "@components/Row";
import styles from "@components/Keyboard.module.css";

export default function Keyboard({
  keyStates,
  onKeyPress,
  revealDelay,
}: Props) {
  function handleClick(e: MouseEvent<HTMLButtonElement | HTMLDivElement>) {
    const button = e.target as HTMLButtonElement;
    if (button.tagName !== "INPUT") return;
    onKeyPress(button.value);
  }

  return (
    <div className={styles.keyboard} onClick={handleClick}>
      {keyBoardLayout.map((row, rowIdx) => (
        <Row key={rowIdx}>
          <div className={styles.row}>
            {row.map((key, keyIdx) => (
              <input
                style={{
                  transitionDelay: `${keyStates[key] ? revealDelay : 0}s`,
                }}
                className={`${styles.key} ${styles[keyStates[key] || ""]} `}
                key={keyIdx}
                type="button"
                value={key}
              />
            ))}
          </div>
        </Row>
      ))}
    </div>
  );
}

const LAYOUTS = Object.freeze({
  QWERTY: [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACKSPACE"],
  ],
});

const keyBoardLayout = LAYOUTS["QWERTY"];

type Props = {
  keyStates: { [key: string]: State };
  onKeyPress: (keyPress: string) => void;
  revealDelay: number;
};
