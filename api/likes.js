import url from 'url'
import faunadb, { query as q } from 'faunadb'

const { FAUNADB_SECRET: secret } = process.env

let client

if (secret) {
  client = new faunadb.Client({ secret })
}

module.exports = async (req, res) => {
  if (!client) {
    return res
      .status(500)
      .json({ error: new Error('Missing secret to connect to FaunaDB') })
  }

  const { host, pathname } = url.parse(req.headers.referer)

  console.log('host: ', host)
  console.log('pathname: ', pathname)

  switch (req.method) {
    case 'GET':
      try {
        const count = await client.query(
          q.Count(q.Match(q.Index('likes_by_path'), pathname))
        )

        console.log('count: ', count)

        res.status(200).json({ count })
      } catch (error) {
        console.log('error', error)
        res.status(400).json(error)
      }
      break
    default:
      res.status(404).json({})
  }
}
