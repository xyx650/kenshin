/* eslint-disable */
// @ts-nocheck
import * as React from 'react'
import ClickOutside from 'react-click-outside'
import { debounce as throttleDebounce } from 'throttle-debounce'
import Popper from 'popper.js'
import View from '@/_base/view'
import classnames from 'classnames'

import Tag from '../tag'
import Input from '../input'

type sizeMapKey = 'large' | 'small' | 'mini'

const sizeMap: Record<sizeMapKey, number> = {
  'large': 42,
  'small': 30,
  'mini': 22
}

export interface SelectProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value: string | number;
  size?: sizeMapKey;
  disabled?: boolean;
  clearable?: boolean;
  filterable?: boolean;
  loading?: boolean;
  remote?: boolean;
  remoteMethod?: () => void;
  filterMethod?: () => void;
  multiple?: boolean;
  placeholder?: string;
  onChange?: () => void;
  onVisibleChange?: () => void;
  onRemoveTag?: () => void;
  onClear?: () => void;
}


const Select = React.forwardRef<unknown, SelectProps>((props, ref) => {
  const { multiple, onRemoveTag } = props

  // states
  const [options, setOptions] = React.useState<OptionState>([])
  const [isSelect, setIsSelect] = React.useState(true)
  const [query, setQuery] = React.useState('')
  const [value, setValue] = React.useState(props.value)
  const [inputWidth, setInputWidth] = React.useState(0)
  const [inputLength, setInputLength] = React.useState(20)
  const [selectedLabel, setSelectedLabel] = React.useState('')
  const [visible, setVisible] = React.useState(false)
  const [selected, setSelected] = React.useState([] as OptionState)
  const [selectedInit, setSelectedInit] = React.useState(!!props.multiple)

  const debounce = () => props.remote ? 300 : 0
  const debouncedOnInputChange = throttleDebounce(debounce(), () => {
    onInputChange()
  })

  const onInputChange = () => {
    if (props.filterable && selectedLabel !== value) {
      setQuery(selectedLabel)
    }
  }

  const toggleMenu = () => {
    const { filterable, disabled } = props
    if (filterable && query === '' && visible) {
      return
    }
    if (!disabled) {
      setVisible(v => !v)
    }
  }

  const deleteTag = (tag) => {
    const index = selected.indexOf(tag)
    if (index > -1 && !props.disabled) {
      const _selected = selected.slice()
      _selected.splice(index, 1)
      setSelected(_selected)
      // onRemoveTag
    }
  }

  return <div ref={root} style={props.style} className={classnames('kenshin-select', props.className)}>
    {
      multiple &&
      <div ref={tags} className='kenshin-select__tags' onClick={toggleMenu} style={{ maxWidth: inputWidth - 32 }}>
        {
          selected.map(el => <Tag
            type='primary'
            key={el.props.value}
            hit={el.hitState}
            closable={!props.disabled}
            onClose={() => deleteTag(el)}
          >
          </Tag>)
        }
      </div>
    }
  </div>
})

type OptionState = { value: string | number; disabled: boolean; label: string | number }[]


type State = {
  options: { value: string | number; disabled: boolean; label: string | number; }[][],
  isSelect: boolean,
  inputLength: number,
  inputWidth: number,
  inputHovering: boolean,
  filteredOptionsCount: number,
  optionsCount: number,
  hoverIndex: number,
  bottomOverflowBeforeHidden: number,
  cachedPlaceHolder: string,
  currentPlaceholder: string,
  selectedLabel: string,
  value: any,
  visible: boolean,
  query: string,
  selected: any,
  voidRemoteQuery: boolean,
  valueChangeBySelected: boolean,
  selectedInit: boolean,
  dropdownUl?: HTMLElement
}
