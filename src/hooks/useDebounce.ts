import { useRef } from "react";

export function useDebounce(func: (...args: any) => void, delay: number) {
  const ref = useRef<any>(null);

  return (...args: any[]) => {
    clearTimeout(ref.current);
    ref.current = setTimeout(() => func(...args), delay);
  };
}
