import * as React from 'react'
import classnames from 'classnames'
import View from '../_base/view'
import { prefixCls as prefix } from '../config'
import './index.less'

export interface SwitchState {
  value: boolean | number | string;
  coreWidth: number;
  buttonStyle: React.CSSProperties;
}

export interface SwitchProps {
  /**
   * @description 绑定的value
   * @default true
   */
  value: number | string | boolean;
  /**
   * @description 是否禁用
   * @default false
   */
  disabled: boolean;
  /**
   * @description switch 的宽度（像素）
   * @default 58（有文字）/ 46（无文字）
   */
  width: number;
  /**
   * @description switch 打开时所显示图标的类名，设置此项会忽略 onText
   * @default ''
   */
  onIconClass: string;
  /**
   * @description switch 关闭时所显示图标的类名，设置此项会忽略 offText
   * @default ''
   */
  offIconClass: string;
  /**
   * @description switch 打开时的文字
   * @default ''
   */
  onText: string;
  /**
   * @description switch 关闭时的文字
   * @default ''
   */
  offText: string;
  /**
   * @description switch 打开时的背景色
   * @default #20A0FF
   */
  onColor: string;
  /**
   * @description switch 关闭时的背景色
   * @default #C0CCDA
   */
  offColor: string;
  /**
   * @description switch 打开时的值
   * @default true
   */
  onValue: number | string | boolean;
  /**
   * @description switch 关闭时的值 switch
   * @default false
   */
  offValue: number | string | boolean;
  /**
   * @description switch 对应的 name 属性
   */
  name: string;
  /**
   * @description switch 状态发生变化时的回调函数
   */
  onChange?: (value: number | string | boolean) => void;
  /**
   * @description switch 失去焦点时触发
   */
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * @description switch 获得焦点时触发
   */
  onFocus?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * @description 允许 switch 触发 focus 和 blur 事件
   */
  allowFocus?: boolean;
  /**
   * @description 自定义样式类名
   */
  className?: string;
  /**
   * @description 自定义样式
   */
  style?: React.CSSProperties;
  /**
   * @description 自定义样式类名
   */
  prefixCls?: string;
}

const Switch: React.FC<SwitchProps> = props => {

  const [state, setState] = React.useState<SwitchState>({
    value: props.value,
    coreWidth: props.width ?? 0,
    buttonStyle: { transform: '' }
  })

  const inputRef = React.useRef<HTMLInputElement>(null)
  const coreRef = React.useRef<HTMLSpanElement>(null)

  const { name, disabled, onText, offText, onValue, onIconClass, offIconClass, allowFocus, prefixCls = prefix } = props
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
    if (!props.width) {
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
    const { value } = state
    const { coreWidth } = state
    buttonStyle.transform = value === props.onValue ? `translate(${coreWidth - 20}px, 2px)` : 'translate(2px, 2px)'
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
    className={classnames(`${prefixCls}-switch`, {
      'is-disabled': disabled,
      [`${prefixCls}-switch--wide`]: hasText(),
      'is-checked': value === onValue
    })}>

    <View show={disabled}>
      <div className={`${prefixCls}-switch__mask`} />
    </View>

    <input
      className={classnames(`${prefixCls}-switch__input`, { 'allow-focus': allowFocus })}
      type='checkbox'
      checked={value === onValue}
      name={name}
      ref={inputRef}
      disabled={disabled}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
    />

    <span className={`${prefixCls}-switch__core`} ref={coreRef} style={{ 'width': `${coreWidth}px` }}>
      <span className={`${prefixCls}-switch__button`} style={{ ...buttonStyle }} onClick={setFocus} />
    </span>

    <View show={value === onValue}>
      <div
        className={`${prefixCls}-switch__label ${prefixCls}-switch__label--left`}
        style={{ 'width': `${coreWidth}px` }}
      >
        {onIconClass && <i className={onIconClass} />}
        {!onIconClass && onText && <span>{onText}</span>}
      </div>
    </View>

    <View show={value !== onValue}>
      <div
        className={`${prefixCls}-switch__label ${prefixCls}-switch__label--right`}
        style={{ 'width': `${coreWidth}px` }}
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
  onIconClass: '',
  offIconClass: '',
  onText: 'ON',
  offText: 'OFF',
  onValue: true,
  offValue: false,
  onColor: '#20A0FF',
  offColor: '#C0CCDA',
  name: '',
  allowFocus: false
}

export default Switch
