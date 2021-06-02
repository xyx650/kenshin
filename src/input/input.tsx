import * as React from 'react'
import calcTextareaHeight from '../input/calcTextareaHeight'
import classnames from 'classnames'

// autosize 对象类型
interface autosizeObj {
  minRows: number
  maxRows: number
}

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLTextAreaElement | HTMLInputElement>, 'size' | 'type' | 'onChange'> {
  type?: 'text' | 'textarea'
  icon?: React.ReactNode | string
  disabled?: boolean
  name?: string
  placeholder?: string
  readOnly?: boolean
  autoFocus?: boolean
  maxLength?: number
  minLength?: number
  defaultValue?: string
  value: string
  trim?: boolean

  size?: 'large' | 'small' | 'mini'
  prepend?: React.ReactNode
  append?: React.ReactNode

  autosize?: boolean | autosizeObj
  rows?: number
  resize?: React.CSSProperties['resize']

  // onFocus?: (e: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement>) => void
  // onBlur?: (e: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement>) => void
  onChange?: (val: string) => void
  onIconClick?: (e: React.MouseEvent<HTMLElement>) => void
  onMouseEnter?: (e: React.MouseEvent<HTMLElement>) => void
  onMouseLeave?: (e: React.MouseEvent<HTMLElement>) => void

  autoComplete?: string
  inputSelect?: () => void

  form?: string
  validating?: boolean,

  style?: React.CSSProperties
  className?: string
}

export type InputState = { resize: React.CSSProperties['resize'], height?: React.CSSProperties['height'] }


const Input: React.FC<InputProps> = props => {
  const {
    type = 'text',
    size,
    prepend,
    append,
    icon,
    autoComplete,
    validating,
    rows,
    onMouseEnter,
    onMouseLeave,
    trim,
    ...otherProps
  } = props

  const [textareaStyle, setTextareaStyle] = React.useState<InputState>({ resize: props.resize })
  const textarea = React.useRef<HTMLTextAreaElement>(null)
  const input = React.useRef<HTMLInputElement>(null)

  // componentDidMount
  React.useEffect(() => {
    resizeTextarea()
    // eslint-disable-next-line
  }, [])


  const resizeTextarea = () => {
    if (typeof props.autosize === 'boolean' || type !== 'textarea') {
      return
    }
    const { minRows } = props.autosize!
    const { maxRows } = props.autosize!
    const textareaCalcStyle = calcTextareaHeight(textarea.current!, minRows, maxRows)

    setTextareaStyle({ ...textareaStyle, ...textareaCalcStyle })
  }


  const focus = () => {
    setTimeout(() => {
      (input.current || textarea.current)!.focus()
    })
  }

  const blur = () => {
    setTimeout(() => {
      (input.current || textarea.current)!.blur()
    })
  }

  const fixControlledValue = (value?: string | null) => {
    return value || ''
  }


  const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    props.onFocus?.(e)
  }

  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { onBlur } = props
    props.trim && handleTrim()
    onBlur?.(e)
  }

  const handleTrim = () => {
    input.current!.value = input.current!.value.trim()
    props.onChange?.(input.current!.value.trim())
  }

  const handleIconClick = (e: React.MouseEvent<HTMLElement>) => {
    props.onIconClick?.(e)
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { onChange } = props

    onChange?.(e.target.value)
    resizeTextarea()
  }


  const classname = classnames(type === 'textarea' ? 'kenshin-textarea' : 'kenshin-input', size &&
    `kenshin-input--${size}`, {
    'is-disabled': props.disabled, 'kenshin-input-group': prepend || append,
    'kenshin-input-group--append': !!append, 'kenshin-input-group--prepend': !!prepend
  })
  if ('value' in props) {
    otherProps.value = fixControlledValue(props.value)
    delete otherProps.defaultValue
  }
  delete otherProps.resize
  delete otherProps.style
  delete otherProps.autosize
  delete otherProps.onIconClick

  // 多行文本
  if (type === 'textarea') {
    return <div style={props.style} className={classnames(classname)}>
        <textarea
          {...otherProps}
          ref={textarea}
          className='kenshin-textarea__inner'
          style={textareaStyle}
          rows={rows}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
    </div>
  }

  // 单行文本
  return <div
    style={props.style}
    className={classnames(classname)}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  > {prepend && <div className='kenshin-input-group__prepend'>{prepend}</div>}
    {
      typeof icon === 'string'
        ? <i
          className={`kenshin-input__icon kenshin-icon-${icon}`}
          onClick={handleIconClick}
        >{prepend}</i>
        : icon
    }
    <input
      {...otherProps}
      ref={input}
      type={type}
      className='kenshin-input__inner'
      autoComplete={autoComplete}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
    {validating && <i className='kenshin-input__icon kenshin-icon-loading' />}
    {append && <div className='kenshin-input-group__append'>{append}</div>}
  </div>
}

Input.defaultProps = {
  type: 'text',
  autosize: false,
  rows: 2,
  trim: false,
  autoComplete: 'off'
}

export default Input





