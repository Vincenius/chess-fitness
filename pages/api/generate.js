// import { Configuration, OpenAIApi } from "openai";

// const prompt0 = 'Answer only with "Yes" or "No". Does a chess opening with the name "${openingName}" exist?'
// const prompt1 = `Let's assume you're my chess coach. I want to learn the "${openingName}". Devide your answer into chapters, each of them starting with "CHAPTER_START" and ending with "CHAPTER_END"
// Each chapter should start with a PGN about the topic you're about to explain. Every time you are giving me a PGN add "PGN_START" in front of the PGN and "PGN_END" at the end. The PGN is followed by an explanation.
// Start with only the first chapter. It should be a short introduction that explains the basic ideas of the opening.`
// const prompt2 = `The second chapter is about the most common variations. It should have multiple examples. It should be divided into subchapters for each example. The subchapters should start with "SUB" and end with "SUB_END".`
// const prompt3 = `The last chapter is about the most common mistakes and how to punish them. It should have multiple examples as well. It should be divided into subchapters for each example. The subchapters should start with "SUB" and end with "SUB_END".`

// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(configuration);

import { answer1, answer2, answer3, answer4 } from '../../lib/mocks'

const parseChapter = answer => {
  const pgnMatch = answer.match(/(?<=PGN_START\s*).*?(?=\s*PGN_END)/gs)[0]
  const description = answer.match(/(?<=PGN_END\s*).*/gs)[0]
  const pgn = pgnMatch.replace(/\n/g, "").trim()
  return {
    pgn: pgn.startsWith('1. ') ? pgn : `1. ${pgn}`,
    description: description.replace(/\n/g, "").trim().replace('CHAPTER_END', ''),
  }
}

export default async function (req, res) {
  try {
    // check db first if already fetched once
    // otherwise generate via openapi

    const result = parseChapter(answer1)
    res.status(200).json(result)

  } catch(error) {
    console.log(error)
  }
}

  // if (!configuration.apiKey) {
  //   res.status(500).json({
  //     error: {
  //       message: "OpenAI API key not configured, please follow instructions in README.md",
  //     }
  //   });
  //   return;
  // }

  // const opening = req.body.opening || '';
  // if (opening.trim().length === 0) {
  //   // TODO use chatgpt to check if opening exists

  //   res.status(400).json({
  //     error: {
  //       message: "Please enter a opening name",
  //     }
  //   });
  //   return;
  // }


  //   const completion = await openai.createCompletion({
  //     model: "text-davinci-003",
  //     prompt: generatePrompt(animal),
  //     temperature: 0.6,
  //   });
  //   res.status(200).json({ result: completion.data.choices[0].text });
  // } catch(error) {
  //   // Consider adjusting the error handling logic for your use case
  //   if (error.response) {
  //     console.error(error.response.status, error.response.data);
  //     res.status(error.response.status).json(error.response.data);
  //   } else {
  //     console.error(`Error with OpenAI API request: ${error.message}`);
  //     res.status(500).json({
  //       error: {
  //         message: 'An error occurred during your request.',
  //       }
  //     });
  //   }

function generatePrompt(animal) {
  const capitalizedAnimal =
    animal[0].toUpperCase() + animal.slice(1).toLowerCase();
  return ``;
}
