
import * as React from 'react'
import classnames from 'classnames'
import useOnClickOutside from 'use-onclickoutside'
import useUpdate from '../_hooks/useUpdate'
import { prefixCls as prefix } from '../config'
import type { ButtonProps } from '../button'
import Button from '../button'
import { dropdownContext } from './context'
import DropdownItem from './drop-item'
import DropdownMenu from './drop-menu'
import './index.less'

export interface DropdownProps {
  /**
   * @description 下拉菜单内容
   */
  menu: React.ReactElement;
  /**
   * @description 菜单按钮类型(只在splitButton为 true 的情况下有效)
   */
  type?: ButtonProps['type'];
  /**
   * @description 菜单按钮尺寸
   */
  size?: ButtonProps['size'];
  /**
   * @description 触发下拉的行为
   * @default hover
   */
  trigger?: 'hover' | 'click';
  /**
   * @description 菜单水平对齐方向
   * @default end
   */
  menuAlign?: 'start' | 'end';
  /**
   * @description 下拉触发元素是否呈现为按钮组
   * @default false
   */
  splitButton?: boolean;
  /**
   * @description 是否在点击菜单项后隐藏菜单
   * @default true
   */
  hideOnClick?: boolean;
  /**
   * @description splitButton 为 true 时，点击左侧按钮的回调
   */
  onClick?: () => void;
  /**
   * @description 点击菜单项触发的事件回调
   */
  onCommand?: (command: string) => void;
  /**
   * @description 下拉框出现/隐藏时触发
   */
  onVisibleChange?: (visible: boolean) => void;
  /**
   * @description 自定义样式
   */
  style?: React.CSSProperties;
  /**
   * @description 自定义样式类
   */
  className?: string;
  /**
   * @description 自定义样式类前缀
   */
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
          {/* @ts-ignore */}
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
