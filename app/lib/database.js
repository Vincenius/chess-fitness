import { MongoClient, ServerApiVersion } from 'mongodb'

const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.h8ixgaq.mongodb.net/?retryWrites=true&w=majority`

const connectDb = () => {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 })
  return client.connect()
}

// export const initOpenings = async openings => {
//   let result

//   try {
//     const dbClient = await connectDb()
//     const db = dbClient.db(process.env.MONGODB_DATABASE)
//     const collection = db.collection('openings')

//     // result = await collection.insertMany(openings)
//     // const result = await collection.updateMany(
//     //   { }, // Filter - match all documents
//     //   [
//     //     {
//     //       $set: {
//     //         textSearch: {
//     //           $replaceAll: {
//     //             input: '$name',
//     //             find: "'",
//     //             replacement: '',
//     //           },
//     //         }
//     //       }
//     //     },
//     //     {
//     //       $set: {
//     //         textSearch: {
//     //           $replaceAll: {
//     //             input: '$textSearch',
//     //             find: ":",
//     //             replacement: '',
//     //           },
//     //         }
//     //       }
//     //     }
//     //   ]
//     // );

//     // console.log('Updated documents count:', result.modifiedCount);

//     await dbClient.close()
//   } catch (e) {
//     console.log('error on creating user', e)
//   }

//   return result
// }

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
            path: ['textSearch', 'name']
          }
        }
      },
      { $sort: { score: { $meta: 'textScore' } } },
      {
        $limit: 10
      }
    ].filter(Boolean)

    result = await collection.aggregate(query).toArray()

    await dbClient.close()
  } catch (e) {
    console.log('error on getting user', e)
  }

  return result
}

export const getOpeningByQuery = async query => {
  const dbClient = await connectDb()
  const db = dbClient.db(process.env.MONGODB_DATABASE)
  const collection = db.collection('openings')
  const result = await collection.find(query).toArray()
  await dbClient.close()

  return result
}

export const updateOpeningByQuery = async (query, update) => {
  const dbClient = await connectDb()
  const db = dbClient.db(process.env.MONGODB_DATABASE)
  const collection = db.collection('openings')
  const result = await collection.updateOne(query, { $set: update })
  await dbClient.close()

  return result
}