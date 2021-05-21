import { AppProps } from 'next/app'
import '../styles/global.css' // <- applied everywhere in the NextJS application scope
import { createStore, StateMachineProvider } from 'little-state-machine'

const MyApp = ({ Component, pageProps }: AppProps) => {
  createStore({})

  return (
    <StateMachineProvider>
      <Component {...pageProps} />
    </StateMachineProvider>
  )
}

export default MyApp
