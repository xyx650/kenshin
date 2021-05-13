import * as React from 'react'
import classnames from 'classnames'
import View from '@/_base/view'
import './index.less'

export type SwitchState = {
  value: boolean | number | string,
  coreWidth: number,
  buttonStyle: React.CSSProperties
}

export type SwitchProps = {
  value: number | string | boolean
  disabled: boolean
  width: number,
  onIconClass: string,
  offIconClass: string,
  onText: string,
  offText: string,
  onColor: string,
  offColor: string,
  onValue: number | string | boolean
  offValue: number | string | boolean
  name: string,
  onChange?: (value: number | string | boolean) => void
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onFocus?: (e: React.ChangeEvent<HTMLInputElement>) => void
  allowFocus: boolean
  className?: string
  style?: React.CSSProperties
};

const Switch: React.FC<SwitchProps> = props => {

  const [state, setState] = React.useState<SwitchState>({
    value: props.value,
    coreWidth: props.width,
    buttonStyle: { transform: '' }
  })

  const inputRef = React.useRef<HTMLInputElement>(null)
  const coreRef = React.useRef<HTMLSpanElement>(null)

  const { name, disabled, onText, offText, onValue, onIconClass, offIconClass, allowFocus } = props
  const { value, coreWidth, buttonStyle } = state

  // 判断是否初次渲染
  const isFirst = React.useRef(false)

  // update
  React.useEffect(() => {
    if (isFirst.current) {
      updateSwitch()
      if (props.width) {
        setState({ ...state, coreWidth: props.width })
      }
      props.onChange?.(state.value)
    }
  }, [state.value, props])

  // didMount
  React.useEffect(() => {
    if (props.width === 0) {
      state.coreWidth = hasText() ? 58 : 46
    }
    updateSwitch()
    isFirst.current = true
  }, [])


  const updateSwitch = () => {
    handleButtonTransform()
    if (props.onColor || props.offColor) {
      setBackgroundColor()
    }
  }

  const setBackgroundColor = () => {
    const newColor = state.value === props.onValue ? props.onColor : props.offColor
    coreRef.current!.style.borderColor = newColor
    coreRef.current!.style.backgroundColor = newColor
  }

  const handleButtonTransform = () => {
    const { value } = props
    const { coreWidth } = state
    buttonStyle.transform = value === props.onValue ? `translate(${coreWidth - 20}px, 2px)` : 'translate(2px, 2px)'
    // console.log('buttonStyle.transform', buttonStyle.transform)
    setState({ ...state, buttonStyle })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      value: e.target.checked ? props.onValue : props.offValue
    })
  }

  const setFocus = () => {
    props.allowFocus && inputRef.current!.focus()
  }

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    props.allowFocus && props.onFocus?.(e)
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    props.allowFocus && props.onBlur?.(e)
  }


  // 是否包含文本
  const hasText = () => props.onText || props.offText


  return <label
    style={props.style}
    className={classnames('kenshin-switch', {
      'is-disabled': disabled,
      'kenshin-switch--wide': hasText(),
      'is-checked': value === onValue
    })}>

    <View show={disabled}>
      <div className='kenshin-switch__mask' />
    </View>

    <input
      className={classnames('kenshin-switch__input', { 'allow-focus': allowFocus })}
      type='checkbox'
      checked={value === onValue}
      name={name}
      ref={inputRef}
      disabled={disabled}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
    />

    <span className='kenshin-switch__core' ref={coreRef} style={{ 'width': coreWidth + 'px' }}>
      <span className='kenshin-switch__button' style={{ ...buttonStyle }} onClick={setFocus} />
    </span>

    <View show={value === onValue}>
      <div
        className='kenshin-switch__label kenshin-switch__labkenshin--left'
        style={{ 'width': coreWidth + 'px' }}
      >
        {onIconClass && <i className={onIconClass} />}
        {!onIconClass && onText && <span>{onText}</span>}
      </div>
    </View>

    <View show={value !== onValue}>
      <div
        className='kenshin-switch__label kenshin-switch__labkenshin--right'
        style={{ 'width': coreWidth + 'px' }}
      >
        {offIconClass && <i className={offIconClass} />}
        {!offIconClass && offText && <span>{offText}</span>}
      </div>
    </View>


  </label>
}

Switch.defaultProps = {
  value: true,
  disabled: false,
  width: 0,
  onIconClass: '',
  offIconClass: '',
  onText: 'ON',
  offText: 'OFF',
  onValue: true,
  offValue: false,
  onColor: '',
  offColor: '',
  name: '',
  allowFocus: false
}

export default Switch
