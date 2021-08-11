import { BsPhone } from 'react-icons/bs'
import { useState } from 'react'
import PhoneInput from 'react-phone-input-2'
import PhoneCaptcha from './PhoneCaptcha'
import { phone } from 'phone'

import 'react-phone-input-2/lib/style.css'
import PhoneCode from './PhoneCode'

const PhoneAuth = ({ show, modal }: any) => {
  const [phoneReady, setPhoneReady] = useState(false)
  const [showCode, setShowCode] = useState(false)
  const [phoneNumber, setPhoneNumber]: any = useState()

  return (
    <>
      {!showCode && (
        <>
          {show.showPhoneButton && (
            <button
              id="sign-in-button"
              onClick={() => show.setShowPhoneButton(false)}
              className="flex items-center justify-center border py-2 mt-3 rounded-md px-2 bg-dark-800 border-black"
            >
              Entrar con Celular <BsPhone className="text-xl ml-3" />
            </button>
          )}
          {!show?.showPhoneButton && (
            <div>
              <h2 className="font-semibold text-xl text-center mb-3">
                Indica tu número de celular
              </h2>
              <p className="w-full sm:w-96 text-center text-sm text-gray-400">
                Revisa el código que llegará por SMS, dice algo como:{' '}
                <span className="text-gray-300 ">
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
                  containerClass="input-primary p-1 w-full sm:w-64"
                  searchStyle={{ background: 'red' }}
                  inputStyle={{
                    background: '#111319',
                    border: 'none',
                    color: '#fff',
                    fontSize: '1rem',
                  }}
                  inputProps={{
                    autoFocus: true,
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
                  }}
                />
              </div>
            </div>
          )}

          {phoneReady && (
            <PhoneCaptcha
              phoneNumber={phoneNumber}
              code={{ showCode, setShowCode }}
            />
          )}
        </>
      )}
      {showCode && (
        <PhoneCode
          phoneNumber={phoneNumber}
          code={{ showCode, setShowCode }}
          modal={modal}
        />
      )}
    </>
  )
}

export default PhoneAuth
