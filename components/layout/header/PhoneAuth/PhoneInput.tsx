import { BsPhone } from 'react-icons/bs'
import { useEffect, useState } from 'react'
import PhoneInput from 'react-phone-input-2'
import PhoneCaptcha from './PhoneCaptcha'
import { phone } from 'phone'

import 'react-phone-input-2/lib/style.css'

const PhoneAuth = ({ show }: any) => {
  const [phoneReady, setPhoneReady] = useState(false)
  const [phoneNumber, setPhoneNumber]: any = useState()

  const handlePhone = () => {
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

  return (
    <>
      {!show.showPhone && (
        <button
          id="sign-in-button"
          onClick={() => show.setShowPhone(true)}
          className="flex items-center justify-center border py-2 mt-3 rounded-md px-2 bg-dark-800 border-black"
        >
          Entrar con Celular <BsPhone className="text-xl ml-3" />
        </button>
      )}
      {show?.showPhone && (
        <div>
          <h2 className="font-semibold text-xl text-center mb-3">
            Indica tu número de celular
          </h2>
          <p className="w-96 text-center text-sm text-gray-400">
            Revisa el código que llegará por SMS, dice algo como:{' '}
            <span className="text-gray-300 w-">
              &quot;123456 is your verification code for Tinta Love&quot;
            </span>
          </p>
          <div className="flex justify-center mt-7">
            <PhoneInput
              country={'co'}
              onlyCountries={[
                'co',
                'es',
                'ar',
                'it',
                'ec',
                'br',
                'pe',
                'us',
                'ur',
                'mx',
              ]}
              containerClass="input-primary p-1 w-64"
              searchStyle={{ background: 'red' }}
              inputStyle={{
                background: '#111319',
                border: 'none',
                color: '#fff',
                fontSize: '1.1rem',
                width: '15rem',
              }}
              buttonStyle={{
                background: '#111319',
                border: 'none',
              }}
              dropdownStyle={{
                fontFamily: 'Inter',
                background: '#080a12',
                color: '#e2e2e2',
              }}
              placeholder="Selecciona primero el país"
              onChange={(number, country: any) => {
                setPhoneNumber(number)
                const validPhone = phone(number, {
                  country: country.countryCode,
                })
                if (validPhone.isValid) {
                  setPhoneReady(true)
                } else {
                  setPhoneReady(false)
                }
                console.log(phoneNumber, country, validPhone, 'el número')
              }}
            />
          </div>
        </div>
      )}

      {phoneReady && <PhoneCaptcha phoneNumber={phoneNumber} />}
    </>
  )
}

export default PhoneAuth
