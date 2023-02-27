import { useEffect } from "react";

// could use an effect event on onKeyPress
export function useKeyPress(
  onKeyPress: (keyPress: string) => void,
  isInputDisabled: boolean
) {
  useEffect(() => {
    function handleKeyUp({ key }: KeyboardEvent) {
      !isInputDisabled && onKeyPress(key);
    }

    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [onKeyPress, isInputDisabled]);
}
