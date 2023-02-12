import { useFetch } from "usehooks-ts";
import Wordle from "@components/Wordle";
import Notification from "@components/Notification";
import Navigation from "@components/Navigation";
import "./App.css";

export default function App() {
  // const { data, error } = useFetch<string[]>(URL);

  // const msg = !data ? (error ? "An error happened!" : "Fetching words...") : "";

  return (
    <div className="App">
      <Navigation>
        <h1 className="logo">Wordle</h1>
      </Navigation>
      {/* {msg.length > 0 && <Notification>{msg}</Notification>} */}
      {DATA && <Wordle wordList={DATA} max_guesses={MAX_GUESSES} />}
    </div>
  );
}

// const URL = `http://localhost:3000/solutions`;
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
