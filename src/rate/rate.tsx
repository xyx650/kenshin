import * as React from 'react'
import classnames from 'classnames'
import type { BaseComponentType } from '@/_base/component'
import { classNames, className, style } from '@/_base/component'
import './index.less'

type classMap = {
  lowClass: string;
  mediumClass: string;
  highClass: string;
  voidClass: string;
  disabledVoidClass: string
}

type colorMap = {
  lowColor: string;
  mediumColor: string;
  highColor: string;
  voidColor: string;
  disabledVoidColor: string
}

export type rateState = {
  pointerAtLeftHalf: boolean;
  currentValue: number;
  hoverIndex: number;
  value: number
}


export type rateProps = {
  /**
   * @description       icon 的颜色数组，共有 3 个元素，为 3 个分段所对应的颜色
   */
  colors: [string, string, string];
  /**
   * @description       辅助文字数组
   */
  texts: [string, string, string, string, string];
  /**
   * @description       是否显示文字
   */
  showText: boolean;
  textColor: string;
  disabled: boolean;
  value: number;
  textTemplate: string;
  lowThreshold: number;
  highThreshold: number;
  max: number;
  voidColor: string;
  disabledVoidColor: string;
  iconClasses: [string, string, string];
  voidIconClass: string;
  disabledVoidIconClass: string;
  allowHalf: boolean;
  onChange?: (value: number) => void;
  style?: BaseComponentType['style'];
  className?: BaseComponentType['className'];
}

export default class Rate extends React.Component<rateProps, rateState> {
  static defaultProps: rateProps
  classMap: classMap
  colorMap: colorMap

  constructor(props: rateProps) {
    super(props)
    this.state = {
      pointerAtLeftHalf: false,
      currentValue: this.props.value! - 1,
      hoverIndex: -1,
      value: -1
    }
    const {
      iconClasses,
      voidIconClass,
      disabledVoidIconClass,
      colors,
      voidColor,
      disabledVoidColor
    } = this.props

    this.classMap = {
      lowClass: iconClasses![0],
      mediumClass: iconClasses![1],
      highClass: iconClasses![2],
      voidClass: voidIconClass!,
      disabledVoidClass: disabledVoidIconClass!
    }

    this.colorMap = {
      lowColor: colors![0],
      mediumColor: colors![1],
      highColor: colors![2],
      voidColor: voidColor!,
      disabledVoidColor: disabledVoidColor!
    }
  }

  // 更新 state
  static getDerivedStateFromProps(nextProps: rateProps, curState: rateState) {
    return nextProps.value && nextProps.value !== curState.value ? {
      ...curState,
      value: nextProps.value
    } : null
  }

  hasClass(target: Element, classname: string) {
    return target.classList.contains(classname)
  }

  // 设置当前值
  setCurrentValue(e: any, value: number) {
    const { disabled, allowHalf } = this.props
    // const { pointerAtLeftHalf, currentValue, hoverIndex } = this.state
    if (disabled) {
      return
    }
    if (allowHalf) {
      e.persist()
      let target = e.target
      if (this.hasClass(target, 'el-rate__item')) {
        target = target.querySelector('.el-rate__icon')
      }
      if (this.hasClass(target, 'el-rate__decimal')) {
        target = target.parentNode
      }
      this.setState({
        pointerAtLeftHalf: (e.clientX - target.getBoundingClientRect().left) * 2 <= target.clientWidth,
        currentValue: ((e.clientX - target.getBoundingClientRect().left) * 2 <= target.clientWidth) ? value - 0.5 : value
      })
    } else {
      this.setState({
        currentValue: value
      })
    }
    this.setState({
      hoverIndex: value
    })
  }

  getValueFromMap(value: number, map: classMap | colorMap): string {
    const { lowThreshold, highThreshold } = this.props
    let result: string
    if (value <= lowThreshold! - 1) {
      result = 'lowColor' in map ? map.lowColor : map.lowClass
    } else if (value >= highThreshold! - 1) {
      result = 'highColor' in map ? map.highColor : map.highClass
    } else {
      result = 'mediumColor' in map ? map.mediumColor : map.mediumClass
    }
    return result
  }

  getIconStyle(item: number): { color: string } {
    const { disabled } = this.props
    const { currentValue } = this.state
    const voidColor = disabled
      ? this.colorMap.disabledVoidColor
      : this.colorMap.voidColor
    return {
      color: item <= currentValue ? this.activeColor() : voidColor
    }
  }

  // 小数值情况
  showDecimalIcon(item: number): boolean {
    const { disabled, allowHalf, value } = this.props
    const { pointerAtLeftHalf, currentValue } = this.state
    const showWhenDisabled = disabled &&
      this.valueDecimal() > 0 &&
      item - 1 < value! - 1 &&
      item > value! - 1
    const showWhenAllowHalf = allowHalf &&
      pointerAtLeftHalf &&
      (item - 0.5).toFixed(1) === currentValue.toFixed(1)
    return showWhenDisabled || showWhenAllowHalf
  }

