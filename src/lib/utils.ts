import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function debounce(func: (value: string) => void, delay: number) {
  let timerId: NodeJS.Timeout;
  const debounced = function (...args: [string]) {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      func(...args);
    }, delay);
  };
  debounced.cancel = () => {
    clearTimeout(timerId);
  };
  return debounced;
}
