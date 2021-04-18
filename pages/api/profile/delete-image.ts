import { NextApiRequest, NextApiResponse } from 'next'
const ImageKit = require('imagekit')

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const method = req.method

  if (method === 'DELETE') {
    try {
      const imagekit = new ImageKit({
        publicKey: 'public_EUtZgctR8vm6PmW9JTeqTLQI4AM=',
        privateKey: 'private_tD7OrL3QMs7c3jCKdGIddrBFJkE=',
        urlEndpoint: 'https://ik.imagekit.io/Home/',
      })

      imagekit.deleteFile(req.body.imageId, function (error: any, result: any) {
        if (error) {
          console.log(error)
          res.status(200).send(error.message)
        } else {
          res.status(200).send('File Deleted')
        }
      })
    } catch (error) {
      res.status(400).send(error.message)
    }
  } else {
    res.status(405).send('METHOD NOT ALLOWED')
  }
}
