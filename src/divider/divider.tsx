import * as React from 'react'
import classNames from 'classnames'
import { prefixCls as prefix } from '../config'
import './index.less'

export interface DividerProps {
  type?: 'horizontal' | 'vertical';
  orientation?: 'left' | 'right' | 'center';
  plain?: boolean;
  children?: React.ReactNode;
  dashed?: boolean;
  style?: React.CSSProperties;
  className?: string;
  prefixCls?: string;
}

const Divider: React.FC<DividerProps> = props => {
  const {
    type = 'horizontal',
    orientation = 'center',
    prefixCls = prefix,
    className,
    children,
    ...restProps
  } = props

  const classString = classNames(`${prefixCls}-divider`, `${prefixCls}-divider--${type}`, className)

  return <div className={classString} {...restProps}>
    {children && <span className={classNames(`${prefixCls}-divider__text`, `is-${orientation}`)}>{children}</span>}
  </div>
}

export default Divider
