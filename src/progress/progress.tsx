import * as React from 'react'
import { prefixCls as prefix } from '../config'
import classnames from 'classnames'
import './index.less'

export interface ProgressProps {
  /**
   * @description 进度条类型
   * @default line
   */
  type?: 'line' | 'circle';
  /**
   * @description 百分比
   */
  percentage: number;
  /**
   * @description 进度条当前状态
   */
  status?: 'success' | 'exception';
  /**
   * @description 进度条的宽度，单位 px
   * @default 6
   */
  strokeWidth?: number;
  /**
   * @description 环形进度条画布宽度
   * @default 126
   */
  width?: number;
  /**
   * @description 进度条显示文字内置在进度条内
   * @default false
   */
  textInside?: boolean;
  /**
   * @description 显示进度条文字内容
   * @default true
   */
  showText?: boolean;
  /**
   * @description 自定义样式
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

const Progress: React.FC<ProgressProps> = props => {
  const {
    showText = true,
    strokeWidth = 6,
    width = 126,
    type = 'line',
    status,
    textInside = false,
    percentage = 0,
    prefixCls = prefix
  } = props


  // 相对描边宽度
  const relativeStrokeWidth = () => {
    return (strokeWidth / width * 100).toFixed(1) as string
  }

  // 轨迹
  const trackPath = () => {
    const radius = parseInt((50 - parseFloat(relativeStrokeWidth()) / 2).toString(), 10)
    return `M 50 50 m 0 -${radius} a ${radius} ${radius} 0 1 1 0 ${radius * 2} a ${radius} ${radius} 0 1 1 0 -${radius * 2}`
  }

  // 计算周长
  const perimeter = () => {
    const radius = 50 - parseFloat(relativeStrokeWidth()) / 2
    return 2 * Math.PI * radius
  }

  const circlePathStyle = () => {
    const _perimeter = perimeter()
    return {
      strokeDasharray: `${_perimeter}px,${_perimeter}px`,
      strokeDashoffset: `${(1 - props.percentage / 100) * _perimeter}px`,
      transition: 'stroke-dashoffset 0.6s ease 0s, stroke 0.6s ease'
    }
  }

  // stroke 颜色
  const stroke = () => {
    let ret: string
    switch (props.status) {
      case 'success':
        ret = '#13ce66'
        break
      case 'exception':
        ret = '#ff4949'
        break
      default:
        ret = '#20a0ff'
    }
    return ret
  }

  // 计算 icon 样式
  const iconClass = () => type === 'line'
    ? status === 'success' ? `${prefixCls}-icon-circle-check` : `${prefixCls}-icon-circle-cross`
    : status === 'success' ? `${prefixCls}-icon-check` : `${prefixCls}-icon-close`


  // 文本尺寸
  const progressTextSize = () => type === 'line' ? 12 + strokeWidth * 0.4 : width * 0.111111 + 2


  const progress = type === 'line'
    ? <div className={`${prefixCls}-progress-bar`}>
      <div
        className={`${prefixCls}-progress-bar__outer`}
        style={{ height: `${strokeWidth}px` }}
      >
        <div
          className={`${prefixCls}-progress-bar__inner`}
          style={{ width: `${percentage}%` }}
        >
          {showText &&
          textInside &&
          <div className={`${prefixCls}-progress-bar__innerText`}>
            {`${percentage}%`}
          </div>}
        </div>
      </div>
    </div>
    : <div
      className={`${prefixCls}-progress-circle`}
      style={{ height: `${width}px`, width: `${width}px` }}
    >
      <svg viewBox='0 0 100 100'>
        <path
          className={`${prefixCls}-progress-circle__track`}
          d={trackPath()}
          stroke='#e5e9f2'
          strokeWidth={relativeStrokeWidth()}
          fill='none'
        />
        <path
          className={`${prefixCls}-progress-circle__path`}
          d={trackPath()}
          strokeLinecap='round'
          stroke={stroke()}
          strokeWidth={relativeStrokeWidth()}
          fill='none'
          style={circlePathStyle()}
        />
      </svg>
    </div>

  const progressInfo = showText && !textInside &&
    <div
      className={`${prefixCls}-progress__text`}
      style={{ fontSize: `${progressTextSize()}px` }}
    >
      {status ? <i className={iconClass()} /> : `${percentage}%`}
    </div>

  return <div
    style={props.style}
    className={classnames(`${prefixCls}-progress`, `${prefixCls}-progress--${type}`, {
      [`is-${status}`]: !!status,
      [`${prefixCls}-progress--without-text`]: !showText,
      [`${prefixCls}-progress--text-inside`]: textInside
    })}
  >
    {progress}
    {progressInfo}
  </div>
}

Progress.defaultProps = {
  type: 'line',
  percentage: 0,
  strokeWidth: 6,
  width: 126,
  showText: true,
  textInside: false
}

Progress.displayName = 'Progress'

export default Progress

