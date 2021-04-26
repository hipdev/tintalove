import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const method = req.method

  if (method === 'POST' && req.body.artistEmail) {
    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    console.log(req.body, 'body en api')

    const msg = {
      to: req.body.artistEmail,
      from: 'em8994.no-responder.tintalove.com', // Use the email address or domain you verified above
      subject: 'Sending with Twilio SendGrid is Fun',
      text: 'and easy to do anywhere, even with Node.js',
      html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    }

    try {
      //   ;(async () => {
      //     try {
      //       await sgMail.send(msg)
      //     } catch (error) {
      //       console.error(error)
      //       if (error.response) {
      //         console.error(error.response.body)
      //       }
      //     }
      //   })()
      res.status(200).send('ok')
    } catch (error) {
      res.status(400).send(error.message)
    }
  } else {
    res.status(405).send('Method Not Allowed')
  }
}
