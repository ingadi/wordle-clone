import { useEffect } from "react";

export function useKeyPress(onKeyPress: (keyPress: string) => void) {
  function handleKeyUp({ key }: KeyboardEvent) {
    onKeyPress(key);
  }

  useEffect(() => {
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keyup", handleKeyUp);
    };
  });
}
