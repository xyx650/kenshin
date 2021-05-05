import * as React from 'react'
import classnames from 'classnames'
import './radio.less'

export type RadioProps = {
  value: string | number
  onChange?: (val: string | number) => void
  disabled: boolean
  checked: boolean
  style?: React.CSSProperties
  className?: string
}
const getChecked = (props: any) => {
  return props.model === props.value || !!props.checked
}


const Radio: React.FC<RadioProps> = props => {
  const [checked, setChecked] = React.useState(getChecked(props))
  const [focus, setFocus] = React.useState(false)

  const { disabled, value, children } = props

  // componentWillReceiveProps
  React.useEffect(() => {
    const outerChecked = getChecked(props)
    if (outerChecked !== checked) {
      setChecked(outerChecked)
    }
  })

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked
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

  return <label style={{ ...props.style }} className={classnames('kenshin-radio', props.className)}>
    <span className={classnames('kenshin-radio__input', {
      'is-checked': checked,
      'is-disabled': disabled,
      'is-focus': focus
    })}>
      <span className='kenshin-radio__inner' />
      <input
        type='radio'
        className='kenshin-radio__original'
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </span>
    <span className='kenshin-radio__label'>
      {children || value}
    </span>
  </label>
}

Radio.displayName = 'Radio'

export default Radio
