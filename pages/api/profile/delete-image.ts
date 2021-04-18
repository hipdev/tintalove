import { NextApiRequest, NextApiResponse } from 'next'
const ImageKit = require('imagekit')

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const method = req.method

  if (method === 'DELETE') {
    try {
      const imagekit = new ImageKit({
        publicKey: 'public_ErRILqyPLPmjLV+o78P2VWkWI58=',
        privateKey: 'private_BNoT09SOVyNFfmjxu2jidBx07M0=',
        urlEndpoint: 'https://ik.imagekit.io/Home/',
      })

      imagekit.deleteFile(req.body.imageId, function (error: any, result: any) {
        if (error) {
          console.log(error)
          throw new Error(error.message)
        } else {
          console.log(result)
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
