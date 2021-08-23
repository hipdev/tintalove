import { useStateMachine } from 'little-state-machine'
import { AiOutlineUnorderedList } from 'react-icons/ai'
import Modal from 'react-modal'
import { lists } from 'lib/actions'
import NoListForm from './NoListForm'
import ShowLists from './ShowLists'
import SelectList from './SelectList'
import { useState } from 'react'
Modal.setAppElement('#__next')

const UserLists = ({ user }) => {
  const [showCreate, setShowCreate] = useState(false)

  console.log(user, 'user de Supabase')
  const {
    state: { list },
    actions,
  }: any = useStateMachine({
    lists,
  })

  return (
    <Modal
      isOpen={list?.listOpen || false}
      // style={customStyles}
      style={{
        overlay: {
          position: 'fixed',
          backgroundColor: 'rgb(8 10 18 / 33%)',
          top: 0,
          zIndex: 100,
        },
        content: {
          background: '#030308',
          position: 'fixed',
          border: 'none',
          // inset: 'auto',
          right: '0px',
          left: 'auto',
          top: 0,
          height: '100%',
          borderRadius: '0',
          boxShadow: '0px 1px 4px #000000',
          minWidth: '25%',
          paddingLeft: '35px',
          paddingRight: '35px',
        },
      }}
      onRequestClose={() => actions.lists({ postId: null, listOpen: false })}
      contentLabel="Post modal"
    >
      <div className="max-w-sm">
        {!showCreate && (
          <>
            {!list?.post ? (
              <ShowLists userId={user?.id} setShowCreate={setShowCreate} />
            ) : (
              <SelectList
                user={user}
                userId={user?.uid}
                post={list?.post}
                setShowCreate={setShowCreate}
              />
            )}
          </>
        )}

        {showCreate && (
          <NoListForm user={user || null} setShowCreate={setShowCreate} />
        )}
      </div>
    </Modal>
  )
}

export default UserLists
