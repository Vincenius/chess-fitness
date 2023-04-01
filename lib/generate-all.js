const fs = require('fs')
const dotenv = require('dotenv')
const { MongoClient, ServerApiVersion } = require('mongodb')

dotenv.config()

const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.h8ixgaq.mongodb.net/?retryWrites=true&w=majority`
const versionString = process.env.MODEL_VERSION.replace('.','-')

const connectDb = () => {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 })
  return client.connect()
}

const getOpeningByQuery = async query => {
  const dbClient = await connectDb()
  const db = dbClient.db(process.env.MONGODB_DATABASE)
  const collection = db.collection('openings')
  const result = await collection.find(query).toArray()
  await dbClient.close()

  return result
}

const data1 = JSON.parse(fs.readFileSync(process.cwd() + '/lib/openings/a.json'))
const data2 = JSON.parse(fs.readFileSync(process.cwd() + '/lib/openings/b.json'))
const data3 = JSON.parse(fs.readFileSync(process.cwd() + '/lib/openings/c.json'))
const data4 = JSON.parse(fs.readFileSync(process.cwd() + '/lib/openings/d.json'))
const data5 = JSON.parse(fs.readFileSync(process.cwd() + '/lib/openings/e.json'))

const data = [...data1,...data2,...data3,...data4,...data5]

const main = async () => {
  const errors = []
  for (let i = 0; i < data.length; i++) {
    const query = { pgn: data[i].pgn, name: data[i].name }
    const [opening] = await getOpeningByQuery(query)
    if (!opening[versionString] || !opening[versionString].introduction || !opening[versionString].chapter1) {
      try {
        console.log(`Generate introduction ${data[i].name} ${i} / ${data.length - 1}`)
        const result1 = await fetch('http://localhost:3000/api/generate?part=introduction', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(query)
        }).then(res => res.json())

        console.log(result1)
        console.log(`Generate chapters ${data[i].name} ${i} / ${data.length - 1}`)
        const result2 = await fetch('http://localhost:3000/api/generate?part=chapters', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(query)
        }).then(res => res.json())
        console.log(result2)
      } catch (e) {
        errors.push(query)
        console.error(`ERROR ON ${query}: ${e.message}`)
      }
    } else {
      console.log(`SKIP ${data[i].name} ${i} / ${data.length - 1}`)
    }
  }

  fs.writeFileSync('./errors.json', JSON.stringify(errors, null, 2))
}

main()