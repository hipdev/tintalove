import { getListImage } from 'lib/queries/lists'
import useSWR from 'swr'
import Image from 'next/image'

const ListImage = ({ listId }: any) => {
  const { data: listImage } = useSWR(['getListImage', listId], getListImage)
  return (
    <>
      {listImage?.length == 0 ? (
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
          src={`${
            listImage && listImage[0]?.posts.photo_info?.url
          }/tr:pr-true,c-at_max,f-auto,w-150,q-90`}
          alt=""
          className="w-full h-full object-cover"
        />
      )}
    </>
  )
}

export default ListImage