  classes(): string[] {
    const { currentValue } = this.state
    const { max } = this.props
    const result = []
    let i = 0
    // const threshold = currentValue
    // if (allowHalf && currentValue !== Math.floor(currentValue)) {
    //   threshold
    // }
    for (; i <= currentValue; i++) {
      result.push(this.activeClass())
    }
    for (; i < max!; i++) {
      result.push(this.voidClass())
    }
    return result
  }

  valueDecimal(): number {
    const { value } = this.props
    return value! * 100 - Math.floor(value!) * 100
  }

  decimalIconClass(): string {
    return this.getValueFromMap(this.props.value!, this.classMap)
  }

  voidClass(): string {
    return this.props.disabled
      ? this.classMap.disabledVoidClass
      : this.classMap.voidClass
  }

  activeClass(): string {
    return this.getValueFromMap(this.state.currentValue, this.classMap)
  }

  activeColor(): string {
    return this.getValueFromMap(this.state.currentValue, this.colorMap)
  }

  selectValue(value: number): void {
    const { disabled, allowHalf, onChange } = this.props
    const { pointerAtLeftHalf, currentValue } = this.state
    if (disabled) {
      return
    }
    (allowHalf && pointerAtLeftHalf) ?
      this.setState({ value: currentValue }, () => onChange?.(currentValue + 1)) :
      this.setState({ currentValue: value, value }, () => onChange?.(currentValue + 1))
  }

  decimalStyle(): { color: string, width: string } {
    const { disabled, allowHalf } = this.props
    let width = ''
    if (disabled) {
      width = `${this.valueDecimal() < 50 ? 0 : 50}%`
    }
    if (allowHalf) {
      width = '50%'
    }
    return {
      color: this.activeColor(),
      width
    }
  }

  showText(): string {
    const { disabled, texts, textTemplate, value } = this.props
    const { currentValue } = this.state
    let result: string
    if (disabled) {
      result = textTemplate!.replace(/{\s*value\s*}/, value! + '')
    } else {
      result = texts![Math.ceil(currentValue)]
    }
    return result
  }

  // 重置
  resetCurrentValue() {
    const { disabled, allowHalf } = this.props
    const { value } = this.state
    if (disabled) {
      return
    }
    allowHalf && this.setState({
      pointerAtLeftHalf: value !== Math.floor(value)
    })
    this.setState({
      currentValue: value,
      hoverIndex: -1
    })
  }

  style = style
  className = className
  classNames = classNames
  // className(...args: string[]) {
  //   const { className } = this.props
  //   return this.classNames.apply(this, args.concat([className!]))
  // }

  // style(args: rateProps['style'] = {}) {
  //   const { style } = this.props
  //   return Object.assign({}, args, style)
  // }


  render() {
    const { showText, textColor, disabled, max } = this.props
    const { hoverIndex } = this.state

    return <div style={this.style()} className={this.className('kenshin-rate')}>
      {
        [...Array(max)].map((_, i) => (
          <span
            className='kenshin-rate__item'
            style={{ cursor: disabled ? 'auto' : 'pointer' }}
            onClick={() => this.selectValue(i)}
            onMouseMove={(e) => this.setCurrentValue(e, i)}
            onMouseLeave={() => this.resetCurrentValue()}
            key={i}
          >
            <i
              style={this.getIconStyle(i)}
              className={hoverIndex === i
                ? `hover kenshin-rate__icon ${this.classes()[i]}`
                : `kenshin-rate__icon ${this.classes()[i]}`}
            >
              {
                this.showDecimalIcon(i) ?
                  <i style={this.decimalStyle()} className={`kenshin-rate__decimal ${this.decimalIconClass()}`} /> :
                  null
              }
            </i>
          </span>
        ))
      }
      {
        showText ?
          <span className='kenshin-rate__text' style={{ color: textColor }}>
            {this.showText()}
          </span> :
          null
      }
    </div>
  }
}

Rate.defaultProps = {
  colors: ['#F7BA2A', '#F7BA2A', '#F7BA2A'], // icon 的颜色数组，共有 3 个元素，为 3 个分段所对应的颜色
  texts: ['极差', '失望', '一般', '满意', '惊喜'], // 辅助文字数组
  showText: false, // 是否显示辅助文字
  textColor: '#1F2D3D', //   辅助文字的颜色
  disabled: false, // 是否为只读
  value: 0, // 星级
  lowThreshold: 2, // 低分和中等分数的界限值，值本身被划分在低分中
  highThreshold: 4, // 高分和中等分数的界限值，值本身被划分在高分中
  max: 5,
  voidColor: '#C6D1DE',
  disabledVoidColor: '#EFF2F7',
  iconClasses: ['kenshin-icon-star-on', 'kenshin-icon-star-on', 'kenshin-icon-star-on'],
  voidIconClass: 'kenshin-icon-star-off',
  disabledVoidIconClass: 'kenshin-icon-star-on',
  allowHalf: false,
  textTemplate: '{value}'
}

