import * as React from 'react'
import type { CheckboxProps } from './checkbox'
import classnames from 'classnames'
import { checkboxContext } from './context'
import { useCheckbox } from './hooks'
import { prefixCls as prefix } from '@/config'

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

  const { prefixCls = prefix } = props

  return <label style={props.style} className={classnames(`${prefixCls}-checkbox-button`,
    groupProps.size ? `${prefixCls}-checkbox-button--${groupProps.size}` : '', {
      'is-disabled': props.disabled,
      'is-checked': checked,
      'is-focus': focus
    })}>
    <input
      className={`${prefixCls}-checkbox-button__original`}
      type='checkbox'
      checked={checked}
      disabled={props.disabled}
      onFocus={onFocus}
      onBlur={onBlur}
      onChange={onChange}
    />
    <span className={`${prefixCls}-checkbox-button__inner`} style={checked ? {
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
