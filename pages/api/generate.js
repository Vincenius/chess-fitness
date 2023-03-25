import { answer1, answer2, answer3, answer4 } from '../../lib/mocks'
import { getOpening } from '../../lib/openAi'
import { getOpeningByQuery, updateOpeningByQuery } from '../../lib/database'

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
    const query = { pgn: req.body.pgn, name: req.body.name }
    const [openingData] = await getOpeningByQuery(query)
    if (!openingData) {
      return res.status(404).json({ error: 'Opening not found' })
    }

    const versionString = process.env.MODEL_VERSION.replace('.','-')
    if (openingData[versionString]) {
      const result = parseChapter(openingData[versionString].chapter1) // TODO handle multiple chapters
      return res.status(200).json(result)
    } else {
      const message = await getOpening(req.body)
      await updateOpeningByQuery(query, { [versionString]: { chapter1: message, created_at: new Date().toISOString() } })
      const result = parseChapter(message)
      res.status(200).json(result)
    }
  } catch(error) {
    console.error(error)
    res.status(500).json({ error: 'Unexpected Error' })
  }
}
