// const BASE_URL_WORDDATA = "https://api.dictionaryapi.dev";
const BASE_URL = "https://wordsapiv1.p.rapidapi.com";

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "5cbf998d24msh0b94e9e1ed9ddbcp1025e4jsn29cf3483bf63",
    "X-RapidAPI-Host": "wordsapiv1.p.rapidapi.com",
  },
};

const WordDataRapidAPI = async (
  randomWord,
  setDefinition,
  setCorrectWord,
  setSimilar
) => {
  const response = await fetch(`${BASE_URL}/words/${randomWord}/`, options);
  const data = await response.json();
  const definition = data.results[0].definition;
  const word = data.word;
  const similarWords = data.results[0].similarTo;
  setDefinition(definition);
  setCorrectWord(word);
  if (!similarWords) return;
  setSimilar(similarWords);
};

export default WordDataRapidAPI;
