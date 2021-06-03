import * as React from 'react'
import classnames from 'classnames'
import { prefixCls as prefix } from '../config'
import './index.less'

type classMap = {
  lowClass: string,
  mediumClass: string,
  highClass: string,
  voidClass: string,
  disabledVoidClass: string
}

type colorMap = {
  lowColor: string,
  mediumColor: string,
  highColor: string,
  voidColor: string,
  disabledVoidColor: string
}


export interface RateProps {
  /**
   * @description       icon 的颜色数组，共有 3 个元素，为 3 个分段所对应的颜色
   */
  colors?: [string, string, string];
  /**
   * @description       辅助文字数组
   */
  texts?: [string, string, string, string, string];
  /**
   * @description       是否显示文字
   */
  showText?: boolean;
  textColor?: string;
  disabled?: boolean;
  value: number;
  textTemplate?: string;
  lowThreshold?: number;
  highThreshold?: number;
  max?: number;
  voidColor: string;
  disabledVoidColor: string;
  iconClasses: [string, string, string];
  voidIconClass: string;
  disabledVoidIconClass: string;
  allowHalf: boolean;
  onChange?: (value: number) => void;
  style?: React.CSSProperties;
  className?: string;
  prefixCls?: string;
}


const Rate: React.FC<RateProps> = props => {

  const [pointerAtLeftHalf, setPointerAtLeftHalf] = React.useState(false)
  const [currentValue, setCurrentValue] = React.useState((props.value ?? 0) - 1)
  const [hoverIndex, setHoverIndex] = React.useState(-1)
  const [value, setValue] = React.useState(-1)

  React.useEffect(() => {
    props.value && setValue(props.value)
  }, [props.value])

  const {
    colors = ['#F7BA2A', '#F7BA2A', '#F7BA2A'],
    voidColor = '#C6D1DE',
    disabledVoidColor = '#EFF2F7',
    max = 5,
    textColor = '#1F2D3D',
    disabled = false,
    prefixCls = prefix
  } = props

  const {
    iconClasses = [`${prefixCls}-icon-star-on`, `${prefixCls}-icon-star-on`, `${prefixCls}-icon-star-on`],
    voidIconClass = `${prefixCls}-icon-star-off`,
    disabledVoidIconClass = `${prefixCls}-icon-star-on`
  } = props

  const classMap: classMap = {
    lowClass: iconClasses[0],
    mediumClass: iconClasses[1],
    highClass: iconClasses[2],
    voidClass: voidIconClass,
    disabledVoidClass: disabledVoidIconClass
  }

  const colorMap: colorMap = {
    lowColor: colors[0],
    mediumColor: colors[1],
    highColor: colors[2],
    voidColor,
    disabledVoidColor
  }

  const hasClass = (target: HTMLElement, classname: string) => target.classList.contains(classname)

  // 设置当前值
  const setCurrentVal = (e: React.MouseEvent<HTMLElement, MouseEvent>, v: number) => {
    const { disabled, allowHalf } = props

    if (disabled) {
      return
    }
    if (allowHalf) {
      e.persist()
      let target: HTMLSpanElement = e.target as HTMLElement
      if (hasClass(target, `${prefixCls}-rate__item`)) {
        target = target.querySelector(`.${prefixCls}-rate__icon`)!
      }
      if (hasClass(target, `${prefixCls}-rate__decimal`)) {
        target = target.parentNode as HTMLElement
      }

      setPointerAtLeftHalf((e.clientX - target.getBoundingClientRect().left) * 2 <= target.clientWidth)
      setCurrentValue(((e.clientX - target.getBoundingClientRect().left) * 2 <= target.clientWidth) ? v - 0.5 : v)
    } else {
      setCurrentValue(v)
    }
    setHoverIndex(v)
  }

  const getValueFromMap = (value: number, map: classMap | colorMap) => {
    const { lowThreshold = 2, highThreshold = 4 } = props
    let result: string
    if (value <= lowThreshold - 1) {
      result = 'lowColor' in map ? map.lowColor : map.lowClass
    } else if (value >= highThreshold - 1) {
      result = 'highColor' in map ? map.highColor : map.highClass
    } else {
      result = 'mediumColor' in map ? map.mediumColor : map.mediumClass
    }
    return result
  }


  const getIconStyle = (item: number): { color: string } => {
    const { disabled } = props
    const voidColor = disabled
      ? colorMap.disabledVoidColor
      : colorMap.voidColor
    return {
      color: item <= currentValue ? activeColor() : voidColor
    }
  }

  // 小数值情况
  const showDecimalIcon = (item: number) => {
    const { disabled, allowHalf, value } = props
    const showWhenDisabled = disabled &&
      valueDecimal() > 0 &&
      item - 1 < value! - 1 &&
      item > value! - 1
    const showWhenAllowHalf = allowHalf &&
      pointerAtLeftHalf &&
      (item - 0.5).toFixed(1) === currentValue.toFixed(1)
    return showWhenDisabled || showWhenAllowHalf
  }


  const classes = () => {
    const { max = 5 } = props
    const result = [] as string[]
    let i = 0
    // eslint-disable-next-line no-plusplus
    for (; i <= currentValue; i++) {
      result.push(activeClass())
    }
    // eslint-disable-next-line no-plusplus
    for (; i < max; i++) {
      result.push(voidClass())
    }
    return result
  }

  const valueDecimal = () => props.value! * 100 - Math.floor(props.value!) * 100

  const decimalIconClass = () => getValueFromMap(props.value!, classMap)

  const voidClass = () => props.disabled
    ? classMap.disabledVoidClass
    : classMap.voidClass


  const activeClass = () => getValueFromMap(currentValue, classMap)

  const activeColor = () => getValueFromMap(currentValue, colorMap)

  const selectValue = (value: number) => {
    const { disabled, allowHalf, onChange } = props
    if (disabled) {
      return
    }
    if (allowHalf && pointerAtLeftHalf) {
      setValue(currentValue)
    } else {
      setCurrentValue(value)
      setValue(value)
    }
    onChange?.(currentValue + 1)
  }

  const decimalStyle = () => {
    const { disabled, allowHalf } = props
    let width = ''
    if (disabled) {
      width = `${valueDecimal() < 50 ? 0 : 50}%`
    }
    if (allowHalf) {
      width = '50%'
    }
    return {
      color: activeColor(),
      width
    }
  }

  const showText = () => {
    const { disabled, texts, textTemplate = '{value}', value } = props
    let result: string
    if (disabled) {
      result = textTemplate.replace(/{\s*value\s*}/, `${value}`)
    } else {
      result = texts![Math.ceil(currentValue)]
    }
    return result
  }


  // 重置
  const resetCurrentValue = () => {
    const { disabled, allowHalf } = props
    if (disabled) {
      return
    }
    allowHalf && setPointerAtLeftHalf(value !== Math.floor(value))
    setCurrentValue(value)
    setHoverIndex(-1)
  }

  return <div style={props.style} className={classnames(`${prefixCls}-rate`, props.className)}>
    {
      [...Array(max)].map((_, i) => (
        <span
          className={classnames(`${prefixCls}-rate__item`)}
          style={{ cursor: disabled ? 'auto' : 'pointer' }}
          onClick={() => selectValue(i)}
          onMouseMove={(e) => setCurrentVal(e, i)}
          onMouseLeave={() => resetCurrentValue()}
          key={i.toString()}
        >
            <i
              style={getIconStyle(i)}
              className={hoverIndex === i
                ? `hover ${prefixCls}-rate__icon ${classes()[i]}`
                : `${prefixCls}-rate__icon ${classes()[i]}`}
            >
              {
                showDecimalIcon(i) &&
                <i style={decimalStyle()} className={`${prefixCls}-rate__decimal ${decimalIconClass()}`} />
              }
            </i>
          </span>
      ))
    }
    {
      props.showText &&
      <span className={classnames(`${prefixCls}-rate__text`)} style={{ color: textColor }}>
        {showText()}
      </span>
    }
  </div>
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
  iconClasses: [`${prefix}-icon-star-on`, `${prefix}-icon-star-on`, `${prefix}-icon-star-on`],
  voidIconClass: `${prefix}-icon-star-off`,
  disabledVoidIconClass: `${prefix}-icon-star-on`,
  allowHalf: false,
  textTemplate: '{value}'
}

export default Rate
