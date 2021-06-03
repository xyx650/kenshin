import * as React from 'react'
import classnames from 'classnames'
import Input from '../input'
import { accAdd, accSub } from './util'
import { prefixCls as prefix } from '../config'
import './index.less'

export interface InputNumberProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'defaultValue' | 'onInput' | 'onChange' | 'size'> {
  defaultValue?: number;
  value: number | string;
  step: number | string;
  max: number | string;
  min: number | string;
  disabled: boolean;
  controls: boolean;
  size: 'small' | 'large' | 'mini';
  onChange?: (val: number | string | undefined) => void;
  style?: React.CSSProperties;
  className?: string;
  prefixCls?: string;
}


const InputNumber: React.FC<InputNumberProps> = props => {
  const [value, setValue] = React.useState(props.value)
  const [inputActive, setInputActive] = React.useState(false)
  // const input = React.useRef<Input>(null)

  const { controls, disabled, size, max, min, prefixCls = prefix } = props

  // 防抖定时器
  let timer: number | undefined

  React.useEffect(() => {
    onChange()
  }, [value, inputActive])


  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {

    switch (e.keyCode) {
      case 38: // KeyUp
        e.preventDefault()
        increase()
        break
      case 40: // KeyDown
        e.preventDefault()
        decrease()
        break
      default:
        break
    }
  }

  // 失去焦点
  const onBlur = () => {

    let v = value
    if (isValid()) {
      v = v > max ? +max : v < min ? +min : +v
    } else {
      // v = undefined
    }
    setValue(v)

    // this.setState({ value }, this.onChange)
  }

  // 输入事件
  const onInput = (value: string) => {
    setValue(value)
    clearTimeout(timer)
    timer = window.setTimeout(() => {
      onBlur()
    }, 750)
  }

  // onChange 回调
  const onChange = () => {
    props.onChange?.(value)
  }

  // click plus
  const increase = () => {
    const { step, max, disabled, min } = props

    let _value = value

    if (!maxDisabled()) {
      if (+_value + +step > max || disabled) return
      if (+_value + +step < min) _value = +min - +step
      _value = accAdd(+step, +value)
    }
    setInputActive(false)
    setValue(_value)
  }

  // click minus
  const decrease = () => {
    const { step, min, disabled, max } = props
    let _value = value

    if (!minDisabled()) {
      if (+_value - +step < min || disabled) return
      if (+_value - +step > max) _value = +max + +step
      _value = accSub(+value, +step)
    }
    setInputActive(false)
    setValue(_value)
  }

  const activeInput = (disabled: boolean) => {
    if (!props.disabled && !disabled) {
      setInputActive(true)
    }
  }

  const inactiveInput = (disabled: boolean) => {
    if (!props.disabled && !disabled) {
      setInputActive(false)
    }
  }

  // 合法数字
  const isValid = () => value !== '' && !isNaN(+value)

  // 最小值禁止状态
  const minDisabled = () => !isValid() || (+value - +props.step < +props.min)

  // 最大值禁止状态
  const maxDisabled = () => !isValid() || (+value + +props.step > +props.max)


  return (
    <div
      style={props.style}
      className={classnames(`${prefixCls}-input-number`, size && `${prefixCls}-input-number--${size}`, {
        'is-disabled': disabled,
        'is-without-controls': !controls
      })}>
      {
        controls && <span
          className={classnames(`${prefixCls}-input-number__decrease`, { 'is-disabled': minDisabled() })}
          onClick={decrease}
        >
          <i className={`${prefixCls}-icon-minus`} />
        </span>
      }
      {
        controls && <span
          className={classnames(`${prefixCls}-input-number__increase`, { 'is-disabled': maxDisabled() })}
          onClick={increase}
        >
          <i className={`${prefixCls}-icon-plus`} />
        </span>
      }
      <Input
        className={classnames({ 'is-active': inputActive })}
        value={String(value)}
        disabled={disabled}
        size={size}
        onChange={onInput}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
      />
    </div>
  )
}

InputNumber.defaultProps = {
  step: 1,
  controls: true,
  max: Infinity,
  min: 0
}
export default InputNumber
