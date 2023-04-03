import { getOpeningByQuery, updateOpeningByQuery } from '../../lib/database'
import { parseResponse } from '../../lib/parser'

const versionString = process.env.MODEL_VERSION.replace('.','-')

export default async function (req, res) {
  try {
    const query = { pgn: req.body.pgn, name: req.body.name }
    const [openingData] = await getOpeningByQuery(query)
    if (!openingData) {
      return res.status(404).json({ error: 'Opening not found' })
    }

    if (openingData[versionString]) {
      const result = parseResponse(openingData[versionString])

      return res.status(200).json(result)
    } else {
      const response = await fetch(`${process.env.SERVER_URL}/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          [process.env.AUTH_HEADER]: process.env.AUTH_TOKEN,
        },
        body: JSON.stringify(req.body),
      }).then(res => res.json())

      const updatedOpening = { [versionString]: { generation_id: response.id } }

      await updateOpeningByQuery(query, updatedOpening)

      return res.status(200).json({ generation_id: response.id })
    }
  } catch(error) {
    console.error(error)
    return res.status(500).json({ error: 'Unexpected Error' })
  }
}
