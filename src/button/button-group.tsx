import * as React from 'react'
import classnames from 'classnames'
import { prefixCls as prefix } from '@/config'
import './button-group.less'

export interface ButtonGroupProps {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
}

const ButtonGroup: React.FC<ButtonGroupProps> = props => {
  const { prefixCls = prefix, children } = props
  return <div style={props.style} className={classnames(`${prefixCls}-button-group`, props.className)}>
    {children}
  </div>
}

export default ButtonGroup
