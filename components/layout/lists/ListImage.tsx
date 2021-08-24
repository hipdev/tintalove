import { getListImage } from 'lib/queries/lists'
import useSWR from 'swr'
import Image from 'next/image'

const ListImage = ({ postId }) => {
  const { data }: any = useSWR(['getListImage', postId], getListImage)

  // console.log(data, 'data list image')

  return (
    <>
      {!data?.post ? (
        <div className="p-8 bg-gray-400">
          <Image
            src="/box.png"
            alt="Sin fotos en la lista"
            width={400}
            height={400}
          />
        </div>
      ) : (
        <img
          src={`${data.post.post_image}/tr:pr-true,c-at_max,f-auto,w-150,q-90`}
          alt=""
          className="w-full h-full object-cover"
        />
      )}
    </>
  )
}

export default ListImage
