import { NextApiRequest, NextApiResponse } from 'next'
import * as SendGrid from '@sendgrid/mail'

const invitationArtistEmail = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const method = req.method

  if (method === 'POST' && req.body.artist_name && req.body.email) {
    SendGrid.setApiKey(process.env.SENDGRID_API_KEY)

    const msg: SendGrid.MailDataRequired = {
      from: { email: 'admin@tintalove.com', name: 'Tinta Love' }, // Use the email address or domain you verified above
      subject: `Hola ${req.body.artist_name}, Opio Tattoo te esta invitando a su equipo`,
      text: `Hola ${req.body.artist_name}, Opio Tattoo te esta invitando a su equipo`,
      html: '<strong>and easy to do anywhere, even with Node.js</strong>',
      personalizations: [
        {
          to: [{ name: 'Julian David', email: req.body.email }],
          dynamicTemplateData: {
            artist_name: req.body.artist_name,
          },
        },
      ],
      templateId: 'd-8ac303c7e80e49d08c4b0a8c086af04f',
    }

    try {
      try {
        // await SendGrid.send(msg)
      } catch (error) {
        console.error(error)
        if (error.response) {
          console.error(error.response.body)
        }
      }

      res.status(200).send('ok')
    } catch (error) {
      res.status(400).send(error.message)
    }
  } else {
    res.status(405).send('Method Not Allowed')
  }
}

export default invitationArtistEmail
