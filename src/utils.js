import uui from 'uuid';

// helper for generating the random holes
export const generateRandomTime = (min, max) =>
    Math.round(Math.random() * (max - min) + min);

export const generateRandomIndex = collection =>
    Math.floor(Math.random() * collection.length);

export const generateItems = ({amount = 1, isActive = false} = {}) =>
    Array.from({length: amount}, (_, i) => ({id: uui.v4(), isActive}));


// helper for working with localStorage
const storage = window.localStorage;
const storageItem = 're-whack-a-mole';

export const saveToStorage = (value, item = storageItem) =>
    storage.setItem(item, JSON.stringify(value));

export const isInStorage = (item = storageItem) => 
    storage.getItem(item) ? true : false;

export const readFromStorage = (item = storageItem) =>
    isInStorage ? JSON.parse(storage.getItem(item)): null;
