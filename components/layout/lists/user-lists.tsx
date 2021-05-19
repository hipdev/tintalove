import { useStateMachine } from 'little-state-machine'
import { AiOutlineUnorderedList } from 'react-icons/ai'
import Modal from 'react-modal'
import { lists } from 'lib/actions'
import toast from 'react-hot-toast'
import NoListForm from './no-list-form'
import ShowLists from './show-lists'
import SelectList from './select-list'

Modal.setAppElement('#__next')

const UserLists = () => {
  const {
    state: { list, user },
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
            top: 80,
            zIndex: 20,
          },
          content: {
            background: 'rgb(6 7 12)',
            position: 'fixed',
            border: 'none',
            // inset: 'auto',
            right: '0px',
            left: 'auto',
            top: '80px',
            height: '100%',
            width: '315px',
            borderRadius: '0',
          },
        }}
        onRequestClose={() => actions.lists({ postId: null, listOpen: false })}
        contentLabel="Post modal"
      >
        {user?.has_list ? (
          <>
            {!list.post ? (
              <ShowLists userId={user?.uid} />
            ) : (
              <SelectList userId={user?.uid} post={list.post} />
            )}
          </>
        ) : (
          <>
            <p className="text-gray-300">Post: {list?.post?.id || 'Sin Id'}</p>
            <NoListForm />
          </>
        )}
      </Modal>

      {user?.has_list && (
        <div className="fixed bottom-1/2 right-7 text-2xl z-20">
          <AiOutlineUnorderedList
            className="text-white cursor-pointer"
            onClick={() => actions.lists({ post: null, listOpen: true })}
          />
        </div>
      )}
    </>
  )
}

export default UserLists
