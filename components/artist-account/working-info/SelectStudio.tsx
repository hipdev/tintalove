import { useCombobox } from 'downshift'
import { useState } from 'react'
// import { AutocompleteStudioItemSendRequest } from './AutocompleteStudioItemSendRequest'

const menuStyles = {
  overflowY: 'scroll',
  listStyle: 'none',
}

const items = [
  'Neptunium',
  'Plutonium',
  'Julián',
  'Julián David',
  'Julián Álvarez',
  'Americium',
  'Curium',
  'Berkelium',
  'Californium',
  'Einsteinium',
  'Fermium',
  'Mendelevium',
  'Nobelium',
  'Lawrencium',
  'Rutherfordium',
  'Dubnium',
  'Seaborgium',
  'Bohrium',
  'Hassium',
  'Meitnerium',
  'Darmstadtium',
  'Roentgenium',
  'Copernicium',
  'Nihonium',
  'Flerovium',
  'Moscovium',
  'Livermorium',
  'Tennessine',
  'Oganesson',
]

const SelectStudio = ({ state, artist, setErrorRequest }) => {
  const [inputItems, setInputItems] = useState(items)
  const {
    isOpen,
    getToggleButtonProps,

    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    items: inputItems,
    onInputValueChange: ({ inputValue }) => {
      setInputItems(
        items.filter((item) =>
          item.toLowerCase().startsWith(inputValue.toLowerCase())
        )
      )
    },
  })

  return (
    <div className="relative">
      <div className="flex" {...getComboboxProps()}>
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
      </div>
      {isOpen && (
        <ul
          {...getMenuProps()}
          style={menuStyles}
          className="bg-dark-800 px-2 max-h-44 absolute w-full nice_scroll z-40 pt-2 pb-4"
        >
          {inputItems.map((item, index) => (
            <li
              className="px-2 py-2 cursor-pointer "
              style={
                highlightedIndex === index ? { backgroundColor: '#000' } : {}
              }
              key={`${item}${index}`}
              {...getItemProps({ item, index })}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default SelectStudio
