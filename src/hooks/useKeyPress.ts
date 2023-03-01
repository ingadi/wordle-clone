import {
  useEffect,
  experimental_useEffectEvent as useEffectEvent,
} from "react";

// could use an effect event on onKeyPress
export function useKeyPress(
  handleKeyPress: (keyPress: string) => void,
  isInputDisabled: boolean
) {
  const onKeyPress = useEffectEvent(handleKeyPress);

  useEffect(() => {
    function handleKeyUp({ key }: KeyboardEvent) {
      !isInputDisabled && onKeyPress(key);
    }

    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [isInputDisabled]);
}
