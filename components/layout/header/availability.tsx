import { Transition, Listbox } from '@headlessui/react'
import { UserState } from 'types/user'
import { FiCalendar } from 'react-icons/fi'
import { Fragment, useState } from 'react'
import toast from 'react-hot-toast'
import { updateAvailability } from 'lib/queries/artists'
import { mutate } from 'swr'
import { IoMdCheckmarkCircle } from 'react-icons/io'
import { RiCheckboxCircleFill } from 'react-icons/ri'

const agenda = [
  { id: 1, label: 'En una semana' },
  { id: 2, label: 'En 15 días' },
  { id: 3, label: 'En un mes' },
  { id: 4, label: 'Dos meses o mas' },
]

const Availability = ({
  user,
  availableId,
}: {
  user: UserState
  availableId: number
}) => {
  const [selected, setSelected] = useState(
    availableId ? agenda[availableId - 1] : agenda[1]
  )

  const handleAvailability = (selected) => {
    toast.promise(updateAvailability(user.uid, selected), {
      loading: 'Actualizando...',
      success: () => {
        setSelected(agenda[selected.id - 1])
        mutate(['get-availability', user.uid])

        availableId = selected.id

        return 'Gracias por actualizar tu disponibilidad 😉'
      },
      error: (err) => {
        return `${err.toString()}`
      },
    })
  }

  console.log(user, 'el user en availability')

  return (
    <>
      {user && (
        <div className="text-left bg-dark-800">
          <Listbox
            value={!availableId ? 5 : selected}
            onChange={handleAvailability}
          >
            <div className="relative">
              <Listbox.Button className="relative w-full  px-1 text-left bg-nt-800 rounded-lg shadow-md cursor-pointer sm:text-sm focus:outline-none border-2 border-gr-700">
                <div>
                  <div className="flex items-center gap-2 px-2 py-1 xl:py-1 rounded-md">
                    <div className="leading-tight hidden xl:block">
                      <p className="text-gr-200 text-xs w-32">Disponibilidad</p>
                      <p className="text-gr-200 text-sm">
                        {!availableId ? 'Selecciona' : selected.label}
                      </p>
                    </div>
                    <span className="text-green-500 text-2xl pl-0 xl:pl-2">
                      <FiCalendar />
                    </span>
                  </div>
                </div>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-10 w-full min-w-max mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {agenda.map((item, personIdx) => (
                    <Listbox.Option
                      key={personIdx}
                      className={({ active }) =>
                        `${
                          active
                            ? 'text-amber-900 bg-amber-100'
                            : 'text-gray-900'
                        }
                          cursor-pointer select-none relative py-2 pl-10 pr-4`
                      }
                      value={item}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={`${
                              selected ? 'font-medium' : 'font-normal'
                            } block `}
                          >
                            {item.label}
                          </span>
                          {selected ? (
                            <span
                              className={`${
                                active ? 'text-amber-600' : 'text-amber-600'
                              }
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                            >
                              <RiCheckboxCircleFill
                                className="w-5 h-5 text-primary"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>
      )}
    </>
  )
}

export default Availability
