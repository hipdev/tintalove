import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'

import { getCities } from 'lib/queries/general'
import useSWR from 'swr'
import { HiOutlineSelector } from 'react-icons/hi'
import { AiOutlineCheck } from 'react-icons/ai'
import { TiLocationOutline } from 'react-icons/ti'

const SelectCity = () => {
  const { data } = useSWR(['get-cities', 'Colombia'], getCities)

  const [selected, setSelected] = useState()

  const changeCity = (data) => {
    console.log(data, 'ok')
    setSelected(data.city_name)
  }

  if (!data) return <span>...</span>

  return (
    data && (
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
                  <span className="block truncate">{selected}</span>
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
                    className="absolute z-30 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                  >
                    {data.cities.map((city) => (
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
                            <span
                              className={
                                (selected ? 'font-semibold' : 'font-normal') +
                                ' block truncate'
                              }
                            >
                              {city.city_name}
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
  )
}

export default SelectCity
