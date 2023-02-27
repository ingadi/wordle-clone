import { useEffect } from "react";

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
