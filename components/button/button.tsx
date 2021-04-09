/* eslint-disable react/button-has-type */
import * as React from 'react';
import classNames from 'classnames';
import omit from 'rc-util/lib/omit';

import Group from './button-group';
import { ConfigContext } from '../config-provider';
// import Wave from '../_util/wave'
import { Omit } from '../_util/type';
import devWarning from '../_util/devWarning';
import SizeContext, { SizeType } from '../config-provider/SizeContext';
import LoadingIcon from './LoadingIcon';
import { cloneElement } from '../_util/reactNode';

// 两个中文
const rxTwoCNChar = /^[\u4e00-\u9fa5]{2}$/;
const isTwoCNChar = rxTwoCNChar.test.bind(rxTwoCNChar);

function isString(str: any) {
  return typeof str === 'string';
}

// 无边框按钮类型
function isUnborderedButtonType(type: ButtonType | undefined) {
  return type === 'text' || type === 'link';
}

// 两个中文按钮插入空格
function insertSpace(child: React.ReactChild, needInserted: boolean) {
  if (child == null) {
    return;
  }
  const SPACE = needInserted ? ' ' : '';
  // 严格空检查
  if (
    typeof child !== 'string' &&
    typeof child !== 'number' &&
    isString(child.type) &&
    isTwoCNChar(child.props.children)
  ) {
    return cloneElement(child, { children: child.props.children.split('').join(SPACE) });
  }
  if (typeof child === 'string') {
    if (isTwoCNChar(child)) {
      child = child.split('').join(SPACE);
    }
    return <span>{child}</span>;
  }
  return child;
}

function spaceChildren(children: React.ReactNode, needInserted: boolean) {
  let isPrevChildPure: boolean = false;
  const childList: React.ReactNode[] = [];
  React.Children.forEach(children, child => {
    const type = typeof child;
    const isCurrentChildPure = type === 'string' || type === 'number';
    if (isPrevChildPure && isCurrentChildPure) {
      const lastIndex = childList.length - 1;
      const lastChild = childList[lastIndex];
      childList[lastIndex] = `${lastChild}${child}`;
    } else {
      childList.push(child);
    }

    isPrevChildPure = isCurrentChildPure;
  });

  // 自动填充 React.Children
  return React.Children.map(childList, child =>
    insertSpace(child as React.ReactChild, needInserted),
  );
}

// 定义 React 按钮类型
export type ButtonType = 'default' | 'primary' | 'ghost' | 'dashed' | 'link' | 'text';
// 定义 React 按钮形状
export type ButtonShape = 'circle' | 'round';
// 定义 HTML 按钮类型
export type ButtonHTMLType = 'submit' | 'button' | 'reset';
// 传统按钮类型
export type LegacyButtonType = ButtonType | 'danger';

export function convertLegacyProps(type?: LegacyButtonType): ButtonProps {
  if (type === 'danger') {
    return { danger: true };
  }
  return { type };
}

// 基础按钮属性类型
export interface BaseButtonProps {
  type?: ButtonType;
  icon?: React.ReactNode;
  shape?: ButtonShape;
  size?: SizeType;
  loading?: boolean | { delay?: number };
  prefixCls?: string;
  className?: string;
  // 幽灵属性，使按钮背景透明
  ghost?: boolean;
  danger?: boolean;
  // 将按钮宽度调整为其父宽度的选项
  block?: boolean;
  children?: React.ReactNode;
}

// 锚点按钮属性类型
export type AnchorButtonProps = {
  href: string;
  target?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
} & BaseButtonProps &
  Omit<React.AnchorHTMLAttributes<any>, 'type' | 'onClick'>;

// 原生按钮属性类型
export type NativeButtonProps = {
  htmlType?: ButtonHTMLType;
  onClick?: React.MouseEventHandler<HTMLElement>;
} & BaseButtonProps &
  Omit<React.ButtonHTMLAttributes<any>, 'type' | 'onClick'>;

// 按钮属性类型
export type ButtonProps = Partial<AnchorButtonProps & NativeButtonProps>;

// 复合组件类型
interface CompoundedComponent
  extends React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLElement>> {
  Group: typeof Group;
  // __ANT_BUTTON: boolean;
}

type Loading = number | boolean;

