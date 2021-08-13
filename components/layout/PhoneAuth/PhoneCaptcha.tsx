import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import { BsPhone } from 'react-icons/bs'
import { useEffect, useState } from 'react'
import { auth } from 'lib/firebase'

declare const window: any

const PhoneCaptcha = ({ code, phoneNumber }: any) => {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      'sign-in-button',
      {
        size: 'invisible',
        callback: (response) => {
          // console.log(response, 'respusta del captcha')
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          //   onSignInSubmit();
        },
      },
      auth
    )
    return () => window.recaptchaVerifier.clear()
  }, [])

  const sendSMS = () => {
    setLoading(true)
    signInWithPhoneNumber(auth, '+' + phoneNumber, window.recaptchaVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult

        // console.log(confirmationResult, 'confirmacion de codigo')
        code.setShowCode(true)
        setLoading(false)
      })
      .catch((error) => {
        // Error; SMS not sent
        // ...
        // console.log(error, 'error enviando sms')
        setLoading(false)
      })
  }

  return (
    <>
      <button
        onClick={sendSMS}
        className="flex items-center justify-center border py-2 mt-5 rounded-md px-2 bg-dark-800 border-black"
      >
        Obtener código <BsPhone className="text-xl ml-3 mr-2" />
        {loading && (
          <svg
            className="block animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
      </button>
      <div className="hidden" id="sign-in-button"></div>
    </>
  )
}

export default PhoneCaptcha
