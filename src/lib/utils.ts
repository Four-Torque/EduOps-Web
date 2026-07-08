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

export function formatPhoneNumber(value: string, type: "phone" | "vendor") {
  if (!value) return "";

  const num = value.replace(/[^\d]/g, "");

  if (type === "phone") {
    if (num.length <= 3) return num;
    if (num.length <= 7) {
      return `${num.slice(0, 3)}-${num.slice(3)}`;
    }
    return `${num.slice(0, 3)}-${num.slice(3, 7)}-${num.slice(7, 11)}`;
  }

  if (type === "vendor") {
    if (num.startsWith("02")) {
      if (num.length <= 2) return num;
      if (num.length <= 5) {
        return `${num.slice(0, 2)}-${num.slice(2)}`;
      }
      if (num.length <= 9) {
        return `${num.slice(0, 2)}-${num.slice(2, 5)}-${num.slice(5, 9)}`;
      }
      return `${num.slice(0, 2)}-${num.slice(2, 6)}-${num.slice(6, 10)}`;
    } else {
      if (num.length <= 3) return num;
      if (num.length <= 6) {
        return `${num.slice(0, 3)}-${num.slice(3)}`;
      }
      if (num.length <= 10) {
        return `${num.slice(0, 3)}-${num.slice(3, 6)}-${num.slice(6, 10)}`;
      }
      return `${num.slice(0, 3)}-${num.slice(3, 7)}-${num.slice(7, 11)}`;
    }
  }

  return num;
}
