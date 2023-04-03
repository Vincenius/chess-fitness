import { getOpeningByQuery } from '../../lib/database'
import { parseResponse } from '../../lib/parser'

const versionString = process.env.MODEL_VERSION.replace('.','-')

export default async function (req, res) {
  const query = { [`${versionString}.generation_id`]: req.body.id }
  const [openingData = {}] = await getOpeningByQuery(query)
  const result = parseResponse(openingData[versionString])

  res.status(200).send(result)
}
