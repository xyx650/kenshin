import * as React from 'react'
import Component from '@/_base/component'
import './index.less'

// svg 路径接口类型
export type PathStyle = {
  // 它是一个<length>和<percentage>数列，数与数之间用逗号或者空白隔开，指定短划线和缺口的长度
  strokeDasharray: string
  // dash模式到路径开始的距离
  strokeDashoffset: string
  transition: string
}

export type ProgressProps = {
  // 	进度条类型
  type: 'line' | 'circle'
  // 百分比
  percentage: number
  // 进度条当前状态
  status: string
  // 进度条的宽度，单位 px
  strokeWidth: number
  // 环形进度条画布宽度
  width: number
  // 进度条显示文字内置在进度条内
  textInside: number
  // 显示进度条文字内容
  showText: number
}

export default class Progress extends Component<ProgressProps> {
  static defaultProps = {
    type: 'line',
    percentage: 0,
    strokeWidth: 6,
    width: 126,
    showText: true,
    textInside: false
  }

  constructor(props: ProgressProps) {
    super(props)
  }

  // 相对描边宽度
  relativeStrokeWidth() {
    const { strokeWidth, width } = this.props
    return (strokeWidth / width * 100).toFixed(1)
  }

  // 轨迹
  trackPath() {
    const radius = parseInt((50 - parseFloat(this.relativeStrokeWidth()) / 2).toString(), 10)
    return `M 50 50 m 0 -${radius} a ${radius} ${radius} 0 1 1 0 ${radius * 2} a ${radius} ${radius} 0 1 1 0 -${radius * 2}`
  }

  // 计算周长
  perimeter() {
    const radius = 50 - parseFloat(this.relativeStrokeWidth()) / 2
    return 2 * Math.PI * radius
  }

  circlePathStyle(): PathStyle {
    const perimeter = this.perimeter()
    return {
      strokeDasharray: `${perimeter}px,${perimeter}px`,
      strokeDashoffset: (1 - this.props.percentage / 100) * perimeter + 'px',
      transition: 'stroke-dashoffset 0.6s ease 0s, stroke 0.6s ease'
    }
  }

  // stroke 颜色
  stroke() {
    let ret
    switch (this.props.status) {
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
  iconClass() {
    const { type, status } = this.props
    return type === 'line'
      ? status === 'success' ? 'kenshin-icon-circle-check' : 'kenshin-icon-circle-cross'
      : status === 'success' ? 'kenshin-icon-check' : 'kenshin-icon-close'
  }

  // 文本尺寸
  progressTextSize() {
    const { type, strokeWidth, width } = this.props
    return type === 'line' ? 12 + strokeWidth * 0.4 : width * 0.111111 + 2
  }


  render() {
    const {
      type,
      percentage,
      status,
      strokeWidth,
      textInside,
      width,
      showText
    } = this.props

    const progress = type === 'line'
      ? <div className='kenshin-progress-bar'>
        <div
          className='kenshin-progress-bar__outer'
          style={{ height: `${strokeWidth}px` }}
        >
          <div
            className='kenshin-progress-bar__inner'
            style={{ width: `${percentage}%` }}
          >
            {showText &&
            textInside &&
            <div className='kenshin-progress-bar__innerText'>
              {`${percentage}%`}
            </div>}
          </div>
        </div>
      </div>
      : <div
        className='kenshin-progress-circle'
        style={{ height: `${width}px`, width: `${width}px` }}
      >
        <svg viewBox='0 0 100 100'>
          <path
            className='kenshin-progress-circle__track'
            d={this.trackPath()}
            stroke='#e5e9f2'
            strokeWidth={this.relativeStrokeWidth()}
            fill='none'
          />
          <path
            className='kenshin-progress-circle__path'
            d={this.trackPath()}
            strokeLinecap='round'
            stroke={this.stroke()}
            strokeWidth={this.relativeStrokeWidth()}
            fill='none'
            style={this.circlePathStyle()}
          />
        </svg>
      </div>

    const progressInfo = showText &&
      !textInside &&
      <div
        className='kenshin-progress__text'
        style={{ fontSize: `${this.progressTextSize()}px` }}
      >
        {status ? <i className={this.iconClass()} /> : `${percentage}%`}
      </div>
    return (
      <div
        style={this.style()}
        className={this.className('kenshin-progress', `kenshin-progress--${type}`, {
          [`is-${status}`]: !!status,
          'kenshin-progress--without-text': !showText,
          'kenshin-progress--text-inside': textInside
        })}
      >
        {progress}
        {progressInfo}
      </div>
    )
  }

}
