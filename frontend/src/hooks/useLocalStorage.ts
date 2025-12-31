import { useState, useCallback } from "react";

interface UseLocalStorageReturn<T> {
  value: T | null;
  setValue: (value: T | null) => void;
  removeValue: () => void;
}

export function useLocalStorage<T>(key: string, initialValue?: T): UseLocalStorageReturn<T> {
  const [storedValue, setStoredValue] = useState<T | null>(() => {
    try {
      if (typeof window === "undefined") {
        return initialValue || null;
      }

      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue || null;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue || null;
    }
  });

  const setValue = useCallback(
    (value: T | null) => {
      try {
        setStoredValue(value);
        if (typeof window !== "undefined") {
          if (value === null) {
            window.localStorage.removeItem(key);
          } else {
            window.localStorage.setItem(key, JSON.stringify(value));
          }
        }
      } catch (error) {
        console.error(`Error writing to localStorage key "${key}":`, error);
      }
    },
    [key]
  );

  const removeValue = useCallback(() => {
    setValue(null);
  }, [setValue]);

  return { value: storedValue, setValue, removeValue };
}
