import * as React from 'react'
import classnames from 'classnames'
import { prefixCls as prefix } from '../config'
import './index.less'

export interface CardProps {
  /**
   * @description 设置 header，可以通过 JSX 元素传入
   */
  header?: React.ReactNode;
  /**
   * @description 设置 body 的样式
   */
  bodyStyle?: React.CSSProperties;
  /**
   * @description 自定义样式
   * @default { padding: '20px' }
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


const Card: React.FC<CardProps> = props => {
  const { header, bodyStyle, children, prefixCls = prefix } = props
  return <div style={props.style} className={classnames(`${prefixCls}-card`, props.className)}>
    {header && <div className={classnames(`${prefixCls}-card__header`)}>{header}</div>}
    <div className={`${prefixCls}-card__body`} style={bodyStyle}>
      {children}
    </div>
  </div>
}


Card.defaultProps = {
  bodyStyle: { padding: '20px' }
}

Card.displayName = 'Card'

export default Card
