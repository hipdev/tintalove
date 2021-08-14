import { getUsernameArtist } from 'lib/queries/artists'
import { getUsernameStudio } from 'lib/queries/studios'
import Link from 'next/link'
import useSWR from 'swr'

type Props = {
  children: any
  id: string
  type: 'studio' | 'artist'
  target: boolean
}

const GetUsernameLink = ({ children, id, type, target }: Props) => {
  const { data } = useSWR(
    [type == 'studio' ? 'getUsernameStudio' : 'getUsernameArtist', id],
    type == 'studio' ? getUsernameStudio : getUsernameArtist
  )

  console.log(data, 'el username')

  if (target) {
    return (
      <a
        href={type == 'studio' ? `/studio/${data}` : `/${data}`}
        target="_blank"
        rel="noreferrer"
      >
        {children}
      </a>
    )
  }

  return (
    <Link href={type == 'studio' ? `/studio/${data}` : `/${data}`}>
      <a>{children}</a>
    </Link>
  )
}

export default GetUsernameLink
