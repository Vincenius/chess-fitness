import { generateIntroduction, generateChapter1, generateChapter2 } from '../../lib/openAi'
import { getOpeningByQuery, updateOpeningByQuery } from '../../lib/database'

const versionString = process.env.MODEL_VERSION.replace('.','-')

const getIntroduction = async (req, res) => {
  try {
    const query = { pgn: req.body.pgn, name: req.body.name }
    const [openingData] = await getOpeningByQuery(query)
    if (!openingData) {
      return res.status(404).json({ error: 'Opening not found' })
    }

    if (openingData[versionString]) {
      const { introduction, chapter1, chapter2 } = openingData[versionString]
      const result = {
        introduction: JSON.parse(introduction),
        chapter1: chapter1 && JSON.parse(chapter1),
        chapter2: chapter2 && JSON.parse(chapter2)
      }
      return res.status(200).json(result)
    } else {
      const message = await generateIntroduction(req.body)
      await updateOpeningByQuery(query, { [versionString]: { introduction: message, created_at: new Date().toISOString() } })
      const result = JSON.parse(message)
      return res.status(200).json({ introduction: result })
    }
  } catch(error) {
    console.error(error)
    return res.status(500).json({ error: 'Unexpected Error' })
  }
}

const getChapters = async (req, res) => {
  const query = { pgn: req.body.pgn, name: req.body.name }
  const [openingData] = await getOpeningByQuery(query)

  if (openingData[versionString] && (!openingData[versionString].chapter1 || !openingData[versionString].chapter2)) {
    const [chapter1, chapter2] = await Promise.all([
      generateChapter1(req.body, openingData[versionString].introduction),
      generateChapter2(req.body, openingData[versionString].introduction)
    ])

    await updateOpeningByQuery(query, { [versionString]: {
      ...openingData[versionString],
      chapter1,
      chapter2,
    } })

    return res.status(200).json({
      chapter1: JSON.parse(chapter1),
      chapter2: JSON.parse(chapter2),
    })
  } else {
    return res.status(500).json({ error: 'Unexpected Error' })
  }
}

export default async function (req, res) {
  if (req.query.part === 'introduction') {
    return getIntroduction(req, res)
  } else if (req.query.part === 'chapters') {
    return getChapters(req, res)
  } else {
    return res.status(404).json({ error: 'Invalid Query' })
  }
}
