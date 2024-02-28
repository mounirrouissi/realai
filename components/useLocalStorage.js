// useLocalStorage.js

import { useState } from 'react';

export default function useLocalStorage(key, initialValue) {


const [storedValue, setStoredValue] = useState(() => {
  if (typeof window === "undefined") {
    return initialValue;
  }
  try {
    const item = window.localStorage.getItem(key);
   // Check if the item is a valid JSON string before parsing
   return item && item.startsWith('"') && item.endsWith('"') ? JSON.parse(item) : item;
  } catch (error) {
    console.log(error);
    return initialValue;
  }
});

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(value);
      if (typeof window !== "undefined") {
        // // Ensure that strings are stored as valid JSON by enclosing them in double quotes
        // const jsonValue = typeof valueToStore === 'string' ? `"${valueToStore}"` : valueToStore;
        // window.localStorage.setItem(key, JSON.stringify(jsonValue));
          // Store strings directly without adding double quotes
      window.localStorage.setItem(key, valueToStore);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
}
