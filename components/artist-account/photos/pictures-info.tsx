import useArtistRealtime from 'hooks/realtime/use-artist-realtime'
import { Toaster } from 'react-hot-toast'
import PictureAddMain from './picture-add-main'

import PictureReady from './picture-ready'

const PicturesInfo = ({ uid, isArtist }) => {
  const { artist } = useArtistRealtime(uid)

  return (
    <div className="w-full pr-5 2xl:w-4/5  mt-10">
      <Toaster
        toastOptions={{
          className: 'bg-red-600',
          style: {
            background: '#ef3e30',
            border: 'none',
            borderRadius: '3px',
            color: '#fff',
          },
          duration: 5000,
        }}
        position="bottom-right"
      />
      <div className="flex justify-between">
        <h1 className="text-xl sm:text-2xl font-bold  sm:text-left tracking-wide mb-2">
          Fotos de perfil
        </h1>
      </div>

      {artist?.profile_picture ? (
        <PictureReady artist={artist} />
      ) : (
        <PictureAddMain uid={uid} isArtist={isArtist} />
      )}
    </div>
  )
}

export default PicturesInfo
