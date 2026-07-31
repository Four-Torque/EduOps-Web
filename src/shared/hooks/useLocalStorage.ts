import {
  useState,
  useEffect,
  useCallback,
  Dispatch,
  SetStateAction,
} from "react";

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, Dispatch<SetStateAction<T>>] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      if (typeof window === "undefined") {
        return initialValue;
      }
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(
        `로컬스토리지 값을 읽어오는데 실패했습니다 (Key: ${key}):`,
        error,
      );
      return initialValue;
    }
  });

  const setValue: Dispatch<SetStateAction<T>> = useCallback(
    (value) => {
      try {
        if (typeof window === "undefined") return;

        setStoredValue((prevValue) => {
          const valueToStore =
            value instanceof Function ? value(prevValue) : value;
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
          return valueToStore;
        });
      } catch (error) {
        console.error(
          `로컬스토리지 값을 저장하는데 실패했습니다 (Key: ${key}):`,
          error,
        );
      }
    },
    [key],
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key) {
        try {
          setStoredValue(
            event.newValue ? JSON.parse(event.newValue) : initialValue,
          );
        } catch (error) {
          console.error(`로컬스토리지 이벤트 파싱 중 에러 발생:`, error);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [key, initialValue]);

  return [storedValue, setValue];
}
