import { useState } from 'react'
import { createPhoneUser } from 'lib/queries/users'
import { mutate } from 'swr'
import { AiOutlineUnlock } from 'react-icons/ai'
import ReactCodeInput from 'react-verification-code-input'

declare const window: any

const PhoneCode = ({ modal, name }: any) => {
  const [inputCode, setInputCode]: any = useState('')
  const [loading, setLoading] = useState(false)
  const sendCode = async () => {
    setLoading(true)
    window.confirmationResult
      .confirm(inputCode)
      .then(async (result) => {
        // User signed in successfully.
        const user = result.user
        const res = await createPhoneUser(user, name)
        modal.setIsOpen(false)
        setLoading(false)

        if (res) {
          mutate(user.uid)
        }

        // ...
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        // ...
        console.log(error, 'Código inválido')
        setLoading(false)
      })
  }

  return (
    <div className="text-center flex items-center flex-col">
      <h2 className="text-2xl font-semibold mb-5">Indica el código</h2>
      <p className="text-gray-400">Escribe los 6 dígitos del SMS</p>
      <ReactCodeInput
        onComplete={(e) => {
          console.log(e, 'el código')
          setInputCode(e)
        }}
        onChange={(e) => {
          if (e.length < 6) {
            setInputCode(e)
          }
        }}
        fieldWidth={35}
        fieldHeight={40}
        autoFocus
        className="code_input mt-3"
      />

      {inputCode.length == 6 && (
        <button
          className="flex items-center justify-center border py-2 mt-5 rounded-md px-7 bg-dark-800 border-black"
          onClick={sendCode}
        >
          Verificar código
          <AiOutlineUnlock className="text-xl ml-3 mr-2" />
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
      )}
    </div>
  )
}

export default PhoneCode
