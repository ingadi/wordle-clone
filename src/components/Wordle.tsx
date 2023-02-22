import { useCallback, useState } from "react";
import { useGuesses } from "@hooks/useGuesses";
import { useKeyPress } from "@hooks/useKeyPress";
import { Guess, GameEvent } from "@types";
import Notification from "@components/Notification";
import Grid from "@components/Grid";
import Keyboard from "@components/Keyboard";

export default function Wordle({ wordList, max_guesses }: Props) {
  const [gameEvent, setGameEvent] = useState<GameEvent>(null);
  const { currentAttempt, guesses, keyStates, history, onKeyPress } =
    useGuesses(max_guesses, wordList, (gameEvent) => setGameEvent(gameEvent));

  const isInputDisabled =
    gameEvent?.type === "win" || gameEvent?.type === "game-over";

  useKeyPress((key) => !isInputDisabled && onKeyPress(key));

  const hasError = gameEvent?.type === "error";

  if (history.length < max_guesses) {
    guesses[history.length] = toGuess(currentAttempt, guesses[0].length);
  }

  return (
    <>
      {gameEvent && (
        <Notification revealDelay={hasError ? 0 : REVEAL_DELAY * 7}>
          {gameEvent.msg}
        </Notification>
      )}
      <Grid
        guesses={guesses}
        rowIdWithError={hasError ? history.length : null}
        revealDelay={REVEAL_DELAY}
      />
      <Keyboard
        keyStates={keyStates}
        onKeyPress={(key) => !isInputDisabled && onKeyPress(key)}
        revealDelay={REVEAL_DELAY * 7}
      />
    </>
  );
}

function toGuess(attempt: string, guessLength: number) {
  const guess = [];

  for (let i = 0; i < guessLength; i++) {
    guess.push({
      letter: attempt[i] || null,
      state: null,
    } as Guess);
  }

  return guess;
}

const REVEAL_DELAY = 0.2;

type Props = {
  max_guesses: number;
  wordList: string[];
};
