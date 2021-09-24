// import { getAllPostsPaginatedMobile } from 'lib/queries/posts'
// import useSWRInfinite from 'swr'

// export default function useAllPostsMobile() {
//   const getKey = (pageIndex, previousPageData) => {
//     // console.log(previousPageData, 'prev data')

//     // reached the end, aquí tengo mis dudas de si alguna vez entra, creo que tengo algo mal (REVISAR)
//     if (previousPageData && !previousPageData.posts) {
//       //   console.log('llegaste al final')
//       return null
//     }

//     // first page, we don't have `previousPageData`
//     if (pageIndex === 0) return ['getAllPostsPaginatedMobile', 0]

//     // add the cursor to the API endpoint
//     return [
//       'getAllPostsPaginatedMobile',
//       pageIndex,
//       previousPageData.nextCursor,
//     ]
//   }

//   const { data, error, size, setSize }: any = useSWRInfinite(
//     getKey,
//     getAllPostsPaginatedMobile
//   )

//   //   console.log(data, 'DATA api')
//   const dataisArray = Array.isArray(data)

//   const flatPosts = dataisArray && data?.map((arr) => arr.posts).flat()

//   const isLoadingInitialData = !data && !error
//   const isLoadingMore =
//     isLoadingInitialData ||
//     (size > 0 && data && typeof data[size - 1] === `undefined`)

//   const isEmpty = data?.[0]?.posts.length === 0

//   //   console.log(data && data[data.length - 1]?.nextCursor, 'el último')

//   const hasReachedEnd =
//     isEmpty || (data && data[data.length - 1]?.nextCursor == undefined)
//   // isEmpty || (data && data[data.length - 1]?.length < REPOS_PAGE_SIZE);

//   return {
//     posts: flatPosts || [],
//     isLoadingInitialData,
//     isLoadingMore,
//     hasReachedEnd,
//     size,
//     setSize,
//   }
// }
