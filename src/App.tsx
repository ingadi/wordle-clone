import Wordle from "@components/Wordle";
import Navigation from "@components/Navigation";
import "./App.css";

export default function App() {
  return (
    <div className="App">
      <Navigation>
        <h1 className="logo">Wordle</h1>
      </Navigation>
      {DATA && <Wordle wordList={DATA} max_guesses={MAX_GUESSES} />}
    </div>
  );
}

const MAX_GUESSES = 6;

const DATA = [
  "ninja",
  "spade",
  "pools",
  "drive",
  "relax",
  "times",
  "train",
  "cores",
  "pours",
  "blame",
  "banks",
  "phone",
  "bling",
  "coins",
  "hello",
];
