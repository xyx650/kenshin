import * as React from 'react'
import classnames from 'classnames'
import useOnClickOutside from 'use-onclickoutside'
import useUpdate from '../_hooks/useUpdate'
import { prefixCls as prefix } from '@/config'
import type { ButtonProps } from '@/button'
import Button from '@/button'
import { dropdownContext } from './context'
import type { DropdownItemProps } from './drop-item'
import DropdownItem from './drop-item'
import DropdownMenu from './drop-menu'
import './index.less'


export interface DropdownProps {
  menu: React.ReactElement;
  type?: ButtonProps['type'];
  size?: ButtonProps['size'];
  trigger?: 'hover' | 'click';
  menuAlign?: 'start' | 'end';
  splitButton?: boolean;
  hideOnClick?: boolean;
  onClick?: () => void;
  onCommand?: (command: string) => void;
  onVisibleChange?: (visible: boolean) => void;
  style?: React.CSSProperties;
  className?: string;
  prefixCls?: string;
}


const Dropdown: React.FC<DropdownProps> & {
  Item: typeof DropdownItem;
  Menu: typeof DropdownMenu;
} = props => {
  const {
    prefixCls = prefix,
    splitButton,
    children,
    type,
    size,
    menu,
    onClick,
    hideOnClick = true,
    trigger = 'hover',
    menuAlign = 'end',
    onCommand,
    onVisibleChange
  } = props

  let timeout: number

  const [visible, setVisible] = React.useState(false)

  const rootRef = React.useRef<HTMLDivElement>(null)
  const dropdownRef = React.useRef<typeof DropdownMenu>(null)
  const triggerRef = React.useRef(null)
  const defaultRef = React.useRef(null)


  useOnClickOutside(rootRef, () => handleClickOutside())

  useUpdate(() => {
    // @ts-ignore
    dropdownRef.current!.onVisibleChange(visible)
    onVisibleChange?.(visible)
  }, [visible])


  React.useEffect(() => {
    const triggerEl: HTMLElement = splitButton ? triggerRef.current! : defaultRef.current!
    // @ts-ignore
    const dropdownEl: HTMLElement = dropdownRef.current!.dom
    return initEvent(triggerEl, dropdownEl)
  }, [])


  const initEvent = (triggerEl: HTMLElement, dropdownEl: HTMLElement) => {
    if (trigger === 'hover') {
      triggerEl.addEventListener('mouseenter', show.bind(triggerEl))
      triggerEl.addEventListener('mouseleave', hide.bind(triggerEl))
      dropdownEl.addEventListener('mouseenter', show.bind(dropdownEl))
      dropdownEl.addEventListener('mouseleave', hide.bind(dropdownEl))
    }
    if (trigger === 'click') {
      triggerEl.addEventListener('click', handleClick)
    }
    return () => {
      if (trigger === 'hover') {
        triggerEl.removeEventListener('mouseenter', show)
        triggerEl.removeEventListener('mouseleave', hide)
        dropdownEl.removeEventListener('mouseenter', show)
        dropdownEl.removeEventListener('mouseleave', hide)
      }
      if (trigger === 'click') {
        triggerEl.removeEventListener('click', handleClick)
      }
    }
  }

  const show = () => {
    clearTimeout(timeout)
    timeout = window.setTimeout(() => {
      setVisible(true)
    }, 250)
  }

  const hide = () => {
    clearTimeout(timeout)
    timeout = window.setTimeout(() => {
      setVisible(false)
    }, 150)
  }

  const handleClick = () => {
    setVisible(visible => !visible)
  }


  const handleClickOutside = () => {
    visible && setVisible(false)
  }

  const handleMenuItemClick = (command: string) => {
    if (hideOnClick) {
      setVisible(false)
    }
    if (onCommand) {
      setTimeout(() => onCommand(command))
    }
  }


  return <dropdownContext.Provider value={{ handleMenuItemClick, prefixCls, menuAlign, rootRef }}>
    <div style={props.style} className={classnames(`${prefixCls}-dropdown`)} ref={rootRef}>
      {
        splitButton ? <Button.Group>
          <Button type={type} size={size} onClick={onClick}>
            {children}
          </Button>
          <Button type={type} size={size} className={`${prefixCls}-dropdown__caret-button`} ref={triggerRef}>
            <i className={`${prefixCls}-dropdown__icon ${prefixCls}-icon-caret-bottom`} />
          </Button>
        </Button.Group> : React.cloneElement(children as React.ReactElement, {
          ref: defaultRef
        })
      }
      {
        // @ts-ignore
        React.cloneElement(menu, { ref: dropdownRef })
      }
    </div>
  </dropdownContext.Provider>

}


Dropdown.defaultProps = {
  hideOnClick: true,
  trigger: 'hover',
  menuAlign: 'end'
}

Dropdown.Menu = DropdownMenu
Dropdown.Item = DropdownItem

export default Dropdown
