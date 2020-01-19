// For more info, check https://www.netlify.com/docs/functions/#javascript-lambda-functions
export function handler(event, context, callback) {
  console.log('event: ', event)
  console.log('context: ', context)

  switch (event.httpMethod) {
    case 'POST':
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({}),
      })
      break
    default:
      callback(null, {
        statusCode: 404,
        body: JSON.stringify({}),
      })
  }
}
