import * as React from 'react'
import classNames from 'classnames'
import { prefixCls as prefix } from '../config'
import ButtonGroup from './button-group'
import './index.less'

export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<ButtonProps>, 'type' | 'onClick'> {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text' | 'default';
  size?: 'large' | 'small' | 'mini';
  icon?: string;
  nativeType?: 'button' | 'submit' | 'reset';
  loading?: boolean;
  disabled?: boolean;
  plain?: boolean;
  className?: string;
  style?: React.CSSProperties;
  prefixCls?: string
}

const ButtonRF: React.ForwardRefRenderFunction<unknown, ButtonProps> = (props, ref) => {
  const {
    type = 'default',
    size,
    disabled,
    loading,
    plain,
    nativeType = 'button',
    children,
    prefixCls = prefix
  } = props
  const className = classNames(
    `${prefixCls}-button`,
    type && `${prefixCls}-button--${type}`,
    size && `${prefixCls}-button--${size}`,
    {
      'is-disabled': disabled,
      'is-loading': loading,
      'is-plain': plain
    })
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!loading) {
      props.onClick?.(e)
    }
  }
  const buttonRef = (ref as any) || React.createRef<HTMLElement>()

  return <button
    ref={buttonRef}
    style={props.style}
    className={className}
    disabled={disabled}
    type={nativeType}
    onClick={onClick}
  >
    {loading && <i className={`${prefixCls}-icon-loading`} />}
    {props.icon && !loading && <i className={`${prefixCls}-icon-${props.icon}`} />}
    <span>{children}</span>
  </button>
}

export interface ComputedButton extends React.ForwardRefExoticComponent<ButtonProps> {
  Group: typeof ButtonGroup;
}

const Button = React.forwardRef(ButtonRF) as ComputedButton

Button.defaultProps = {
  type: 'default',
  nativeType: 'button',
  loading: false,
  disabled: false,
  plain: false
}

Button.Group = ButtonGroup

export default Button