// 内部按钮 ForwardRefRender 类型
const InternalButton: React.ForwardRefRenderFunction<unknown, ButtonProps> = (props, ref) => {
  const {
    loading = false,
    // class 前缀
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
    // React 无法识别 DOM 元素上的 htmlType 属性
    htmlType = 'button' as ButtonProps['htmlType'],
    ...rest
  } = props;

  const size = React.useContext(SizeContext);
  const [innerLoading, setLoading] = React.useState<Loading>(loading as boolean);
  const [hasTwoCNChar, setHasTwoCNChar] = React.useState(false);
  const { getPrefixCls, autoInsertSpaceInButton, direction } = React.useContext(ConfigContext);
  const buttonRef = (ref as any) || React.createRef<HTMLElement>();
  const delayTimeoutRef = React.useRef<number>();

  // 是否需要插入空格
  const isNeedInserted = () =>
    React.Children.count(children) === 1 && !icon && !isUnborderedButtonType(type);

  const fixTwoCNChar = () => {
    if (!buttonRef || !buttonRef.current || autoInsertSpaceInButton === false) {
      return;
    }
    const buttonText = buttonRef.current.textContent;
    if (isNeedInserted() && isTwoCNChar(buttonText)) {
      if (!hasTwoCNChar) {
        setHasTwoCNChar(true);
      }
    } else if (hasTwoCNChar) {
      setHasTwoCNChar(false);
    }
  };

  // =============== Update Loading ===============
  let loadingOrDelay: Loading;
  if (typeof loading === 'object' && loading.delay) {
    loadingOrDelay = loading.delay || true;
  } else {
    loadingOrDelay = loading as boolean;
  }

  React.useEffect(() => {
    clearTimeout(delayTimeoutRef.current);
    if (typeof loadingOrDelay === 'number') {
      delayTimeoutRef.current = window.setTimeout(() => {
        setLoading(loadingOrDelay);
      }, loadingOrDelay);
    } else {
      setLoading(loadingOrDelay);
    }
  }, [loadingOrDelay]);

  React.useEffect(fixTwoCNChar, [buttonRef]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>) => {
    const { onClick } = props;
    if (innerLoading) {
      return;
    }
    (onClick as React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>)?.(e);
  };

  // icon 未使用 ReactNode
  devWarning(
    !(typeof icon === 'string' && icon.length > 2),
    'Button',
    `\`icon\` is using ReactNode instead of string naming.`,
  );

  devWarning(
    !(ghost && isUnborderedButtonType(type)),
    'Button',
    "`link` or `text` button can't be a `ghost` button.",
  );

  const prefixCls = getPrefixCls('btn', customizePrefixCls);
  const autoInsertSpace = autoInsertSpaceInButton !== false;

  // large => lg
  // small => sm
  let sizeCls = '';
  switch (customizeSize || size) {
    case 'large':
      sizeCls = 'lg';
      break;
    case 'small':
      sizeCls = 'sm';
      break;
    default:
      break;
  }

  const iconType = innerLoading ? 'loading' : icon;

  const classes = classNames(
    prefixCls,
    {
      [`${prefixCls}-${type}`]: type,
      [`${prefixCls}-${shape}`]: shape,
      [`${prefixCls}-${sizeCls}`]: sizeCls,
      [`${prefixCls}-icon-only`]: !children && children !== 0 && iconType,
      [`${prefixCls}-background-ghost`]: ghost && !isUnborderedButtonType(type),
      [`${prefixCls}-loading`]: innerLoading,
      [`${prefixCls}-two-chinese-chars`]: hasTwoCNChar && autoInsertSpace,
      [`${prefixCls}-block`]: block,
      [`${prefixCls}-dangerous`]: !!danger,
      [`${prefixCls}-rtl`]: direction === 'rtl',
    },
    className,
  );

  const iconNode =
    icon && !innerLoading ? (
      icon
    ) : (
      <LoadingIcon existIcon={!!icon} prefixCls={prefixCls} loading={!!innerLoading} />
    );

  const kids =
    children || children === 0
      ? spaceChildren(children, isNeedInserted() && autoInsertSpace)
      : null;

  const linkButtonRestProps = omit(rest as AnchorButtonProps & { navigate: any }, ['navigate']);
  if (linkButtonRestProps.href !== undefined) {
    return (
      <a {...linkButtonRestProps} className={classes} onClick={handleClick} ref={buttonRef}>
        {iconNode}
        {kids}
      </a>
    );
  }

  const buttonNode = (
    <button
      {...(rest as NativeButtonProps)}
      type={htmlType}
      className={classes}
      onClick={handleClick}
      ref={buttonRef}
    >
      {iconNode}
      {kids}
    </button>
  );

  if (isUnborderedButtonType(type)) {
    return buttonNode;
  }
  // 暂未使用 Wave
  // return <Wave>{buttonNode}</Wave>
  return buttonNode;
};

const Button = React.forwardRef<unknown, ButtonProps>(InternalButton) as CompoundedComponent;

Button.displayName = 'Button';

Button.Group = Group;
// Button.__ANT_BUTTON = true

export default Button;
