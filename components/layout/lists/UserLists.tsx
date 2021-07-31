import { useStateMachine } from 'little-state-machine'
import { AiOutlineUnorderedList } from 'react-icons/ai'
import Modal from 'react-modal'
import { lists } from 'lib/actions'
import NoListForm from './NoListForm'
import ShowLists from './ShowLists'
import SelectList from './SelectList'
0
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
