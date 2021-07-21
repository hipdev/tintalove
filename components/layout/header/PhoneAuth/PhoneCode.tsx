import { useState } from 'react'
import { createPhoneUser } from 'lib/queries/users'
import { mutate } from 'swr'

declare const window: any

const PhoneCode = ({ modal }: any) => {
  const [inputCode, setInputCode]: any = useState('')
  const sendCode = async () => {
    window.confirmationResult
      .confirm(inputCode)
      .then(async (result) => {
        // User signed in successfully.
        const user = result.user
        const res = await createPhoneUser(user)
        modal.setOpenModal(false)

        if (res) {
          mutate(user.uid)
        }

        // ...
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        // ...
        console.log(error, 'Código inválido')
      })
  }

  return (
    <div className="text-center flex items-center flex-col">
      <h2 className="text-2xl font-semibold mb-5">Indica el código</h2>
      <p className="text-gray-400">Escribe los 6 dígitos del SMS</p>
      <input
        type="number"
        value={inputCode}
        className="mt-4 py-2 text-center text-xl rounded-sm w-full bg-gr-900 border"
        onChange={(e) => {
          setInputCode(e.target.value)
          if (e.target.value.length > 5) {
          }
        }}
      />

      {inputCode.length == 6 && (
        <button
          className="flex items-center justify-center border py-2 mt-5 rounded-md px-7 bg-dark-800 border-black"
          onClick={sendCode}
        >
          Verificar código
        </button>
      )}
    </div>
  )
}

export default PhoneCode
