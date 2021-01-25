import url from 'url'
import axios from 'axios'
import faunadb, { query as q } from 'faunadb'

const getLocationData = async ipAddress => {
  if (ipAddress && ipAddress !== '::1') {
    console.log('ipAddress: ', ipAddress)
    const response = await axios.get(`https://ipapi.co/${ipAddress}/json/`)
    const {
      data: { city, region, country },
    } = response

    return { city, region, country }
  }
  return {}
}

const { FAUNADB_SECRET: secret } = process.env

let client

if (secret) {
  client = new faunadb.Client({ secret })
}

module.exports = async (req, res) => {
  console.log('headers: ', req.headers)

  if (!client) {
    return res
      .status(500)
      .json({ error: new Error('Missing secret to connect to FaunaDB') })
  }

  let { host, pathname } = url.parse(req.headers.referer)

  console.log('host: ', host)
  console.log('pathname: ', pathname)
  pathname = pathname.replace(/\/$/g, '')

  switch (req.method) {
    case 'GET':
      try {
        const count = await client.query(
          q.Count(q.Match(q.Index('likes_by_path'), pathname))
        )

        console.log('count: ', count)

        return res.status(200).json({ count })
      } catch (error) {
        console.log('error', error)
        return res.status(400).json(error)
      }
    case 'POST':
      try {
        const { 'x-real-ip': ipAddress } = req.headers
        const locationData = await getLocationData(ipAddress)

        const response = await client.query(
          q.Create(q.Collection('likes'), {
            data: { host, ipAddress, path: pathname, ...locationData },
          })
        )

        console.log('response: ', response)

        return res.status(200).json(response)
      } catch (error) {
        console.log('error', error)
        return res.status(400).json(error)
      }
    default:
      return res.status(404).json({})
  }
}
