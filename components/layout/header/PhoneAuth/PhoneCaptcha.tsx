import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import { BsPhone } from 'react-icons/bs'
import { useEffect } from 'react'
import { auth } from 'lib/firebase'

declare const window: any

const PhoneCaptcha = ({ phone }: any) => {
  useEffect(() => {
    console.log(auth, 'auth instance')
    window.recaptchaVerifier = new RecaptchaVerifier(
      'sign-in-button',
      {
        size: 'invisible',
        callback: (response) => {
          console.log(response, 'captcha')
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          //   onSignInSubmit();
        },
      },
      auth
    )
  }, [])

  const sendSMS = () => {
    // signInWithPhoneNumber(auth, '+573177358656', window.recaptchaVerifier)
    //   .then((confirmationResult) => {
    //     // SMS sent. Prompt user to type the code from the message, then sign the
    //     // user in with confirmationResult.confirm(code).
    //     window.confirmationResult = confirmationResult
    //     // ...
    //   })
    //   .catch((error) => {
    //     // Error; SMS not sent
    //     // ...
    //   })
  }

  console.log(window.recaptchaVerifier, 'el captcha')

  return (
    <>
      <button
        id="sign-in-button"
        onClick={sendSMS}
        className="flex items-center justify-center border py-2 mt-5 rounded-md px-2 bg-dark-800 border-black"
      >
        Obtener código <BsPhone className="text-xl ml-3" />
      </button>
    </>
  )
}

export default PhoneCaptcha
