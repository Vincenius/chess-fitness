import fs from 'fs'
import { initOpenings } from '../../lib/database'

// temp function to import openings to database
export default async function (req, res) {
  // const data1 = JSON.parse(fs.readFileSync(process.cwd() + '/lib/openings/a.json'))
  // const data2 = JSON.parse(fs.readFileSync(process.cwd() + '/lib/openings/b.json'))
  // const data3 = JSON.parse(fs.readFileSync(process.cwd() + '/lib/openings/c.json'))
  // const data4 = JSON.parse(fs.readFileSync(process.cwd() + '/lib/openings/d.json'))
  // const data5 = JSON.parse(fs.readFileSync(process.cwd() + '/lib/openings/e.json'))

  // const data = [...data1,...data2,...data3,...data4,...data5]
  // console.log(data[0])
  await initOpenings()

  console.log('YOYO')

  res.status(200).json({ })
}
