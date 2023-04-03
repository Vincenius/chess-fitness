import { updateOpeningByQuery, getOpeningByQuery } from '../../lib/database'

const versionString = process.env.MODEL_VERSION.replace('.','-')

export default async function (req, res) {
  console.log('CALLED', req.body)
  if (req.headers[process.env.AUTH_HEADER] === process.env.AUTH_TOKEN) {
    const query = { [`${versionString}.generation_id`]: req.body.id }
    const [openingData = {}] = await getOpeningByQuery(query)

    console.log('yoyo', query, openingData)

    await updateOpeningByQuery(query, { [versionString]: {
      ...(openingData[versionString] || {}),
      ...(req.body.result || {})
    } })

    res.status(200).send({ })
  } else {
    res.status(401).send('Unauthorized')
  }
}
