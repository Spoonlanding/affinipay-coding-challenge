import { API_KEY } from "./config"; // .gitgnored!
import DictionaryEntry from "./DictionaryEntry";
const baseUrl = "https://dictionaryapi.com/api/v3/references/collegiate/json";

export const getDictionaryEntry = async word => {
  const url = `${baseUrl}/${word}/?key=${API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
  return new DictionaryEntry(data);
};
