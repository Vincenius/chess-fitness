import NextCors from 'nextjs-cors'
import { updateOpeningByQuery, getOpeningByQuery } from '../../lib/database'

const versionString = process.env.MODEL_VERSION.replace('.','-')

export default async function (req, res) {
  await NextCors(req, res, {
    methods: ['POST'],
    origin: '*', // todo
    optionsSuccessStatus: 200,
  })
  if (req.headers[process.env.AUTH_HEADER] === process.env.AUTH_TOKEN && req.body && req.body.id) {
    const query = { [`${versionString}.generation_id`]: req.body.id }
    const [openingData = {}] = await getOpeningByQuery(query)

    await updateOpeningByQuery(query, { [versionString]: {
      ...(openingData[versionString] || {}),
      ...(req.body.result || {})
    } })

    res.status(200).send({ })
  } else {
    res.status(401).send({ status: 'Unauthorized' })
  }
}
