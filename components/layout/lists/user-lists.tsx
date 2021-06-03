import { useStateMachine } from 'little-state-machine'
import { AiOutlineUnorderedList } from 'react-icons/ai'
import Modal from 'react-modal'
import { lists } from 'lib/actions'
import NoListForm from './no-list-form'
import ShowLists from './show-lists'
import SelectList from './select-list'

Modal.setAppElement('#__next')

const UserLists = ({ user }) => {
  const {
    state: { list },
    actions,
  }: any = useStateMachine({
    lists,
  })

  console.log(list, user, 'estados')

  return (
    <>
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
            background: 'rgba(17, 19, 25)',
            position: 'fixed',
            border: 'none',
            // inset: 'auto',
            right: '0px',
            left: 'auto',
            top: 0,
            height: '100%',
            width: '608px',
            borderRadius: '0',
            boxShadow: '0px 1px 4px #000000',
          },
        }}
        onRequestClose={() => actions.lists({ postId: null, listOpen: false })}
        contentLabel="Post modal"
      >
        {user?.has_list ? (
          <>
            {!list?.post ? (
              <ShowLists userId={user?.uid} />
            ) : (
              <SelectList user={user} userId={user?.uid} post={list?.post} />
            )}
          </>
        ) : (
          <>
            <p className="text-gray-300">Post: {list?.post?.id || 'Sin Id'}</p>
            <NoListForm user={user || null} />
          </>
        )}
      </Modal>
    </>
  )
}

export default UserLists
