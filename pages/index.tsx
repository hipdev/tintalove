import { motion } from 'framer-motion'
import Layout from 'components/layout/Layout'
import Home from 'components/home/home'
import { spring } from './_app'

export default function IndexPage() {
  return (
    <>
      <motion.div
        transition={spring}
        key={'indexPage'}
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -300, opacity: 0 }}
        id="page-transition-container"
      >
        <Layout fixed>
          <Home />
        </Layout>
      </motion.div>
    </>
  )
}
