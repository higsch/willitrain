import { writable } from 'svelte/store';

// current latlng object
export const position = writable(null);

// for persistance
export function useLocalStorage(store, key) {
  const json = localStorage.getItem(key);
  if (json) {
    store.set(JSON.parse(json));
  }
  
  const unsubscribe = store.subscribe(current => {
    localStorage.setItem(key, JSON.stringify(current));
  });

  return(unsubscribe);
}
