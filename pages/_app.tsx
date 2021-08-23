import { AppProps } from 'next/app'
import '../styles/global.css' // <- applied everywhere in the NextJS application scope
import { createStore, StateMachineProvider } from 'little-state-machine'
import { createContext } from 'react'
import useLoginModal from 'hooks/useLoginModal'
import { UserContextProvider } from 'hooks/useUser'

const LoginContext = createContext({
  isOpen: null,
  setIsOpen: null,
  openModal: null,
})

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { isOpen, setIsOpen, openModal } = useLoginModal()

  createStore({})

  return (
    <UserContextProvider>
      <LoginContext.Provider value={{ isOpen, setIsOpen, openModal }}>
        <StateMachineProvider>
          <Component {...pageProps} />
        </StateMachineProvider>
      </LoginContext.Provider>
    </UserContextProvider>
  )
}

export { LoginContext }

export default MyApp
