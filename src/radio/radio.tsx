import * as React from 'react'
import classnames from 'classnames'
import { prefixCls as prefix } from '../config'
import './radio.less'

export interface RadioProps {
  value: string | number;
  onChange?: (val: string | number) => void;
  disabled: boolean;
  checked: boolean;
  style?: React.CSSProperties;
  className?: string;
  prefixCls?: string;
}

const getChecked = (props: any) => {
  return props.model === props.value || !!props.checked
}


const Radio: React.FC<RadioProps> = props => {
  const [checked, setChecked] = React.useState(getChecked(props))
  const [focus, setFocus] = React.useState(false)

  const { disabled, value, children, prefixCls = prefix } = props

  // componentWillReceiveProps
  React.useEffect(() => {
    const outerChecked = getChecked(props)
    if (outerChecked !== checked) {
      setChecked(outerChecked)
    }
  })

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target
    if (checked) {
      props.onChange?.(props.value)
    }
    setChecked(checked)
  }

  const onFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocus(true)
  }

  const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocus(false)
  }

  return <label style={{ ...props.style }} className={classnames(`${prefixCls}-radio`, props.className)}>
    <span className={classnames(`${prefixCls}-radio__input`, {
      'is-checked': checked,
      'is-disabled': disabled,
      'is-focus': focus
    })}>
      <span className={`${prefixCls}-radio__inner`} />
      <input
        type='radio'
        className={`${prefixCls}-radio__original`}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </span>
    <span className={`${prefixCls}-radio__label`}>
      {children || value}
    </span>
  </label>
}

Radio.displayName = 'Radio'

export default Radio
