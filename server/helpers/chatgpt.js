// https://platform.openai.com/docs/api-reference/completions/create
// https://platform.openai.com/docs/guides/completion/inserting-text
import fetch  from 'node-fetch'

const getPrompt1 = ({ name, pgn }) => `Let's assume you're my chess coach. I want to learn the "${name}" with following moves: "${pgn}". Provide your answer as valid JSON with the structure {"pgn": "your_answer", "description": "your_answer"}. As described the json should include the PGN and a description of the topic you're about to explain. The PGN should just include the moves and no meta information. Inside the description field you can include linebreaks with "\n" if necessary for better readability. Your first answer should be a short introduction that explains the basic ideas of the opening.`
const prompt2 = `Now explain the most common variations of this opening. The answer should have multiple examples. The answer should consist of an array of JSON objects with the same structure as above.`
const prompt3 = `Now explain the most common mistakes and how to punish them.The answer should have multiple examples. The answer should consist of an array of JSON objects with the same structure as above.`

export const generateIntroduction = async opening => {
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

export const generateChapter1 = async (opening, prevAnswer) => {
  const prompt = getPrompt1({ name: opening.name, pgn: opening.pgn });
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: process.env.MODEL_VERSION,
      messages:  [
        { "role": "user", "content": prompt },
        { "role": "assistant", "content": prevAnswer },
        { "role": "user", "content": prompt2 },
      ],
      temperature: 0.4,
    })
  }).then(res => res.json())

  return response.choices[0].message.content
}

export const generateChapter2 = async (opening, prevAnswer) => {
  const prompt = getPrompt1({ name: opening.name, pgn: opening.pgn });
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: process.env.MODEL_VERSION,
      messages:  [
        { "role": "user", "content": prompt },
        { "role": "assistant", "content": prevAnswer },
        { "role": "user", "content": prompt3 },
      ],
      temperature: 0.4,
    })
  }).then(res => res.json())

  return response.choices[0].message.content
}
