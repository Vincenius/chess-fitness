import { getOpeningBySearch } from '../../lib/database'

export default async function (req, res) {
  const { q = '' } = req.query

  const openings = await getOpeningBySearch(q)

  res.status(200).json({ openings })
}
