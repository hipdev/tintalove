import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import { BsPhone } from 'react-icons/bs'
import { useEffect } from 'react'
import { auth } from 'lib/firebase'

declare const window: any

const PhoneCaptcha = ({ code, phoneNumber }: any) => {
  useEffect(() => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      'sign-in-button',
      {
        size: 'invisible',
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          //   onSignInSubmit();
        },
      },
      auth
    )
  }, [])

  const sendSMS = () => {
    signInWithPhoneNumber(auth, '+' + phoneNumber, window.recaptchaVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult
        code.setShowCode(true)
      })
      .catch((error) => {
        // Error; SMS not sent
        // ...
        console.log(error, 'error enviando sms')
      })
  }

  return (
    <>
      <button
        onClick={sendSMS}
        className="flex items-center justify-center border py-2 mt-5 rounded-md px-2 bg-dark-800 border-black"
      >
        Obtener código <BsPhone className="text-xl ml-3" />
      </button>
      <div className="hidden" id="sign-in-button"></div>
    </>
  )
}

export default PhoneCaptcha
