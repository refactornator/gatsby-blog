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
        const response = await dbClient.query(
          q.Map(
            q.Paginate(q.Match(q.Index('all_thoughts'))),
            q.Lambda('x', q.Get(q.Var('x')))
          )
        )

        console.log('success', response)
        return {
          statusCode: 200,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(response),
        }
      } catch (error) {
        console.log('error', error)
        return {
          statusCode: 400,
          body: JSON.stringify(error),
        }
      }
    case 'POST':
      try {
        const response = await dbClient.query(
          q.Create(q.Collection('thoughts'), {
            data: { text: event.body },
          })
        )

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
