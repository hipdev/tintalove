import * as functions from 'firebase-functions'

import algoliasearch, { SearchIndex } from 'algoliasearch'

const APP_ID = functions.config().algolia.app
const ADMIN_KEY = functions.config().algolia.key

const client = algoliasearch(APP_ID, ADMIN_KEY)

const index: any = client.initIndex('tintalove_dev')

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
exports.addToIndex = functions.firestore
  .document('artists/{artistId}')
  .onCreate((snapshot) => {
    const data = snapshot.data()
    const objectID = snapshot.id

    return index.addObject({ ...data, objectID })
  })

const updateIndex = functions.firestore
  .document('artists/{artistId}')
  .onUpdate((change) => {
    const newData = change.after.data()
    const objectID = change.after.id

    return index.saveObject({ ...newData, objectID })
  })

const deleteFromIndex = functions.firestore
  .document('artists/{artistId}')
  .onDelete((snapshot) => index.deleteObject(snapshot.id))

const addToIndex2 = functions.firestore
  .document('users/{artistId}')
  .onCreate((snapshot) => {
    const data = snapshot.data()
    const objectID = snapshot.id
  })

export { addToIndex2, updateIndex, deleteFromIndex }
