import { useEffect } from "react";

export function useKeyPress(onKeyPress: (keyPress: string) => void) {
  useEffect(() => {
    function handleKeyUp({ key }: KeyboardEvent) {
      onKeyPress(key);
    }

    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [onKeyPress]);
}
