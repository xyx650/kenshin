import * as React from 'react'
import Popper from 'popper.js'
import RcTooltip from 'rc-tooltip'
import 'rc-tooltip/assets/bootstrap.css'
import Component, { style } from '@/_base/component'
import View from '@/_base/view'
import './index.less'

export type TooltipState = {
  showPopper: boolean
}
export type TooltipProps = {

  content: string
  // // Tooltip 的出现位置
  placement: 'left' | 'right' | 'top' | 'bottom' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'

  // 触发方式 'focus', 'click', 'hover'
  trigger: string[]
  children?: React.ReactElement
}

const Tooltip: React.FC<TooltipProps> = props => {
  const {
    children,
    content,
    trigger,
    ...restProps
  } = props
  console.log(restProps)
  return <RcTooltip {...restProps} overlay={<span>{content}</span>} trigger={trigger}>
    {children}
  </RcTooltip>
}
export default Tooltip
