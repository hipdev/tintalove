import { useState } from 'react'

const useLoginModal = () => {
  const [isOpen, setIsOpen] = useState(false)

  const openModal = () => {
    console.log('me ejecuto')
    setIsOpen(true)
  }

  return [isOpen, setIsOpen, openModal]
}

export default useLoginModal
