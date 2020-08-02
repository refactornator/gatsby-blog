// For more info, check https://www.netlify.com/docs/functions/#javascript-lambda-functions
export async function handler(event, context) {
  console.log(`event: ${JSON.stringify(event)}`)

  switch (event.httpMethod) {
    case 'POST':
      console.log('POST request received')
      return {
        statusCode: 200,
        body: JSON.stringify({}),
      }
    default:
      return {
        statusCode: 404,
        body: JSON.stringify({}),
      }
  }
}
