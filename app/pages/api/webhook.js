import NextCors from 'nextjs-cors'
import { updateOpeningByQuery, getOpeningByQuery } from '../../lib/database'

const versionString = process.env.MODEL_VERSION.replace('.','-')

export default async function (req, res) {
  await NextCors(req, res, {
    methods: ['POST'],
    origin: process.env.SERVER_URL,
    optionsSuccessStatus: 200,
  })
  console.log('CALLED', req.body) // check why body is empty
  if (req.headers[process.env.AUTH_HEADER] === process.env.AUTH_TOKEN && req.body && req.body.id) {
    const query = { [`${versionString}.generation_id`]: req.body.id }
    const [openingData = {}] = await getOpeningByQuery(query)

    await updateOpeningByQuery(query, { [versionString]: {
      ...(openingData[versionString] || {}),
      ...(req.body.result || {})
    } })

    res.status(200).send({ })
  } else {
    res.status(401).send('Unauthorized')
  }
}
