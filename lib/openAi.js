// import { Configuration, OpenAIApi } from "openai";
// https://platform.openai.com/docs/api-reference/completions/create
// https://platform.openai.com/docs/guides/completion/inserting-text

// const prompt0 = 'Answer only with "Yes" or "No". Does a chess opening with the name "${openingName}" exist?'
const getPrompt1 = ({ name, pgn }) => `Let's assume you're my chess coach. I want to learn the "${name}" with following moves: "${pgn}". Devide your answer into chapters, each of them starting with "CHAPTER_START" and ending with "CHAPTER_END". Each chapter should start with a PGN about the topic you're about to explain. The PGN should just include the moves and no meta information. Every time you are giving me a PGN add "PGN_START" in front of the PGN and "PGN_END" at the end. The PGN is followed by an explanation. Start with only the first chapter. It should be a short introduction that explains the basic ideas of the opening.`
// const getPrompt1 = () => "This is a test. give me a simple answer within three sentences"
const prompt2 = `The second chapter is about the most common variations. It should have multiple examples. It should be divided into subchapters for each example. The subchapters should start with "SUB" and end with "SUB_END".`
const prompt3 = `The last chapter is about the most common mistakes and how to punish them. It should have multiple examples as well. It should be divided into subchapters for each example. The subchapters should start with "SUB" and end with "SUB_END".`

// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(configuration);

export const getOpening = async opening => {
  const prompt = getPrompt1({ name: opening.name, pgn: opening.pgn });
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: process.env.MODEL_VERSION,
      messages:  [{ "role": "user", "content": prompt }],
      temperature: 0.4,
    })
  }).then(res => res.json())

  return response.choices[0].message.content
}