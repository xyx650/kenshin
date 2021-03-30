import * as React from 'react'
import classNames from 'classnames'
import omit from 'rc-util/lib/omit'
import LoadingIcon from '@/button/LoadingIcon'

import SizeContext, { SizeType } from '@/_config-provider/SizeContext'
import { ConfigContext } from '@/_config-provider'
// import './index.less'


export type ButtonHTMLType = 'submit' | 'button' | 'reset'
export type ButtonType = 'default' | 'primary' | 'ghost' | 'dashed' | 'link' | 'text'
export type ButtonShape = 'circle' | 'round'

export interface BaseButtonProps {
  type?: ButtonType;
  icon?: React.ReactNode;
  shape?: ButtonShape;
  size?: SizeType;
  loading?: boolean | { delay?: number };
  prefixCls?: string;
  className?: string;
  ghost?: boolean;
  danger?: boolean;
  block?: boolean;
  children?: React.ReactNode;
}

export type AnchorButtonProps = {
  href: string;
  target?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
} & BaseButtonProps &
  Omit<React.AnchorHTMLAttributes<any>, 'type' | 'onClick'>;

export type NativeButtonProps = {
  htmlType?: ButtonHTMLType;
  onClick?: React.MouseEventHandler<HTMLElement>;
} & BaseButtonProps &
  Omit<React.ButtonHTMLAttributes<any>, 'type' | 'onClick'>;

export type ButtonProps = Partial<AnchorButtonProps & NativeButtonProps>

type Loading = number | boolean

interface CompoundedComponent
  extends React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLElement>> {
  // Group: typeof Group;
  __ANT_BUTTON: boolean;
}

function isString(str: any): str is string {
  return typeof str === 'string'
}

function isUnborderedButtonType(type: ButtonType | undefined) {
  return type === 'text' || type === 'link'
}

const InternalButton: React.ForwardRefRenderFunction<unknown, ButtonProps> = (props, ref) => {
  const {
    loading = false,
    prefixCls: customizePrefixCls,
    type,
    danger,
    shape,
    size: customizeSize,
    className,
    children,
    icon,
    ghost = false,
    block = false,
    /** If we extract items here, we don't need use omit.js */
    // React does not recognize the `htmlType` prop on a DOM element. Here we pick it out of `rest`.
    htmlType = 'button' as ButtonProps['htmlType'],
    ...rest
  } = props

  const size = React.useContext(SizeContext)
  const [innerLoading, setLoading] = React.useState<Loading>(loading as boolean)
  const [hasTwoCNChar, setHasTwoCNChar] = React.useState(false)
  const { getPrefixCls } = React.useContext(ConfigContext)
  const buttonRef = ref as any || React.createRef<HTMLElement>()
  const delayTimeoutRef = React.useRef<number>()

  const isNeedInserted = () => React.Children.count(children) === 1 && !icon && !isUnborderedButtonType(type)

  // =============== Update Loading ===============
  let loadingOrDelay: Loading
  if (typeof loading === 'object' && loading.delay) {
    loadingOrDelay = loading.delay || true
  } else {
    loadingOrDelay = loading as boolean
  }


  const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>) => {
    const { onClick } = props
    if (innerLoading) {
      return
    }
    (onClick as React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>)?.(e)
  }

  const prefixCls = getPrefixCls('btn', customizePrefixCls)
  // large => lg
  // small => sm
  let sizeCls = ''
  switch (customizeSize || size) {
    case 'large':
      sizeCls = 'lg'
      break
    case 'small':
      sizeCls = 'sm'
      break
    default:
      break
  }
  const iconType = innerLoading ? 'loading' : icon

  const classes = classNames(prefixCls, {
    [`${prefixCls}-${type}`]: type,
    [`${prefixCls}-${shape}`]: shape,
    [`${prefixCls}-${sizeCls}`]: sizeCls,
    [`${prefixCls}-icon-only`]: !children && children !== 0 && iconType,
    [`${prefixCls}-background-ghost`]: ghost && !isUnborderedButtonType(type),
    [`${prefixCls}-loading`]: innerLoading,
    [`${prefixCls}-two-chinese-chars`]: hasTwoCNChar,
    [`${prefixCls}-block`]: block,
    [`${prefixCls}-dangerous`]: !!danger
  }, className)


  const iconNode = icon && !innerLoading ? icon :
    <LoadingIcon existIcon={!!icon} prefixCls={prefixCls} loading={!!innerLoading} />

  const kids = children || children === 0 ? children : null

  const linkButtonRestProps = omit(rest as AnchorButtonProps & { navigate: any }, ['navigate'])
  if (linkButtonRestProps.href !== undefined) {
    return <a {...linkButtonRestProps} className={classes} onClick={handleClick} ref={buttonRef}>
      {iconNode}
      {kids}
    </a>
  }


  const buttonNode = <button
    {...(rest as NativeButtonProps)}
    type={htmlType}
    className={classes}
    onClick={handleClick}
    ref={buttonRef}
  >
    {iconNode}
    {kids}
  </button>

  if (isUnborderedButtonType(type)) {
    return buttonNode
  }
  return buttonNode
}

const Button = React.forwardRef<unknown, ButtonProps>(InternalButton) as CompoundedComponent

Button.displayName = 'Button'

// Button.Group = Group
Button.__ANT_BUTTON = true
export default Button

