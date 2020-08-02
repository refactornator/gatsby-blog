// For more info, check https://www.netlify.com/docs/functions/#javascript-lambda-functions
export async function handler(event, context) {
  console.log(`event: ${JSON.stringify(event)}`)

  switch (event.httpMethod) {
    case 'GET':
      try {
        const response = {
          '@context': [
            'https://www.w3.org/ns/activitystreams',
            'https://w3id.org/security/v1',
            {
              manuallyApprovesFollowers: 'as:manuallyApprovesFollowers',
              PropertyValue: 'schema:PropertyValue',
              schema: 'http://schema.org#',
              value: 'schema:value',
            },
          ],
          partOf: 'https://william.cool/.netlify/functions/followers',
          first: 'https://william.cool/.netlify/functions/followers?page=0',
          totalItems: 0,
          orderedItems: [],
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
