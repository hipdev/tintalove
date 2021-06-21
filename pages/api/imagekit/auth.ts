import { NextApiRequest, NextApiResponse } from 'next'
import { v4 as uuidv4 } from 'uuid'
const ImageKit = require('imagekit')

const authImagekit = async (req: NextApiRequest, res: NextApiResponse) => {
  const method = req.method

  if (method === 'GET') {
    try {
      const imagekit = new ImageKit({
        publicKey: 'public_EUtZgctR8vm6PmW9JTeqTLQI4AM=',
        privateKey: 'private_tD7OrL3QMs7c3jCKdGIddrBFJkE=',
        urlEndpoint: 'https://ik.imagekit.io/Home/',
      })
      const token = uuidv4()
      const expire = Date.now() / 1000 + 2400
      const authenticationParameters = imagekit.getAuthenticationParameters(
        token,
        expire
      )

      if (!authenticationParameters.signature)
        throw new Error('parameters not found')
      res.status(200).send(authenticationParameters)
    } catch (error) {
      res.status(400).send(error.message)
    }
  } else {
    res.status(405).send('Method Not Allowed')
  }
}

export default authImagekit
