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
        // Convert the counter value to a character before storing
        const charValue = String.fromCharCode(valueToStore + 65); // A = 65, B = 66, ..., E = 69
        window.localStorage.setItem(key, charValue);
      }
    } catch (error) {
      console.log(error);
    }
 };

 return [storedValue, setValue];
}