import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { mutate } from 'swr'
import { HiOutlineSelector } from 'react-icons/hi'
import { AiOutlineCheck } from 'react-icons/ai'
import { TiLocationOutline } from 'react-icons/ti'
import toast from 'react-hot-toast'
import { updateUserSearchCity } from 'lib/queries/users'
import { useRouter } from 'next/router'

const SelectCity = ({ user, cities }) => {
  const router = useRouter()
  const [selected, setSelected] = useState(
    user
      ? cities.find(
          (city) =>
            city.city_hash == user?.searching_city?.city_hash || 'colombia'
        )
      : cities.find((city) => city.city_hash == 'colombia')
  )

  const changeCity = (select) => {
    if (user) {
      toast.promise(updateUserSearchCity(user.uid, select), {
        loading: 'Cambiando...',
        success: () => {
          setSelected(select)
          mutate(user.uid)
          router.push(
            `/tatuajes/all/${select.city_name}--${select.province}--${select.city_hash}`
          )

          return 'Ciudad actualizada 😉'
        },
        error: (err) => {
          return `${err.toString()}`
        },
      })
    } else {
      setSelected(select)
      router.push(
        `/tatuajes/all/${select.city_name}--${select.province}--${select.city_hash}`
      )
    }
  }

  console.log(user, 'el usuario')

  return (
    <>
      <Listbox value={selected} onChange={changeCity}>
        {({ open }) => (
          <>
            <Listbox.Label className="block text-sm font-medium">
              <TiLocationOutline className="text-3xl text-primary" />
            </Listbox.Label>
            <div className="mt-1 relative w-44">
              <Listbox.Button
                className="bg-transparent relative w-full rounded-md text-gray-200
                shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
              >
                <span className="block truncate">
                  {selected?.city_name || 'Todo Colombia'}
                </span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <HiOutlineSelector
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options
                  static
                  className="absolute z-30 mt-1 w-60 bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                >
                  {cities.map((city) => (
                    <Listbox.Option
                      key={city.city_hash}
                      className={({ active }) =>
                        (active ? 'text-white bg-primary' : 'text-gray-900') +
                        ' cursor-default select-none relative py-2 pl-3 pr-9'
                      }
                      value={city}
                    >
                      {({ selected, active }) => (
                        <>
                          <span className="w-full inline-flex truncate items-end">
                            <span
                              className={
                                (selected ? 'font-semibold' : 'font-normal') +
                                ' block '
                              }
                            >
                              {city.city_name}
                            </span>
                            <span
                              className={
                                (active ? 'text-white' : 'text-gray-500') +
                                ' ml-4 relative bottom-[1px] truncate text-xs capitalize'
                              }
                            >
                              {city.province}
                            </span>
                          </span>

                          {selected ? (
                            <span
                              className={
                                (active ? 'text-white' : 'text-primary') +
                                ' absolute inset-y-0 right-0 flex items-center pr-4'
                              }
                            >
                              <AiOutlineCheck
                                className="h-5 w-5"
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
          </>
        )}
      </Listbox>
    </>
  )
}

export default SelectCity
