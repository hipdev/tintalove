import { useStateMachine } from 'little-state-machine'
import Link from 'next/link'
import { lists } from 'lib/actions'
import { getListImage, getUserLists } from 'lib/queries/lists'
import useSWR from 'swr'
import Image from 'next/image'

const ListImage = ({ listId }) => {
  const { data } = useSWR(['getListImage', listId], getListImage)

  console.log(data, 'data list image')

  return (
    <>
      {!data?.userListImage ? (
        <div className="p-8">
          <Image
            src="/box.png"
            alt="Sin fotos en la lista"
            width={400}
            height={400}
          />
        </div>
      ) : (
        <img
          src={`${data.userListImage.post_image}`}
          alt=""
          className="  object-cover"
        />
      )}
    </>
  )
}

export default ListImage
