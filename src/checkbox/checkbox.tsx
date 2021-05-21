import * as React from 'react'
import classnames from 'classnames'
import { useCheckbox } from './hooks'
import CheckboxGroup from './checkbox-group'
import CheckboxButton from './checkbox-button'
import './checkbox.less'

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  /**
   * @description 选中状态的值（只有在Checkbox.Group或者绑定对象类型为array时有效）
   */
  label?: string;
  /**
   * @description 选中时的值
   */
  trueLabel?: string | number;
  /**
   * @description 没有选中时的值
   */
  falseLabel?: string | number;
  disabled?: boolean;
  checked?: boolean;
  // 设置 indeterminate 状态
  indeterminate?: boolean;
  focus?: boolean;
  onChange?: (checked: boolean) => void;
  style?: React.CSSProperties;
  className?: string;
}

const Checkbox: React.FC<CheckboxProps> & {
  Group: typeof CheckboxGroup;
  Button: typeof CheckboxButton;
} = props => {

  const {
    getLabel,
    label,
    setLabel,
    checked,
    setChecked,
    focus,
    setFocus,
    onChange,
    onBlur,
    onFocus
  } = useCheckbox(props)


  const first = React.useRef(false)

  const { onChange: parentChange } = props

  // 触发 onChange
  React.useEffect(() => {
    first.current && parentChange?.(checked)
  }, [checked, parentChange])

  // didMound
  React.useEffect(() => {
    first.current = true
  }, [])

  // 父组件触发更新
  React.useEffect(() => {
    setLabel(getLabel)
    setChecked(!!props.checked)
    setFocus(props.focus)
  }, [getLabel, props.checked, props.focus])


  return <label style={props.style} className={classnames('kenshin-checkbox', props.className)}>
    <span className={classnames('kenshin-checkbox__input', {
      'is-disabled': props.disabled,
      'is-checked': checked,
      'is-indeterminate': props.indeterminate,
      'is-focus': focus
    })}>
      <span className='kenshin-checkbox__inner' />
      <input
        className='kenshin-checkbox__original'
        type='checkbox'
        checked={checked}
        disabled={props.disabled}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onChange}
      />
    </span>
    <span className='kenshin-checkbox__label'>
      {props.children || label}
    </span>
  </label>
}

Checkbox.defaultProps = {
  checked: false,
  focus: false
}
Checkbox.displayName = 'Checkbox'

Checkbox.Button = CheckboxButton
Checkbox.Group = CheckboxGroup

export default Checkbox
