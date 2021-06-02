import * as React from 'react'
import classnames from 'classnames'
import omit from 'rc-util/lib/omit'
import ResizeObserver from 'rc-resize-observer'
import { throttleByAnimationFrameDecorator } from '../_util/throttleByAnimationFrameDecorator'
import { prefixCls as prefix } from '../config'

import {
  addObserveTarget,
  removeObserveTarget,
  getTargetRect,
  getFixedTop,
  getFixedBottom
} from './utils'

export type AffixProps = {
  /** 距离窗口顶部达到指定偏移量后触发 */
  offsetTop?: number;
  /** 距离窗口底部达到指定偏移量后触发 */
  offsetBottom?: number;
  /** 固定状态改变时触发的回调函数 */
  onChange?: (affixed?: boolean) => void;
  /** 设置 Affix 需要监听其滚动事件的元素，值为一个返回对应 DOM 元素的函数 */
  target?: () => Window | HTMLElement | null;
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  prefixCls?: string;
}

enum AffixStatus {
  None,
  Prepare,
}

export type AffixState = {
  affixStyle?: React.CSSProperties;
  placeholderStyle?: React.CSSProperties;
  status: AffixStatus;
  lastAffix: boolean;

  prevTarget: Window | HTMLElement | null;
}


function getDefaultTarget() {
  return window || null
}


export default class Affix extends React.Component<AffixProps, AffixState> {
  state: AffixState = {
    status: AffixStatus.None,
    lastAffix: false,
    prevTarget: null
  }
  private placeholderNode = React.createRef<HTMLDivElement>()

  private fixedNode = React.createRef<HTMLDivElement>()

  // 监听 target 定时器
  private timeout: number | undefined = undefined

  // 获取 target 元素
  private getTargetFunc() {
    const { target } = this.props
    if (target !== undefined) {
      return target
    }
    return getDefaultTarget
  }

  // 挂载完成
  componentDidMount() {
    const targetFunc = this.getTargetFunc()
    if (targetFunc) {
      this.timeout = window.setTimeout(() => {
        addObserveTarget(targetFunc(), this)
        this.updatePosition()
      })
    }
  }

  // 组件更新
  componentDidUpdate(prevProps: AffixProps) {
    const { prevTarget } = this.state
    const targetFunc = this.getTargetFunc()
    let newTarget = null
    if (targetFunc) {
      newTarget = targetFunc() || null
    }

    if (prevTarget !== newTarget) {
      removeObserveTarget(this)
      if (newTarget) {
        addObserveTarget(newTarget, this)
        this.updatePosition()
      }
      this.setState({ prevTarget: newTarget })
    }

    if (prevProps.offsetTop !== this.props.offsetTop || prevProps.offsetBottom !== this.props.offsetBottom) {
      this.updatePosition()
    }

    this.measure()
  }

  // 卸载组件前
  componentWillUnmount() {
    clearTimeout(this.timeout)
    removeObserveTarget(this)
    // 取消节流定时器
    ;(this.updatePosition as any).cancel()
    ;(this.lazyUpdatePosition as any).cancel()
  }

  getOffsetTop = () => {
    const { offsetBottom } = this.props
    let { offsetTop } = this.props
    if (offsetBottom === undefined && offsetTop === undefined) {
      offsetTop = 0
    }
    return offsetTop
  }

  getOffsetBottom = () => this.props.offsetBottom

  // 测量
  measure = () => {
    const { status, lastAffix } = this.state
    const { onChange } = this.props
    const targetFunc = this.getTargetFunc()
    if (status !== AffixStatus.Prepare || !this.fixedNode || !this.placeholderNode || !targetFunc) {
      return
    }

    const offsetTop = this.getOffsetTop()
    const offsetBottom = this.getOffsetBottom()

    const targetNode = targetFunc()
    if (!targetNode) {
      return
    }

    const newState: Partial<AffixState> = {
      status: AffixStatus.None
    }
    const targetRect = getTargetRect(targetNode)
    const placeholderReact = getTargetRect(this.placeholderNode.current)
    const fixedTop = getFixedTop(placeholderReact, targetRect, offsetTop)
    const fixedBottom = getFixedBottom(placeholderReact, targetRect, offsetBottom)

    if (fixedTop !== undefined) {
      newState.affixStyle = {
        position: 'fixed',
        top: fixedTop,
        width: placeholderReact.width,
        height: placeholderReact.height
      }
      newState.placeholderStyle = {
        width: placeholderReact.width,
        height: placeholderReact.height
      }
    } else if (fixedBottom !== undefined) {
      newState.affixStyle = {
        position: 'fixed',
        bottom: fixedBottom,
        width: placeholderReact.width,
        height: placeholderReact.height
      }
      newState.placeholderStyle = {
        width: placeholderReact.width,
        height: placeholderReact.height
      }
    }

    newState.lastAffix = !!newState.affixStyle
    if (onChange && lastAffix !== newState.lastAffix) {
      onChange(newState.lastAffix)
    }

    this.setState(newState as AffixState)
  }

  // 测量准备
  prepareMeasure = () => {
    this.setState({
      status: AffixStatus.Prepare,
      affixStyle: undefined,
      placeholderStyle: undefined
    })
  }

  // 更新元素位置
  @throttleByAnimationFrameDecorator()
  updatePosition() {
    this.prepareMeasure()
  }

  @throttleByAnimationFrameDecorator()
  lazyUpdatePosition() {
    const targetFunc = this.getTargetFunc()
    const { affixStyle } = this.state

    if (targetFunc && affixStyle) {
      const offsetTop = this.getOffsetTop()
      const offsetBottom = this.getOffsetBottom()

      const targetNode = targetFunc()
      if (targetNode && this.placeholderNode) {
        const targetRect = getTargetRect(targetNode)
        const placeholderReact = getTargetRect(this.placeholderNode.current)
        const fixedTop = getFixedTop(placeholderReact, targetRect, offsetTop)
        const fixedBottom = getFixedBottom(placeholderReact, targetRect, offsetBottom)

        if (
          (fixedTop !== undefined && affixStyle.top === fixedTop) ||
          (fixedBottom !== undefined && affixStyle.bottom === fixedBottom)
        ) {
          return
        }
      }
    }
    this.prepareMeasure()
  }

  render() {
    const { affixStyle, placeholderStyle } = this.state
    const { children, prefixCls = prefix } = this.props
    const className = classnames({ [`${prefixCls}-affix`]: affixStyle })

    // 挑选 props 属性
    const props = omit(this.props, ['offsetTop', 'offsetBottom', 'target', 'onChange'])

    return <ResizeObserver onResize={() => {this.updatePosition()}}>
      <div {...props} ref={this.placeholderNode}>
        {affixStyle && <div style={placeholderStyle} aria-hidden='true' />}
        <div className={className} ref={this.fixedNode} style={affixStyle}>
          <ResizeObserver onResize={() => {this.updatePosition()}}>
            {children}
          </ResizeObserver>
        </div>
      </div>
    </ResizeObserver>
  }
}
