import { useEffect, useRef } from 'react'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

const loaderPost = ({ src, quality }: any) => {
  return `${src}/tr:pr-true,c-at_max,f-auto,h-820,q-${quality || 75}`
}

const SliderPictures = ({ pictures, profilePicture, theRef }: any) => {
  const ref = useRef(null)

  useEffect(() => {
    if (ref.current) {
      ref.current.forceFocus() // Este mk me saco las canas, te recordaré modafucka
    }
  }, [ref.current])

  return (
    <Carousel
      swipeable
      emulateTouch
      infiniteLoop
      useKeyboardArrows
      // autoFocus
      autoPlay={false}
      stopOnHover
      showThumbs={false}
      showStatus={false}
      dynamicHeight
      // showIndicators={false}
      ref={ref}
    >
      <div>
        <img className="" src={profilePicture} style={{ maxHeight: '90%' }} />
      </div>
      {pictures?.map((pic) => (
        <div key={pic.id} style={{ maxHeight: '90%' }}>
          <img src={pic.url} />
        </div>
      ))}
    </Carousel>
  )
}

export default SliderPictures
