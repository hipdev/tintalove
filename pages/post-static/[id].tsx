import Layout from 'components/layout/layout'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Modal from 'react-modal'

import { postToJSON } from 'lib/firebase'
import { getArtistInfo } from 'lib/queries/artists'
import { getPostsIds, getPostDataById } from 'lib/queries/posts'
import PostStatic from 'components/post/post-static'
import Link from 'next/link'

// Modal.setAppElement('#__next')

export default function postPage({ postId, postData, artistData }: any) {
  const router = useRouter()

  // useEffect(() => {
  //   router.prefetch('/')
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  // if (router.isFallback) {
  //   return 'Loading'
  // }

  // if (!postData?.image) {
  //   return <p>No existe ese post</p>
  // }

  return (
    // <Layout artistData={postData || null}>
    //   <Post postData={postData || null} postId={postId} />
    // </Layout>
    <>
      <Modal
        isOpen={true} // The modal should always be shown on page load, it is the 'page'
        onRequestClose={() =>
          router.push('/', '/', { scroll: false, shallow: true })
        }
        contentLabel="Post modal"
        htmlOpenClassName="ReactModal__Html--open"
      >
        <PostStatic
          postData={postData || null}
          postId={postId}
          artistData={artistData}
        />
        <Link href="/" shallow={true} scroll={false}>
          Ir al home
        </Link>
        <h1>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate
          ea quam reprehenderit cum culpa eos possimus nesciunt, ratione
          dignissimos amet facere. Inventore, commodi. Tenetur ab corrupti
          laboriosam laudantium adipisci sint!
        </h1>
        <h1>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate
          ea quam reprehenderit cum culpa eos possimus nesciunt, ratione
          dignissimos amet facere. Inventore, commodi. Tenetur ab corrupti
          laboriosam laudantium adipisci sint!
        </h1>
        <h1>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate
          ea quam reprehenderit cum culpa eos possimus nesciunt, ratione
          dignissimos amet facere. Inventore, commodi. Tenetur ab corrupti
          laboriosam laudantium adipisci sint!
        </h1>
        <h1>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate
          ea quam reprehenderit cum culpa eos possimus nesciunt, ratione
          dignissimos amet facere. Inventore, commodi. Tenetur ab corrupti
          laboriosam laudantium adipisci sint!
        </h1>
        <h1>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate
          ea quam reprehenderit cum culpa eos possimus nesciunt, ratione
          dignissimos amet facere. Inventore, commodi. Tenetur ab corrupti
          laboriosam laudantium adipisci sint!
        </h1>
        <h1>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate
          ea quam reprehenderit cum culpa eos possimus nesciunt, ratione
          dignissimos amet facere. Inventore, commodi. Tenetur ab corrupti
          laboriosam laudantium adipisci sint!
        </h1>
        <h1>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate
          ea quam reprehenderit cum culpa eos possimus nesciunt, ratione
          dignissimos amet facere. Inventore, commodi. Tenetur ab corrupti
          laboriosam laudantium adipisci sint!
        </h1>
        <h1>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate
          ea quam reprehenderit cum culpa eos possimus nesciunt, ratione
          dignissimos amet facere. Inventore, commodi. Tenetur ab corrupti
          laboriosam laudantium adipisci sint!
        </h1>
        <h1>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate
          ea quam reprehenderit cum culpa eos possimus nesciunt, ratione
          dignissimos amet facere. Inventore, commodi. Tenetur ab corrupti
          laboriosam laudantium adipisci sint!
        </h1>
        <h1>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate
          ea quam reprehenderit cum culpa eos possimus nesciunt, ratione
          dignissimos amet facere. Inventore, commodi. Tenetur ab corrupti
          laboriosam laudantium adipisci sint!
        </h1>
        <h1>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate
          ea quam reprehenderit cum culpa eos possimus nesciunt, ratione
          dignissimos amet facere. Inventore, commodi. Tenetur ab corrupti
          laboriosam laudantium adipisci sint!
        </h1>
        <h1>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate
          ea quam reprehenderit cum culpa eos possimus nesciunt, ratione
          dignissimos amet facere. Inventore, commodi. Tenetur ab corrupti
          laboriosam laudantium adipisci sint!
        </h1>
        <h1>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate
          ea quam reprehenderit cum culpa eos possimus nesciunt, ratione
          dignissimos amet facere. Inventore, commodi. Tenetur ab corrupti
          laboriosam laudantium adipisci sint!
        </h1>
        <h1>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate
          ea quam reprehenderit cum culpa eos possimus nesciunt, ratione
          dignissimos amet facere. Inventore, commodi. Tenetur ab corrupti
          laboriosam laudantium adipisci sint!
        </h1>
        <h1>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate
          ea quam reprehenderit cum culpa eos possimus nesciunt, ratione
          dignissimos amet facere. Inventore, commodi. Tenetur ab corrupti
          laboriosam laudantium adipisci sint!
        </h1>
        <h1>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate
          ea quam reprehenderit cum culpa eos possimus nesciunt, ratione
          dignissimos amet facere. Inventore, commodi. Tenetur ab corrupti
          laboriosam laudantium adipisci sint!
        </h1>
        <h1>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate
          ea quam reprehenderit cum culpa eos possimus nesciunt, ratione
          dignissimos amet facere. Inventore, commodi. Tenetur ab corrupti
          laboriosam laudantium adipisci sint!
        </h1>
        <h1>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate
          ea quam reprehenderit cum culpa eos possimus nesciunt, ratione
          dignissimos amet facere. Inventore, commodi. Tenetur ab corrupti
          laboriosam laudantium adipisci sint!
        </h1>
        <h1>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate
          ea quam reprehenderit cum culpa eos possimus nesciunt, ratione
          dignissimos amet facere. Inventore, commodi. Tenetur ab corrupti
          laboriosam laudantium adipisci sint!
        </h1>
        <h1>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate
          ea quam reprehenderit cum culpa eos possimus nesciunt, ratione
          dignissimos amet facere. Inventore, commodi. Tenetur ab corrupti
          laboriosam laudantium adipisci sint!
        </h1>
        <h1>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate
          ea quam reprehenderit cum culpa eos possimus nesciunt, ratione
          dignissimos amet facere. Inventore, commodi. Tenetur ab corrupti
          laboriosam laudantium adipisci sint!
        </h1>
        <h1>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate
          ea quam reprehenderit cum culpa eos possimus nesciunt, ratione
          dignissimos amet facere. Inventore, commodi. Tenetur ab corrupti
          laboriosam laudantium adipisci sint!
        </h1>
        <h1>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate
          ea quam reprehenderit cum culpa eos possimus nesciunt, ratione
          dignissimos amet facere. Inventore, commodi. Tenetur ab corrupti
          laboriosam laudantium adipisci sint!
        </h1>
        <h1>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate
          ea quam reprehenderit cum culpa eos possimus nesciunt, ratione
          dignissimos amet facere. Inventore, commodi. Tenetur ab corrupti
          laboriosam laudantium adipisci sint!
        </h1>
        <h1>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate
          ea quam reprehenderit cum culpa eos possimus nesciunt, ratione
          dignissimos amet facere. Inventore, commodi. Tenetur ab corrupti
          laboriosam laudantium adipisci sint!
        </h1>
        <h1>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate
          ea quam reprehenderit cum culpa eos possimus nesciunt, ratione
          dignissimos amet facere. Inventore, commodi. Tenetur ab corrupti
          laboriosam laudantium adipisci sint!
        </h1>
        <h1>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate
          ea quam reprehenderit cum culpa eos possimus nesciunt, ratione
          dignissimos amet facere. Inventore, commodi. Tenetur ab corrupti
          laboriosam laudantium adipisci sint!
        </h1>
        <h1>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate
          ea quam reprehenderit cum culpa eos possimus nesciunt, ratione
          dignissimos amet facere. Inventore, commodi. Tenetur ab corrupti
          laboriosam laudantium adipisci sint!
        </h1>
        <h1>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate
          ea quam reprehenderit cum culpa eos possimus nesciunt, ratione
          dignissimos amet facere. Inventore, commodi. Tenetur ab corrupti
          laboriosam laudantium adipisci sint!
        </h1>
        <h1>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate
          ea quam reprehenderit cum culpa eos possimus nesciunt, ratione
          dignissimos amet facere. Inventore, commodi. Tenetur ab corrupti
          laboriosam laudantium adipisci sint!
        </h1>
        <Link href="/" shallow={true} scroll={false}>
          Ir al home
        </Link>
      </Modal>
    </>
  )
}

export async function getStaticPaths() {
  const postList = await getPostsIds()

  const paths = postList.map((doc: any) => ({
    params: {
      id: doc.id,
    },
  }))

  return {
    paths,
    fallback: true,
  }
}

export async function getStaticProps({ params }: any) {
  let postData = null
  let artistData = null

  if (params.id) {
    try {
      const data: any = await getPostDataById(params.id)
      const dataArtist = await getArtistInfo(data.post.artist_id)

      postData = postToJSON(data?.post)
      artistData = postToJSON(dataArtist.artist)
    } catch (error) {
      console.log(error, 'Error obteniendo la info del artista')
    }
  }

  return {
    props: {
      postId: params.id,
      postData,
      artistData,
    },
    revalidate: 60,
  }
}
