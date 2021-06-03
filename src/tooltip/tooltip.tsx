import * as React from 'react'
import RcTooltip from 'rc-tooltip'
import useMergedState from 'rc-util/lib/hooks/useMergedState'
import type { TooltipProps as RcTooltipProps } from 'rc-tooltip/lib/Tooltip'
import { cloneElement, isValidElement } from '../_util/reactNode'
import type { placements as Placements } from 'rc-tooltip/lib/placements'
import { PresetColorTypes } from '../_util/colors'
import type { PresetColorType } from '../_util/colors'
import getPlacements from './placements'
import type { AdjustOverflow } from './placements'
import classnames from 'classnames'
import {prefixCls as prefix} from '../config'
import 'rc-tooltip/assets/bootstrap.css'
import './index.less'

// Tooltip 位置的值
export type TooltipPlacement =
  | 'top'
  | 'left'
  | 'right'
  | 'bottom'
  | 'topLeft'
  | 'topRight'
  | 'bottomLeft'
  | 'bottomRight'
  | 'leftTop'
  | 'leftBottom'
  | 'rightTop'
  | 'rightBottom';

// Tooltip 对齐属性接口
export interface TooltipAlignConfig {
  points?: [string, string];
  offset?: [number | string, number | string];
  targetOffset?: [number | string, number | string];
  overflow?: { adjustX: boolean; adjustY: boolean };
  useCssRight?: boolean;
  useCssBottom?: boolean;
  useCssTransform?: boolean;
}

// 抽象 Tooltip 属性接口
export interface AbstractTooltipProps extends Partial<Omit<RcTooltipProps, 'children'>> {
  style?: React.CSSProperties;
  className?: string;
  prefixCls?: string;
  color?: LiteralUnion<PresetColorType, string>;
  placement?: TooltipPlacement;
  builtinPlacements?: typeof Placements;
  openClassName?: string;
  arrowPointAtCenter?: boolean;
  autoAdjustOverflow?: boolean | AdjustOverflow;
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  children?: React.ReactNode;
}

export type RenderFunction = () => React.ReactNode;
export type LiteralUnion<T extends U, U> = T | (U & {});

// 带 overlay 接口属性
export interface TooltipPropsWithOverlay extends AbstractTooltipProps {
  title?: React.ReactNode | RenderFunction;
  overlay: React.ReactNode | RenderFunction;
}

// 带 title 接口属性
export interface TooltipPropsWithTitle extends AbstractTooltipProps {
  title: React.ReactNode | RenderFunction;
  overlay?: React.ReactNode | RenderFunction;
}

// props 接口属性
export declare type TooltipProps = TooltipPropsWithTitle | TooltipPropsWithOverlay;

// 将对象根据 keys 拆分成两个对象
const splitObject = <T extends Record<string, unknown>, K extends keyof T>(obj: T, keys: K[]) => {
  const picked = {} as Pick<T, K>
  const omitted: Partial<T> = { ...obj }
  keys.forEach(key => {
    if (obj && key in obj) {
      picked[key] = obj[key]
      delete omitted[key]
    }
  })
  return { picked, omitted }
}

const PresetColorRegex = new RegExp(`^(${PresetColorTypes.join('|')})(-inverse)?$`)

// 获取兼容的子级
function getDisabledCompatibleChildren(element: React.ReactElement, prefixCls: string) {
  if (element.type === 'button' && element.props.disabled) {
    const { picked, omitted } = splitObject(element.props.style, [
      'position',
      'left',
      'right',
      'top',
      'bottom',
      'float',
      'display',
      'zIndex'
    ])
    const spanStyle = {
      // @ts-ignore
      display: 'inline-block',
      ...picked,
      cursor: 'not-allowed',
      width: element.props.block ? '100%' : null
    } as React.CSSProperties
    const buttonStyle = {
      ...omitted,
      pointerEvents: 'none'
    }
    const child = cloneElement(element, {
      style: buttonStyle,
      className: null
    })
    return <span
      style={spanStyle}
      className={classnames(element.props.className, `${prefixCls}-disabled-compatible-wrapper`)}
    >
      {child}
    </span>
  }
  return element
}

