import { AppProps } from 'next/app'
import '../styles/global.css' // <- applied everywhere in the NextJS application scope
import { createStore, StateMachineProvider } from 'little-state-machine'
import { createContext } from 'react'
import useLoginModal from 'hooks/useLoginModal'

const LoginContext = createContext(null)

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [isOpen, setIsOpen, openModal] = useLoginModal()

  createStore({})

  return (
    <LoginContext.Provider value={{ isOpen, setIsOpen, openModal }}>
      <StateMachineProvider>
        <Component {...pageProps} />
      </StateMachineProvider>
    </LoginContext.Provider>
  )
}

export { LoginContext }

export default MyApp
