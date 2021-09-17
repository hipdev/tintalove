import debounce from 'lodash.debounce'
import { useCombobox } from 'downshift'
import { supabase } from 'lib/supabase-client'
import { useCallback, useState } from 'react'
import useSWR, { mutate } from 'swr'
import { sendArtistWorkRequest } from 'lib/queries/artists'
import toast from 'react-hot-toast'
// import { AutocompleteStudioItemSendRequest } from './AutocompleteStudioItemSendRequest'

const menuStyles = {
  overflowY: 'scroll',
  listStyle: 'none',
}

const SelectStudio = ({ state, artist, setErrorRequest, studios }) => {
  const [inputItems, setInputItems] = useState(studios)
  const {
    isOpen,
    // openMenu,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    items: inputItems,
    itemToString: (item: any) => (item ? item.name : ''),
    onInputValueChange: useCallback(
      debounce(async ({ inputValue, selectedItem }) => {
        console.log(inputValue, selectedItem, 'values')
        if (inputValue != '' && inputValue != selectedItem?.name) {
          const { data } = await supabase
            .from('studios')
            .select('name, id, username, formatted_address')
            .ilike('name', `%${inputValue}%`)
            .limit(5)

          console.log(data, 'la estamos melos, ahora por los estudios')

          setInputItems(data)
        }
      }, 1000),
      []
    ),

    onSelectedItemChange: ({ selectedItem }) => {
      console.log(selectedItem, artist, 'item seleccionado')

      toast.promise(sendArtistWorkRequest(selectedItem, artist), {
        loading: 'Enviando...',
        success: () => {
          mutate(['getArtistRequests', artist.user_id])
          return 'Solicitud enviada 😉'
        },
        error: (err) => {
          console.log(err, 'el error')
          if (err.name != 'exists') {
            setErrorRequest(true)
          }
          return `${err?.message ? err.message : err.toString()}`
        },
      })
    },
  })

  return (
    <div className="relative">
      <div {...getComboboxProps()}>
        <label className="flex" {...getLabelProps()}>
          <input
            className="input-primary w-full capitalize"
            {...getInputProps()}
            // onFocus={openMenu} // Si quiero tener abierto una lista en focus
            placeholder="Buscar estudio"
          />
          <button
            className="ml-4 text-xl"
            type="button"
            {...getToggleButtonProps()}
            aria-label="toggle menu"
          >
            &#8595;
          </button>
        </label>
      </div>

      <ul
        {...getMenuProps()}
        style={menuStyles}
        className=" max-h-44 absolute w-full nice_scroll z-40"
      >
        {isOpen &&
          inputItems.map((item, index) => {
            return (
              <li
                className="px-2 py-2 cursor-pointer bg-dark-800  text-base"
                style={
                  highlightedIndex === index ? { backgroundColor: '#000' } : {}
                }
                key={`${item.id}${index}`}
                {...getItemProps({ item, index })}
              >
                {item.name}{' '}
                <span className="text-sm text-gray-400 ml-4">
                  {item.formatted_address}
                </span>
              </li>
            )
          })}
      </ul>
    </div>
  )
}

export default SelectStudio
