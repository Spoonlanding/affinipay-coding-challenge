import { API_KEY } from "../config"; // .gitgnored!
import DictionaryEntry from "./DictionaryEntry";
const baseUrl = "https://dictionaryapi.com/api/v3/references/collegiate/json";

export const getDictionaryEntry = async word => {
  const url = `${baseUrl}/${word}/?key=${API_KEY}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    return new DictionaryEntry(data);
  } catch (e) {
    console.error(`Error fetching dictionary data for ${word} \n${e}`);
    throw e;
  }
};
