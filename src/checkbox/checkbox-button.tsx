import * as React from 'react'
import type { CheckboxProps } from './checkbox'
import classnames from 'classnames'
import { checkboxContext } from './context'
import { useCheckbox } from './hooks'

// CheckboxButtonProps
export type CheckboxButtonProps = CheckboxProps

const CheckboxButton: React.FC<CheckboxButtonProps> = props => {

  const {
    checked,
    focus,
    label,
    onFocus,
    onBlur,
    onChange
  } = useCheckbox(props)

  const { groupProps } = React.useContext(checkboxContext)

  return <label style={props.style} className={classnames('kenshin-checkbox-button',
    groupProps.size ? `kenshin-checkbox-button--${groupProps.size}` : '', {
      'is-disabled': props.disabled,
      'is-checked': checked,
      'is-focus': focus
    })}>
    <input
      className='kenshin-checkbox-button__original'
      type='checkbox'
      checked={checked}
      disabled={props.disabled}
      onFocus={onFocus}
      onBlur={onBlur}
      onChange={onChange}
    />
    <span className='kenshin-checkbox-button__inner' style={checked ? {
      boxShadow: `-1px 0 0 0 ${groupProps.fill}`,
      backgroundColor: groupProps.fill || '',
      borderColor: groupProps.fill || '',
      color: groupProps.textColor || ''
    } : {}}>
      {label || props.children}
    </span>
  </label>
}

CheckboxButton.displayName = 'CheckboxButton'

export default CheckboxButton
