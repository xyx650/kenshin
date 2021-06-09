import * as React from 'react'
import classNames from 'classnames'
import { prefixCls as prefix } from '../config'
import './index.less'

export interface DividerProps {
  /**
   * @description 类型，横向或竖向
   * @default horizontal
   */
  type?: 'horizontal' | 'vertical';
  /**
   * @description 对齐方式
   * @default center
   */
  orientation?: 'left' | 'right' | 'center';
  /**
   * @description 自定义样式
   */
  style?: React.CSSProperties;
  /**
   * @description 自定义样式类名
   */
  className?: string;
  /**
   * @description 自定义样式类前缀
   */
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
