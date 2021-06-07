import { Transition, Listbox } from '@headlessui/react'
import { UserState } from 'types/user'
import { FiCalendar } from 'react-icons/fi'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { Fragment, useState } from 'react'
import toast from 'react-hot-toast'
import { updateAvailability } from 'lib/queries/artists'
import { mutate } from 'swr'
import { IoMdCheckmarkCircle } from 'react-icons/io'
import { RiCheckboxCircleFill } from 'react-icons/ri'

const agenda = [
  { id: 0, label: 'En una semana' },
  { id: 1, label: 'En 15 días' },
  { id: 2, label: 'En un mes' },
  { id: 3, label: 'Dos meses o mas' },
]

const Availability = ({
  user,
  availableId,
}: {
  user: UserState
  availableId: number
}) => {
  console.log(availableId, 'esto')
  const [selected, setSelected] = useState(
    availableId ? agenda[availableId] : agenda[0]
  )

  const handleAvailability = (selected) => {
    console.log(selected, 'el item')

    toast.promise(updateAvailability(user.uid, selected), {
      loading: 'Actualizando...',
      success: () => {
        setSelected(agenda[selected.id])
        mutate(['get-availability', user.uid])
        console.log('disponiblidad actualizada')

        return 'Gracias por actualizar tu disponibilidad 😉'
      },
      error: (err) => {
        return `${err.toString()}`
      },
    })
  }

  return (
    <>
      {user && (
        <div className="text-left z-50">
          <Listbox value={selected} onChange={handleAvailability}>
            <div className="relative mt-1">
              <Listbox.Button className="relative w-full py-1 pl-3 text-left bg-ocean_blue-300 rounded-lg shadow-md cursor-pointer sm:text-sm focus:outline-none">
                <div className="">
                  <div className="flex items-center gap-2 bg-ocean_blue-300 px-2 py-3 xl:py-1 rounded-md">
                    <span className="text-green-500 text-2xl">
                      <FiCalendar />
                    </span>
                    <div className="leading-tight hidden xl:block">
                      <p className="text-white">Disponibilidad</p>
                      <p className="text-light-200">{selected.label}</p>
                    </div>
                    <span className="text-white text-2xl">
                      <MdKeyboardArrowDown />
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
                <Listbox.Options className="absolute w-full min-w-max mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
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
