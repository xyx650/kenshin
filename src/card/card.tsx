import * as React from 'react'
import classnames from 'classnames'
import { prefixCls as prefix } from '../config'
import './index.less'

export interface CardProps {
  header?: React.ReactNode;
  bodyStyle?: React.CSSProperties;
  className?: string;
  style?: React.CSSProperties;
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

export default Card
