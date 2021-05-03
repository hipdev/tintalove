import * as functions from 'firebase-functions'

import algoliasearch from 'algoliasearch'

const APP_ID = functions.config().algolia.app
const ADMIN_KEY = functions.config().algolia.key

const client = algoliasearch(APP_ID, ADMIN_KEY)

const index = client.initIndex('tintalove_dev')

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
exports.addToIndex = functions.firestore
  .document('artists/{artistId}')
  .onCreate((snapshot) => {
    const data = snapshot.data()
    const objectID = snapshot.id
  })
