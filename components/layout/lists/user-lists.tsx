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
            top: 0,
            zIndex: 100,
          },
          content: {
            background: 'rgb(6 7 12)',
            position: 'fixed',
            border: 'none',
            // inset: 'auto',
            right: '0px',
            left: 'auto',
            top: 0,
            height: '100%',
            width: '315px',
            borderRadius: '0',
            boxShadow: '0px 1px 4px #000000',
            paddingTop: '1.7rem',
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
