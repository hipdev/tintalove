import debounce from 'lodash.debounce'
import { useCombobox } from 'downshift'
import { supabase } from 'lib/supabase-client'
import { useCallback, useState } from 'react'
import useSWR from 'swr'
// import { AutocompleteStudioItemSendRequest } from './AutocompleteStudioItemSendRequest'

const menuStyles = {
  overflowY: 'scroll',
  listStyle: 'none',
}

const SelectStudio = ({ state, artist, setErrorRequest, studios }) => {
  const [inputItems, setInputItems] = useState(studios)
  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    items: inputItems,
    onInputValueChange: useCallback(
      debounce(async ({ inputValue }) => {
        if (inputValue != '') {
          const { data } = await supabase
            .from('artists')
            .select('name, user_id, username')
            .ilike('name', `%${inputValue}%`)
            .limit(5)

          console.log(data, 'la estamos melos, ahora por los estudios')

          setInputItems(data)
        }
      }, 1000),
      []
    ),

    onSelectedItemChange: (item) => {
      console.log(item, 'item seleccionado')
    },
  })

  return (
    <div className="relative">
      <div {...getComboboxProps()}>
        <label className="flex" {...getLabelProps()}>
          <input
            className="input-primary w-full capitalize"
            {...getInputProps()}
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
                key={`${item.user_id}${index}`}
                {...getItemProps({ item, index })}
              >
                {item.name}{' '}
                <span className="text-sm text-gray-400 ml-4">
                  {item.username}
                </span>
              </li>
            )
          })}
      </ul>
    </div>
  )
}

export default SelectStudio
