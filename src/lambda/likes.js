import url from 'url'
import faunadb from 'faunadb'

const q = faunadb.query
const adminClient = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET,
})

// For more info, check https://www.netlify.com/docs/functions/#javascript-lambda-functions
export function handler(event, context, callback) {
  console.log('event: ', event)
  console.log('context: ', context)

  const { referer, host } = event.headers
  const refererUrl = url.parse(referer)

  adminClient
    .query(
      q.CreateKey({
        database: q.Database('blog'),
        role: 'server',
      })
    )
    .then(({ secret }) => {
      const dbClient = new faunadb.Client({
        secret,
      })

      switch (event.httpMethod) {
        case 'GET':
          dbClient
            .query(
              q.Count(q.Match(q.Index('likes_by_path'), refererUrl.pathname))
            )
            .then(response => {
              console.log('success', response)
              callback(null, {
                statusCode: 200,
                body: JSON.stringify(response),
              })
            })
            .catch(error => {
              console.log('error', error)
              callback(null, {
                statusCode: 400,
                body: JSON.stringify(error),
              })
            })
          break
        case 'POST':
          dbClient
            .query(
              q.Create(q.Collection('likes'), {
                data: { host, path: refererUrl.pathname },
              })
            )
            .then(response => {
              console.log('success', response)
              callback(null, {
                statusCode: 200,
                body: JSON.stringify(response),
              })
            })
            .catch(error => {
              console.log('error', error)
              callback(null, {
                statusCode: 400,
                body: JSON.stringify(error),
              })
            })
          break
        default:
          callback(null, {
            statusCode: 404,
            body: JSON.stringify({}),
          })
      }
    })
}
