/* bootstrap database in your FaunaDB account */
const readline = require('readline')
const faunadb = require('faunadb')
const chalk = require('chalk')
const insideNetlify = insideNetlifyBuildContext()
const q = faunadb.query

console.log(chalk.cyan('Creating your FaunaDB Database...\n'))

// 1. Check for required enviroment variables
if (!process.env.FAUNADB_SECRET) {
  console.log(
    chalk.yellow('Required FAUNADB_SECRET enviroment variable not found.')
  )
  if (insideNetlify) {
    console.log(
      `Visit https://app.netlify.com/sites/modest-shockley-6df843/settings/deploys`
    )
    console.log(
      'and set a `FAUNADB_SECRET` value in the "Build environment variables" section'
    )
    process.exit(1)
  }
  // Local machine warning
  if (!insideNetlify) {
    console.log()
    console.log(
      'You can create fauna DB keys here: https://dashboard.fauna.com/db/keys'
    )
    console.log()
    ask(chalk.bold('Enter your faunaDB server key'), (err, answer) => {
      if (!answer) {
        console.log('Please supply a faunaDB server key')
        process.exit(1)
      }
      createFaunaDB(answer).then(() => {
        console.log('Database created')
      })
    })
  }
}

// Has var. Do the thing
if (process.env.FAUNADB_SECRET) {
  createFaunaDB(process.env.FAUNADB_SECRET).then(() => {
    console.log('Database created')
  })
}

function createFaunaDB(key) {
  console.log('Create the database!')
  const adminClient = new faunadb.Client({
    secret: key,
  })

  return adminClient
    .query(q.CreateDatabase({ name: 'blog' }))
    .finally(() => {
      return adminClient
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

          let promises = []

          promises.push(
            dbClient
              .query(q.CreateCollection({ name: 'likes' }))
              .then(() => {
                return dbClient
                  .query(
                    q.CreateIndex({
                      name: 'all_likes',
                      source: q.Collection('likes'),
                    })
                  )
                  .then(() => {
                    return dbClient.query(
                      q.CreateIndex({
                        name: 'likes_by_path',
                        source: q.Collection('likes'),
                        terms: [{ field: ['data', 'path'] }],
                      })
                    )
                  })
                  .catch((e) => {
                    console.log('something went wrong: ', e)
                  })
              })
              .catch((e) => {
                console.log('something went wrong: ', e)
              })
          )

          promises.push(
            dbClient
              .query(q.CreateCollection({ name: 'thoughts' }))
              .then(() => {
                return dbClient
                  .query(
                    q.CreateIndex({
                      name: 'all_thoughts',
                      source: q.Collection('thoughts'),
                    })
                  )
                  .catch((e) => {
                    console.log('something went wrong: ', e)
                  })
              })
              .catch((e) => {
                console.log('something went wrong: ', e)
              })
          )

          promises.push(
            dbClient
              .query(q.CreateCollection({ name: 'messages' }))
              .then(() => {
                return dbClient
                  .query(
                    q.CreateIndex({
                      name: 'all_messages',
                      source: q.Collection('messages'),
                    })
                  )
                  .catch((e) => {
                    console.log('something went wrong: ', e)
                  })
              })
              .catch((e) => {
                console.log('something went wrong: ', e)
              })
          )

          return Promise.all(promises)
        })
    })
    .catch((e) => {
      if (
        e.requestResult.statusCode === 400 &&
        e.message === 'instance already exists'
      ) {
        console.log('DB already exists')
      } else {
        console.log('something went wrong: ', e)
      }
    })
}

// Test if inside netlify build context
function insideNetlifyBuildContext() {
  if (process.env.DEPLOY_PRIME_URL) {
    return true
  }
  return false
}

// Readline util
function ask(question, callback) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })
  rl.question(question + '\n', function (answer) {
    rl.close()
    callback(null, answer)
  })
}
