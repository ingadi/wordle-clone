import { MouseEvent } from "react";
import { BsBackspace } from "react-icons/bs";
import { State } from "@types";
import Row from "@components/Row";
import styles from "@components/Keyboard.module.css";

export default function Keyboard({
  keyStates,
  onKeyPress,
  revealDelay,
  isInputDisabled,
}: Props) {
  function handleClick(key: string) {
    !isInputDisabled && onKeyPress(key);
  }

  return (
    <div className={styles.keyboard}>
      {keyBoardLayout.map((row, rowIdx) => (
        <Row key={rowIdx}>
          <div className={styles.row}>
            {row.map((key, keyIdx) => (
              <button
                key={keyIdx}
                style={{
                  transitionDelay: `${keyStates[key] ? revealDelay : 0}s`,
                }}
                className={`${styles.key} ${styles[keyStates[key] || ""]} `}
                type="button"
                onClick={() => handleClick(key)}
              >
                {key === "BACKSPACE" ? (
                  <BsBackspace className={styles.backspace} />
                ) : (
                  key
                )}
              </button>
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
  isInputDisabled: boolean;
};
