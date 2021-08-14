import { getStudioInfo } from 'lib/queries/studios'
import Link from 'next/link'
import useSWR from 'swr'

type Props = {
  id: string
}

const PostGetStudio = ({ id }: Props) => {
  console.log(id, 'el id del studio')
  const { data } = useSWR(['getStudioInfo', id], getStudioInfo)

  console.log(data, 'data del estudio')
  return (
    <Link href={`/studio/${data?.studio?.username}`}>
      <a className="text-primary">{data?.studio?.studio_name}</a>
    </Link>
  )
}

export default PostGetStudio
