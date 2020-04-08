import url from 'url'
import faunadb from 'faunadb'

import { getLocationData } from '../utils/lambdas'

const q = faunadb.query
const adminClient = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET,
})

// For more info, check https://www.netlify.com/docs/functions/#javascript-lambda-functions
export async function handler(event, context) {
  console.log(`event.body: ${event.body}`)

  const { host, pathname } = url.parse(event.headers.referer)

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
    case 'POST':
      try {
        const { 'client-ip': ipAddress } = event.headers
        const locationData = await getLocationData(ipAddress)

        const response = await dbClient.query(
          q.Create(q.Collection('messages'), {
            data: {
              host,
              ipAddress,
              path: pathname,
              text: event.body,
              ...locationData,
            },
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
