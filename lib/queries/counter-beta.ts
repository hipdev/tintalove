/*
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { onSnapshot } from 'firebase/firestore'
import { FirebaseOptions } from 'firebase/app'
import {
  collection,
  doc,
  DocumentReference,
  DocumentSnapshot,
  FirebaseFirestore,
  getDoc,
  getFirestore,
  increment,
  setDoc,
} from 'firebase/firestore/lite'
import firebaseApp from 'lib/firebase'
import * as uuid from 'uuid'

const db = getFirestore(firebaseApp)

const SHARD_COLLECTION_ID = '_counter_shards_'
const COOKIE_NAME = 'FIRESTORE_COUNTER_SHARD_ID'

export interface CounterSnapshot {
  exists: boolean
  data: () => number
}

export class Counter {
  private db: FirebaseFirestore = null
  private shardId = ''
  private shards: { [key: string]: number } = {}
  private notifyPromise: Promise<void> = null

  /**
   * Constructs a sharded counter object that references to a field
   * in a document that is a counter.
   *
   * @param doc A reference to a document with a counter field.
   * @param field A path to a counter field in the above document.
   */
  constructor(private docu: DocumentReference, private field: string) {
    this.db = getFirestore(firebaseApp)
    this.shardId = getShardId(COOKIE_NAME)

    const shardsRef = collection(db, SHARD_COLLECTION_ID)

    this.shards[this.docu.path] = 0

    this.shards[doc(shardsRef, this.shardId).path] = 0
    this.shards[doc(shardsRef, this.shardId.substr(0, 4)).path] = 0
    this.shards[doc(shardsRef, this.shardId.substr(0, 3)).path] = 0
    this.shards[doc(shardsRef, this.shardId.substr(0, 2)).path] = 0
    this.shards[doc(shardsRef, this.shardId.substr(0, 1)).path] = 0

    console.log(this.shards, 'los chards')
  }

  /**
   * Get latency compensated view of the counter.
   *
   * All local increments will be reflected in the counter even if the main
   * counter hasn't been updated yet.
   */
  public async get(options?: FirebaseOptions): Promise<number> {
    const valuePromises = Object.keys(this.shards).map(async (path) => {
      //   const shard = await this.db.doc(path).get(options)
      const shard = await getDoc(doc(db, path))

      return <number>shard.get(this.field) || 0
    })
    const values = await Promise.all(valuePromises)
    return values.reduce((a, b) => a + b, 0)
  }

  /**
   * Listen to latency compensated view of the counter.
   *
   * All local increments to this counter will be immediately visible in the
   * snapshot.
   */
  public onSnapshot() {
    const unsub = onSnapshot(
      doc(collection(db, 'posts'), 'PuB26Kq35ImiIsCLifMB'),
      (doc) => {
        console.log('Current data: ', doc.data())
      }
    )

    return true

    // Object.keys(this.shards).forEach((path) => {
    //   let docRef = doc(this.db, path)

    //   console.log(path, 'los path')

    //   //   console.log(docRef, 'la docRef')

    //   const unsub = onSnapshot(
    //     doc(this.db, 'posts', 'PuB26Kq35ImiIsCLifMB'),
    //     (snap) => {
    //       console.log(snap, 'que es snap')
    //       // this.shards[snap.ref.path] = snap.get(this.field) || 0

    //       // console.log(
    //       //   (this.shards[snap.ref.path] = snap.get(this.field) || 0),
    //       //   'esto que'
    //       // )

    //       // if (this.notifyPromise !== null) return
    //       // this.notifyPromise = schedule(() => {
    //       //   const sum = Object.values(this.shards).reduce((a, b) => a + b, 0)
    //       //   observable({
    //       //     exists: true,
    //       //     data: () => sum,
    //       //   })
    //       //   this.notifyPromise = null
    //       // })
    //     },
    //     (error) => console.log(error, 'error de snapshot')
    //   )
    // })
  }

  /**
   * Increment the counter by a given value.
   *
   * e.g.
   * const counter = new sharded.Counter(db.doc("path/document"), "counter");
   * counter.incrementBy(1);
   */
  public incrementBy(val: number): Promise<void> {
    console.log(this.field, 'el campo pasado a la clase')
    console.log(SHARD_COLLECTION_ID, this.shardId, 'la colección y el shardId')
    // @ts-ignore
    const incrementTo = increment(val)
    const update: any = this.field
      .split('.')
      .reverse()
      .reduce((value: any, name: any) => ({ [name]: value }), incrementTo)
    // return this.doc
    //   .collection(SHARD_COLLECTION_ID)
    //   .doc(this.shardId)
    //   .set(update, { merge: true })

    const docRef = doc(collection(db, SHARD_COLLECTION_ID), this.shardId)

    return setDoc(docRef, update, { merge: true })
  }

  /**
   * Access the assigned shard directly. Useful to update multiple counters
   * at the same time, batches or transactions.
   *
   * e.g.
   * const counter = new sharded.Counter(db.doc("path/counter"), "");
   * const shardRef = counter.shard();
   * shardRef.set({"counter1", firestore.FieldValue.Increment(1),
   *               "counter2", firestore.FieldValue.Increment(1));
   */
  public shard(): DocumentReference {
    // return this.doc.collection(SHARD_COLLECTION_ID).doc(this.shardId);
    return doc(collection(db, SHARD_COLLECTION_ID), this.shardId)
  }
}

async function schedule<T>(func: () => T): Promise<T> {
  return new Promise<T>(async (resolve) => {
    setTimeout(async () => {
      const result = func()
      resolve(result)
    }, 0)
  })
}

function getShardId(cookie: string): string {
  const result = new RegExp(
    '(?:^|; )' + encodeURIComponent(cookie) + '=([^;]*)'
  ).exec(document.cookie)
  if (result) return result[1]

  const shardId = uuid.v4()

  const date = new Date()
  date.setTime(date.getTime() + 30 * 24 * 60 * 60 * 1000)
  const expires = '; expires=' + date.toUTCString()

  document.cookie =
    encodeURIComponent(cookie) + '=' + shardId + expires + '; path=/'
  return shardId
}
