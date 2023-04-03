import express from 'express'
import cors from 'cors'

import dotenv from 'dotenv'
import { v4 as uuidv4 } from 'uuid'
import fetch  from 'node-fetch'
import { generateIntroduction, generateChapter1, generateChapter2 } from './helpers/chatgpt.js'

const app = express()
app.use(express.json())
app.use(cors())
app.options('*', cors())

dotenv.config()

const port = process.env.PORT || 3000

const callWebhook = body => fetch(`${process.env.WEBHOOK_URL}`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    [process.env.AUTH_HEADER]: process.env.AUTH_TOKEN,
  },
  body: JSON.stringify(body),
}).then(res => res.json()).then(res => console.log(res))

app.get('/', (req, res) => {
  res.status(200).send('Running!')
})

app.post('/generate', async (req, res) => {
  if (req.headers[process.env.AUTH_HEADER] === process.env.AUTH_TOKEN) {
    const id = uuidv4()
    const body = req.body
    res.status(200).send({ id })

    console.log('Generated intro:', body)
    const message = await generateIntroduction(body)
    await callWebhook({ id, result: { introduction: message } })

    console.log('Generated chapters:', body)
    const [chapter1, chapter2] = await Promise.all([
      generateChapter1(body, message),
      generateChapter2(body, message)
    ])

    await callWebhook({ id, result: { chapter1, chapter2 } })
    console.log('generation complete')
  } else {
    res.status(401).send('Unauthorized')
  }
})

app.listen(port, () => {
  console.log(`chess-fitness api listening on port ${port}`)
})
