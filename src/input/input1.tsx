import * as React from 'react'
import Component from '@/_base/component'
import calcTextareaHeight from '@/input/calcTextareaHeight'
import './index.less'

// autosize 对象类型
interface autosizeObj {
  minRows: number
  maxRows: number
}

export type InputProps = {
  type: 'text' | 'textarea'
  icon: React.ReactNode | string
  disabled: boolean
  name: string
  placeholder: string
  readOnly: boolean
  autoFocus: boolean
  maxLength: number
  minLength: number
  defaultValue?: string
  value: string
  trim: boolean

  size: 'large' | 'small' | 'mini'
  prepend: React.ReactNode
  append: React.ReactNode

  autosize?: boolean | autosizeObj
  rows: number
  resize?: React.CSSProperties['resize']

  onFocus: (e: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement>) => void
  onBlur: (e: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement>) => void
  onChange: (val: string) => void
  onIconClick?: (e: React.MouseEvent<HTMLElement>) => void
  onMouseEnter: (e: React.MouseEvent<HTMLElement>) => void
  onMouseLeave: (e: React.MouseEvent<HTMLElement>) => void

  autoComplete: string
  inputSelect: () => void

  form: string
  validating: boolean
}

export type InputState = {
  textareaStyle: { resize: React.CSSProperties['resize'], height?: React.CSSProperties['height'] }
}

export default class Input extends Component<InputProps, InputState> {
  private input = React.createRef<HTMLInputElement>()
  private textarea = React.createRef<HTMLTextAreaElement>()

  static defaultProps = {
    type: 'text',
    autosize: false,
    rows: 2,
    trim: false,
    autoComplete: 'off'
  }

  constructor(props: InputProps) {
    super(props)

    this.state = {
      textareaStyle: { resize: props.resize }
    }
  }

  componentDidMount() {
    this.resizeTextarea()
  }

  resizeTextarea() {
    const { autosize, type } = this.props

    if (typeof autosize === 'boolean' || type !== 'textarea') {
      return
    }

    const minRows = autosize!.minRows
    const maxRows = autosize!.maxRows
    const textareaCalcStyle = calcTextareaHeight(this.textarea.current!, minRows, maxRows)

    this.setState({
      textareaStyle: { ...this.state.textareaStyle, ...textareaCalcStyle }
    })
  }

  focus() {
    setTimeout(() => {
      (this.input.current || this.textarea.current)!.focus()
    })
  }

  blur() {
    setTimeout(() => {
      (this.input.current || this.textarea.current)!.blur()
    })
  }

  fixControlledValue(value?: string | null): string {
    if (typeof value === 'undefined' || value === null) {
      return ''
    }
    return value
  }

  handleFocus(e: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement>) {
    this.props.onFocus?.(e)
  }

  handleBlur(e: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement>) {
    const { onBlur } = this.props
    this.props.trim && this.handleTrim()
    onBlur?.(e)
  }

  handleTrim() {
    this.input.current!.value = this.input.current!.value.trim()
    this.props.onChange?.(this.input.current!.value.trim())
  }

  handleIconClick(e: React.MouseEvent<HTMLElement>) {
    this.props.onIconClick?.(e)
  }

  handleChange(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    const { onChange } = this.props

    onChange?.(e.target.value)
    this.resizeTextarea()
  }

  render() {
    const {
      type,
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
    } = this.props

    const classname = this.classNames(type === 'textarea' ? 'kenshin-textarea' : 'kenshin-input', size &&
      `kenshin-input--${size}`, {
      'is-disabled': this.props.disabled, 'kenshin-input-group': prepend || append,
      'kenshin-input-group--append': !!append, 'kenshin-input-group--prepend': !!prepend
    })
    if ('value' in this.props) {
      otherProps.value = this.fixControlledValue(this.props.value)
      delete otherProps.defaultValue
    }
    delete
      otherProps.resize
    delete otherProps.style
    delete otherProps.autosize
    delete otherProps.onIconClick
    // 多行文本
    if (type === 'textarea') {
      return <div style={this.style()} className={this.className(classname)}>
        <textarea
          {...otherProps}
          ref={this.textarea} className='kenshin-textarea__inner' style={this.state.textareaStyle} rows={rows}
          onChange={e =>
            this.handleChange(e)} onFocus={this.handleFocus.bind(this)} onBlur={this.handleBlur.bind(this)} />
      </div>
    }

    // 单行文本
    return <div
      style={this.style()}
      className={this.className(classname)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    > {prepend && <div className='kenshin-input-group__prepend'>{prepend}</div>}
      {
        typeof icon === 'string'
          ? <i
            className={`kenshin-input__icon kenshin-icon-${icon}`}
            onClick={e => this.handleIconClick(e)}
          >{prepend}</i>
          : icon
      }
      <input
        {...otherProps}
        ref={this.input}
        type={type}
        className='kenshin-input__inner'
        autoComplete={autoComplete}
        onChange={e => this.handleChange(e)}
        onFocus={e => this.handleFocus(e)}
        onBlur={e => this.handleBlur(e)} />
      {validating && <i className='kenshin-input__icon kenshin-icon-loading' />}
      {append && <div className='kenshin-input-group__append'>{append}</div>}
    </div>
  }
}
