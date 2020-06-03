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
        const { id } = event.queryStringParameters
        const record = await dbClient.query(
          q.Get(q.Ref(q.Collection('thoughts'), id))
        )

        const response = {
          '@context': ['https://www.w3.org/ns/activitystreams'],
          id: `https://william.cool${event.path}?id=${id}`,
          type: 'Note',
          published: new Date(record.ts / 1000).toISOString(),
          attributedTo: 'https://william.cool/actor',
          to: ['https://www.w3.org/ns/activitystreams#Public'],
          content: record.data.text,
        }

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
