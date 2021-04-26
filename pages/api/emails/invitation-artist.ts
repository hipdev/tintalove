import { NextApiRequest, NextApiResponse } from 'next'
import * as SendGrid from '@sendgrid/mail'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const method = req.method

  if (method === 'POST' && req.body.artist_name && req.body.email) {
    SendGrid.setApiKey(process.env.SENDGRID_API_KEY)

    const msg: SendGrid.MailDataRequired = {
      to: req.body.email,
      from: { email: 'admin@tintalove.com', name: 'Tinta Love' }, // Use the email address or domain you verified above
      subject: `Hola ${req.body.artist_name}, Opio Tattoo te esta invitando a su equipo`,
      text: `Hola ${req.body.artist_name}, Opio Tattoo te esta invitando a su equipo`,
      html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    }

    try {
      ;(async () => {
        try {
          await SendGrid.send(msg)
        } catch (error) {
          console.error(error)
          if (error.response) {
            console.error(error.response.body)
          }
        }
      })()
      res.status(200).send('ok')
    } catch (error) {
      res.status(400).send(error.message)
    }
  } else {
    res.status(405).send('Method Not Allowed')
  }
}
