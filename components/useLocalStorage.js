import { useState } from 'react';


function charToNumber(char) {
  return char.charCodeAt(0) - 65; // A = 65, B = 66, ..., Z = 90
 }

 export default function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
     if (typeof window === "undefined") {
       return initialValue;
     }
     try {
       const item = window.localStorage.getItem(key);
       // If the item is a valid JSON string, parse it; otherwise, convert it to a number using the helper function
       return item && item.startsWith('"') && item.endsWith('"') ? JSON.parse(item) : charToNumber(item);
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
         // Convert the value to a character before storing
         const charValue = String.fromCharCode(valueToStore + 65); // A = 65, B = 66, ..., Z = 90
         window.localStorage.setItem(key, charValue);
       }
     } catch (error) {
       console.log(error);
     }
  };
 
  return [storedValue, setValue];
 }