import { MongoClient, ServerApiVersion } from 'mongodb'

const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.h8ixgaq.mongodb.net/?retryWrites=true&w=majority`

const connectDb = () => {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 })
  return client.connect()
}

export const initOpenings = async openings => {
  let result

  console.log(uri)

  try {
    const dbClient = await connectDb()
    const db = dbClient.db(process.env.MONGODB_DATABASE)
    const collection = db.collection('openings')

    result = await collection.insertMany(openings)
    await dbClient.close()
  } catch (e) {
    console.log('error on creating user', e)
  }

  return result
}

export const getOpeningBySearch = async search => {
  let result = []

  try {
    const dbClient = await connectDb()
    const db = dbClient.db(process.env.MONGODB_DATABASE)
    const collection = db.collection('openings')

    const query = [
      search && {
        $search: {
          index: 'openings',
          text: {
            query: search,
            path: 'name'
          }
        }
      },
      {
        $limit: 20
      }
    ].filter(Boolean)

    result = await collection.aggregate(query).toArray()

    await dbClient.close()
  } catch (e) {
    console.log('error on getting user', e)
  }

  return result
}
