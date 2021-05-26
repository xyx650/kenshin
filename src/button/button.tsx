import * as React from 'react'
import classNames from 'classnames'
import { prefixCls as prefix } from '@/config'
import './index.less'

export type ButtonProps = {
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

const Button: React.FC<ButtonProps> = props => {
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
  return <button
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

Button.defaultProps = {
  type: 'default',
  nativeType: 'button',
  loading: false,
  disabled: false,
  plain: false
}

export default Button
