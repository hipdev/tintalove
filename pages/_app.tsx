import { motion, AnimateSharedLayout } from 'framer-motion'
import { useRouter } from 'next/router'
import { AppProps } from 'next/app'
import { createStore, StateMachineProvider } from 'little-state-machine'
import { createContext } from 'react'
import useLoginModal from 'hooks/useLoginModal'
import { UserContextProvider } from 'hooks/useUser'
import 'components/styles/global.css' // <- applied everywhere in the NextJS application scope

const handExitComplete = (): void => {
  if (typeof window !== 'undefined') {
    // Get the hash from the url
    const hashId = window.location.hash

    if (hashId) {
      // Use the hash to find the first element with that id
      const element = document.querySelector(hashId)

      if (element) {
        // Smooth scroll to that elment
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest',
        })
      }
    }
  }
}
const LoginContext = createContext({
  isOpen: null,
  setIsOpen: null,
  openModal: null,
})

const spring = {
  type: 'spring',
  damping: 20,
  stiffness: 100,
  when: 'afterChildren',
}
export { spring }

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter()
  const { isOpen, setIsOpen, openModal } = useLoginModal()

  createStore({})

  return (
    <UserContextProvider>
      <LoginContext.Provider value={{ isOpen, setIsOpen, openModal }}>
        <StateMachineProvider>
          <AnimateSharedLayout type="crossfade">
            <Component {...pageProps} key={router.route} />
          </AnimateSharedLayout>
        </StateMachineProvider>
      </LoginContext.Provider>
    </UserContextProvider>
  )
}

export { LoginContext }

export default MyApp
