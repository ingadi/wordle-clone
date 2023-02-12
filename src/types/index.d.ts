export type State = "exists" | "incorrect" | "correct" | null;

type Letter =
  | "a"
  | "b"
  | "c"
  | "d"
  | "e"
  | "f"
  | "g"
  | "h"
  | "i"
  | "j"
  | "k"
  | "l"
  | "m"
  | "n"
  | "o"
  | "p"
  | "q"
  | "r"
  | "s"
  | "t"
  | "u"
  | "v"
  | "w"
  | "x"
  | "y"
  | "z"
  | null;

export type Guess = { letter: Letter; state: State };

export type GameEvent = {
  type: "win" | "game-over" | "error";
  msg: string;
} | null;
