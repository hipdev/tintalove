import EditorText from './w-editor'
import React from 'react'
import { db } from 'lib/db'
import { collection, doc } from 'firebase/firestore/lite'
// import { addOrEditLink } from 'lib/db'

const Documents = () => {
  return (
    <>
      {/* <EditorText addOrEditLink={addOrEditLink} /> */}
      <EditorText />
    </>
  )
}

export default Documents
