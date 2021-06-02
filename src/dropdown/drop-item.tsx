import * as React from 'react'
import classnames from 'classnames'
import { dropdownContext } from '../dropdown/context'

export interface DropdownItemProps {
  command?: string;
  disabled?: boolean;
  divided?: boolean;
  style?: React.CSSProperties;
}

const DropdownItem: React.FC<DropdownItemProps> = props => {
  const { disabled, divided, children, command } = props
  const {
    handleMenuItemClick,
    prefixCls
  } = React.useContext(dropdownContext)

  const handleClick = () => {
    handleMenuItemClick(command || children as string)
  }

  return <li
    style={props.style}
    className={classnames(`${prefixCls}-dropdown-menu__item`, {
      'is-disabled': disabled,
      [`${prefixCls}-dropdown-menu__item--divided`]: divided
    })}
    onClick={handleClick}
  >
    {children}
  </li>
}

export default DropdownItem
