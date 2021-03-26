import Head from 'next/head'

const HeadContainer = () => {
  return (
    <Head>
      <title>Tinta Love - Amamos el tatuaje</title>

      <link
        rel="apple-touch-icon"
        sizes="512x512"
        href="/favicon/android/android-launchericon-512-512.png"
      />

      <link
        rel="apple-touch-icon"
        sizes="144x144"
        href="/favicon/android/android-launchericon-144-144.png"
      />

      <link rel="manifest" href="/manifest.json" />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta
        name="msapplication-TileImage"
        content="/favicon/ms-icon-144x144.png"
      />
      <meta name="theme-color" content="#ffffff" />

      <link rel="icon" type="image/png" sizes="16x16" href="/T.png" />
    </Head>
  )
}

export default HeadContainer