const Tooltip = React.forwardRef<unknown, TooltipProps>((props, ref) => {

  const [visible, setVisible] = useMergedState(false, {
    value: props.visible,
    defaultValue: props.defaultVisible
  })

  const isNoTitle = () => {
    const { title, overlay } = props
    return !title && !overlay && title !== 0
  }

  const onVisibleChange = (vis: boolean) => {
    setVisible(isNoTitle() ? false : vis)

    if (!isNoTitle()) {
      props.onVisibleChange?.(vis)
    }
  }

  const getTooltipPlacements = () => {
    const { builtinPlacements, arrowPointAtCenter, autoAdjustOverflow } = props
    return (
      builtinPlacements ||
      getPlacements({
        arrowPointAtCenter,
        autoAdjustOverflow
      })
    )
  }


  // 动态设置动画点
  const onPopupAlign = (domNode: HTMLElement, align: any) => {
    const placements: any = getTooltipPlacements()
    // 当前返回的位置
    const placement = Object.keys(placements).filter(key => placements[key].points[0] === align.points[0] && placements[key].points[1] === align.points[1])[0]
    if (!placement) {
      return
    }
    // 根据当前坐标设置动画点
    const rect = domNode.getBoundingClientRect()
    const transformOrigin = {
      top: '50%',
      left: '50%'
    }
    if (placement.indexOf('top') >= 0 || placement.indexOf('Bottom') >= 0) {
      transformOrigin.top = `${rect.height - align.offset[1]}px`
    } else if (placement.indexOf('Top') >= 0 || placement.indexOf('bottom') >= 0) {
      transformOrigin.top = `${-align.offset[1]}px`
    }
    if (placement.indexOf('left') >= 0 || placement.indexOf('Right') >= 0) {
      transformOrigin.left = `${rect.width - align.offset[0]}px`
    } else if (placement.indexOf('right') >= 0 || placement.indexOf('Left') >= 0) {
      transformOrigin.left = `${-align.offset[0]}px`
    }
    // eslint-disable-next-line no-param-reassign
    domNode.style.transformOrigin = `${transformOrigin.left} ${transformOrigin.top}`
  }

  const getOverlay = () => {
    const { title, overlay } = props
    if (title === 0) {
      return title
    }
    return overlay || title || ''
  }

  const {
    prefixCls: customizePrefixCls,
    openClassName,
    getPopupContainer,
    getTooltipContainer,
    overlayClassName,
    color,
    overlayInnerStyle,
    children
  } = props

  const prefixCls = customizePrefixCls || `${prefix}-tooltip`
  const rootPrefixCls = prefix

  const tempVisible = (!('visible' in props) && isNoTitle()) ? false : visible

  const child = getDisabledCompatibleChildren(
    isValidElement(children) ? children : <span>{children}</span>,
    prefixCls
  )
  const childProps = child.props
  const childCls = classnames(childProps.className, {
    [openClassName || `${prefixCls}-open`]: true
  })

  const customOverlayClassName = classnames(overlayClassName, {
    [`${prefixCls}-${color}`]: color && PresetColorRegex.test(color)
  })

  let formattedOverlayInnerStyle = overlayInnerStyle
  let arrowContentStyle
  if (color && !PresetColorRegex.test(color)) {
    formattedOverlayInnerStyle = { ...overlayInnerStyle, background: color }
    arrowContentStyle = { background: color }
  }

  return <RcTooltip
    {...props}
    prefixCls={prefixCls}
    overlayClassName={customOverlayClassName}
    getTooltipContainer={getPopupContainer || getTooltipContainer}
    ref={ref}
    builtinPlacements={getTooltipPlacements()}
    overlay={getOverlay()}
    visible={tempVisible}
    onVisibleChange={onVisibleChange}
    onPopupAlign={onPopupAlign}
    overlayInnerStyle={formattedOverlayInnerStyle}
    arrowContent={<span className={`${prefixCls}-arrow-content`} style={arrowContentStyle} />}
    motion={{
      motionName: props.transitionName || `${rootPrefixCls}-zoom-big-fast`,
      motionDeadline: 1000
    }}
  >
    {tempVisible ? cloneElement(child, { className: childCls }) : child}
  </RcTooltip>
})

Tooltip.defaultProps = {
  placement: 'top',
  mouseEnterDelay: 0.1,
  mouseLeaveDelay: 0.1,
  arrowPointAtCenter: false,
  autoAdjustOverflow: true
}

export default Tooltip
