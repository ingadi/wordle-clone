import { useState, useRef, useCallback } from "react";
import { Guess, State, GameEvent } from "@types";

export function useGuesses(
  max_turns: number,
  wordList: string[],
  onEvent: (gameEvent: GameEvent) => void
) {
  const [solution] = useState(
    wordList[getRandomInt(wordList.length)].toLocaleLowerCase()
  );
  const solutionLength = solution.length;
  const [keyStates, setKeyStates] = useState(initialKeyStates);
  const [currentAttempt, setCurrentAttempt] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [guesses, setGuesses] = useState<Guess[][]>(() =>
    Array.from({ length: max_turns }, () =>
      Array.from({ length: solutionLength }, () => ({
        letter: null,
        state: null,
      }))
    )
  );
  const gameEventTimerId = useRef<number | null>(null);

  const onKeyPress = useCallback(
    (keyValue: string) => {
      if (!isValidKey(keyValue)) return;

      if (!isSpecialKey(keyValue)) {
        currentAttempt.length < solutionLength &&
          setCurrentAttempt(
            (prevCurrentGuess) =>
              prevCurrentGuess + keyValue.toLocaleLowerCase()
          );
      }

      if (isDelete(keyValue)) {
        currentAttempt.length > 0 &&
          setCurrentAttempt((prevCurrentGuess) =>
            prevCurrentGuess.slice(0, -1)
          );
      }

      if (isSubmit(keyValue)) {
        const canSubmitAttempt =
          history.length < max_turns &&
          !history.includes(currentAttempt) &&
          currentAttempt.length === solutionLength &&
          wordList.includes(currentAttempt);

        if (!canSubmitAttempt) {
          let msg = "";
          let type = "error";

          if (history.length >= max_turns) {
            msg = solution;
            type = "game-over";
          } else if (history.includes(currentAttempt)) {
            msg = "Already tried that!";
          } else if (currentAttempt.length !== solutionLength) {
            msg = "Not enough letters!";
          } else if (!wordList.includes(currentAttempt)) {
            msg = "Not in word list";
          }

          onEvent({
            type,
            msg,
          } as GameEvent);

          gameEventTimerId.current && clearTimeout(gameEventTimerId.current);
          gameEventTimerId.current = setTimeout(() => onEvent(null), 1200);

          return;
        }

        const currentGuess = toGuess(currentAttempt, solution);

        setGuesses((prevGuesses) => {
          const newGuesses = [...prevGuesses] as Guess[][];
          newGuesses[history.length] = currentGuess;
          return newGuesses;
        });

        setKeyStates((prevKeyStates) => {
          const newKeyStates = { ...prevKeyStates };
          currentGuess.forEach(({ letter, state }) => {
            const _letter = letter!.toLocaleUpperCase();
            newKeyStates[_letter] = getFinalKeyState(
              newKeyStates[_letter],
              state
            );
          });

          return newKeyStates;
        });

        setHistory((prevHistory) => {
          const newHistory = [...prevHistory, currentAttempt];
          newHistory.length >= max_turns &&
            onEvent({
              type: "game-over",
              msg: solution,
            });

          return newHistory;
        });

        currentAttempt === solution &&
          onEvent({
            type: "win",
            msg: ["Impressive!", "Great!"].at(
              Math.floor(Math.random() * 2)
            ) as string,
          });

        setCurrentAttempt("");
      }
    },
    [currentAttempt, history, max_turns, solutionLength]
  );

  return {
    currentAttempt,
    keyStates,
    guesses,
    history,
    onKeyPress,
  };
}

function getRandomInt(limit: number) {
  return Math.floor(Math.random() * limit);
}

function isValidKey(key: string) {
  const letterRegex = /^[a-zA-Z]$/;
  return letterRegex.test(key) || isSpecialKey(key);
}

function isSpecialKey(key: string) {
  return isDelete(key) || isSubmit(key);
}

function isDelete(keyValue: string) {
  return SPECIAL_KEYS["delete"].includes(keyValue.toLocaleUpperCase());
}

function isSubmit(keyValue: string) {
  return SPECIAL_KEYS["submit"].includes(keyValue.toLocaleUpperCase());
}

function getFinalKeyState(currentState: State, newState: State) {
  if (currentState === "incorrect") return currentState;
  if (currentState === "correct") return currentState;
  return newState;
}

function toGuess(attempt: string, solution: string) {
  const guess: Guess[] = [];
  const solutionCpy = solution.split("");

  for (let i = 0; i < attempt.length; i++) {
    let state: State = "incorrect";
    const letter = attempt[i];
    let matchIdx = letter === solutionCpy[i] ? i : solutionCpy.indexOf(letter);

    while (
      matchIdx !== i &&
      matchIdx !== -1 &&
      attempt[matchIdx] === solutionCpy[matchIdx]
    ) {
      matchIdx = solutionCpy.indexOf(letter, matchIdx + 1);
    }

    if (matchIdx !== -1) {
      solutionCpy[matchIdx] = "";
      state = matchIdx === i ? "correct" : "exists";
    }

    guess.push({ letter, state } as Guess);
  }

  return guess;
}

function range(start: number, stop: number, step = 1) {
  return Array.from(
    { length: (stop - start) / step + 1 },
    (_, i) => start + i * step
  );
}

const initialKeyStates = range("A".charCodeAt(0), "Z".charCodeAt(0)).reduce(
  (states, key) => {
    states[String.fromCharCode(key)] = null;
    return states;
  },
  {} as { [key: string]: State }
);

const SPECIAL_KEYS = Object.freeze({
  submit: ["ENTER"],
  delete: ["BACKSPACE"],
});
