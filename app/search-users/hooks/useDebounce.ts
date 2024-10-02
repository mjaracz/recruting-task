import { useState, useEffect } from "react";

export const useDebounce = <Value>(value: Value, delay: number) => {
  const [debounceValue, setDebounceValue] = useState<Value>();

  useEffect(() => {
    const handlerToken = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => {
      clearTimeout(handlerToken);
    };
  }, [value, delay]);

  return debounceValue;
};
