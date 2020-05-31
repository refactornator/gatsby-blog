import faunadb from 'faunadb'

const q = faunadb.query
const adminClient = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET,
})

// For more info, check https://www.netlify.com/docs/functions/#javascript-lambda-functions
export async function handler(event, context) {
  console.log(`event.body: ${event.body}`)

  const { secret } = await adminClient.query(
    q.CreateKey({
      database: q.Database('blog'),
      role: 'server',
    })
  )

  const dbClient = new faunadb.Client({
    secret,
  })

  switch (event.httpMethod) {
    case 'GET':
      try {
        const thoughtRecords = await dbClient.query(
          q.Map(
            q.Paginate(q.Match(q.Index('all_thoughts'))),
            q.Lambda('x', q.Get(q.Var('x')))
          )
        )

        const response = {
          '@context': 'https://www.w3.org/ns/activitystreams',
          summary: "William's thoughts",
          type: 'OrderedCollection',
          totalItems: 0,
          orderedItems: [],
        }

        response.orderedItems = thoughtRecords.data.map(record => {
          return {
            '@context': 'https://www.w3.org/ns/activitystreams',
            id: `https://william.cool/newThought/${record.ref.id}`,
            type: 'Create',
            actor: 'https://william.cool/actor',
            object: {
              id: `https://william.cool/thought/${record.ref.id}`,
              type: 'Note',
              content: record.data.text,
              published: new Date(record.ts / 1000).toISOString(),
              attributedTo: 'https://william.cool/actor',
              to: 'https://www.w3.org/ns/activitystreams#Public',
            },
          }
        })
        response.totalItems = response.orderedItems.length

        console.log('success', response)
        return {
          statusCode: 200,
          body: JSON.stringify(response),
        }
      } catch (error) {
        console.log('error', error)
        return {
          statusCode: 400,
          body: JSON.stringify(error),
        }
      }
    default:
      return {
        statusCode: 404,
        body: JSON.stringify({}),
      }
  }
}
