import * as React from 'react'
import classNames from 'classnames'
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
}

const Button: React.FC<ButtonProps> = props => {
  const {
    type = 'default',
    size,
    disabled,
    loading,
    plain,
    nativeType = 'button',
    children
  } = props
  const className = classNames(
    'kenshin-button',
    type && `kenshin-button--${type}`,
    size && `kenshin-button--${size}`,
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
    {loading && <i className='kenshin-icon-loading' />}
    {props.icon && !loading && <i className={`kenshin-icon-${props.icon}`} />}
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
