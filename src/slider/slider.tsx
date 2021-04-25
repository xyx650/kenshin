import * as React from 'react'
import Component from '@/_base/component'
import classnames from 'classnames'
import type { BaseComponentType } from '@/_base/component'
import { classNames, className, style } from '@/_base/component'
import SliderButton from '@/slider/sliderButton'
import {SliderContext} from '@/slider/sliderContext'
import './index.less'

export type SliderState = {
  // 范围第一个值
  firstValue: number
  // 范围第二个值
  secondValue: number
  oldValue: number | number[]
  //  精度
  precision: number
  inputValue: number | number[]
  // 拖拽状态
  dragging: boolean
}

export type SliderProps = {
  // 最小值
  min: number | string
  // 最大值
  max: number | string
  // 步长
  step: number | string
  // 绑定值
  value: number | number[]
  // 是否显示输入框
  showInput: boolean
  // 是否显示输入框的控制按钮
  showInputControls: boolean
  // 是否显示提示框
  showTooltip: boolean
  // 是否显示间断点
  showStops: boolean
  // 是否禁用
  disabled: boolean
  // 是否为范围选择
  range: boolean
  // 竖向模式
  vertical: boolean
  // 竖向模式指定高度
  height: string
  // 提示框格式化
  formatTooltip: () => void
  // 值改变时回调
  onChange: (val: number | number[]) => void
}

export default class Slider extends Component<SliderProps, SliderState> {
  static defaultProps = {
    showTooltip: true,
    showInputControls: true,
    min: 0,
    max: 100,
    step: 1,
    value: 0
  }

  private slider = React.createRef<HTMLDivElement>()
  private button1 = React.createRef<SliderButton>()
  private button2 = React.createRef<SliderButton>()

  constructor(props: SliderProps) {
    super(props)

    this.state = {
      firstValue: 0,
      secondValue: 0,
      oldValue: 0,
      precision: 0,
      inputValue: 0,
      dragging: false
    }
  }

  get initValue() {
    const { value, min, max } = this.props
    return (typeof value !== 'number' || isNaN(value))
      ? +min
      : Math.min(+max, Math.max(+min, value))
  }

  valueChanged() {
    const { range } = this.props
    const { firstValue, oldValue } = this.state
    if (range && Array.isArray(oldValue)) {
      return ![this.minValue(), this.maxValue()].every((item, index) => item === oldValue[index])
    } else {
      return firstValue !== oldValue
    }
  }

  setValues() {
    const { range, value, min, max } = this.props
    let { firstValue, secondValue, oldValue, inputValue } = this.state

    if (range && Array.isArray(value)) {
      if (value[1] < min) {
        inputValue = [+min, +min]
      } else if (value[0] > max) {
        inputValue = [+max, +max]
      } else if (value[0] < min) {
        inputValue = [+min, value[1]]
      } else if (value[1] > max) {
        inputValue = [value[0], +max]
      } else {
        firstValue = value[0]
        secondValue = value[1]

        if (this.valueChanged()) {
          this.onValueChanged([this.minValue(), this.maxValue()])
          oldValue = value.slice()
        }
      }
    } else if (!range && typeof value === 'number' && !isNaN(value)) {
      if (this.initValue < min) {
        inputValue = +min
      } else if (this.initValue > max) {
        inputValue = +max
      } else {
        inputValue = firstValue

        this.setState({ firstValue }, () => {
          if (this.valueChanged()) {
            this.onValueChanged(firstValue)
            this.setState({ oldValue: firstValue })
          }
        })
      }
    }

    this.setState({ firstValue, secondValue, inputValue })
  }

  setPosition(percent: number) {
    const { range, min, max } = this.props
    const { firstValue, secondValue } = this.state

    const targetValue = +min + percent * (+max - +min) / 100

    if (!range) {
      this.button1.current!.setPosition(percent)
      return
    }

    let button: 'button1' | 'button2'

    if (Math.abs(this.minValue() - targetValue) < Math.abs(this.maxValue() - targetValue)) {
      button = firstValue < secondValue ? 'button1' : 'button2'
    } else {
      button = firstValue > secondValue ? 'button1' : 'button2'
    }

    this[button].current!.setPosition(percent)
  }


  onSliderClick(e: React.MouseEvent<HTMLDivElement>): void {
    const { disabled, dragging, vertical } = this.props
    if (disabled || dragging) return

    if (vertical) {
      const sliderOffsetBottom = this.slider.current!.getBoundingClientRect().bottom
      this.setPosition((sliderOffsetBottom - e.clientY) / this.sliderSize() * 100)
    } else {
      const sliderOffsetLeft = this.slider.current!.getBoundingClientRect().left
      this.setPosition((e.clientX - sliderOffsetLeft) / this.sliderSize() * 100)
    }

    this.setValues()
  }

  onValueChanged(val: number | number[]) {
    const { onChange } = this.props
    onChange?.(val)
  }

  onInputValueChanged(e: number) {
    this.setState({
      inputValue: e || 0,
      firstValue: e || 0
    }, () => {
      this.setValues()
    })
  }

  onFirstValueChange(value: number) {
    const { firstValue } = this.state
    if (firstValue !== value) {
      this.setState({ firstValue: value }, () => this.setValues())
    }
  }

  onSecondValueChange(value: number) {
    const { secondValue } = this.state
    if (secondValue !== value) {
      this.setState({ secondValue: value }, () => this.setValues())
    }
  }


  sliderSize() {
    const { vertical } = this.props
    return parseInt(vertical
      ? this.slider.current!.offsetHeight.toString()
      : this.slider.current!.offsetWidth.toString(), 10
    )
  }

  stops() {
    const { range, min, max, step } = this.props
    const { firstValue } = this.state

    const stopCount = (+max - +min) / +step
    const stepWidth = 100 * +step / (+max - +min)
    const result = []

    for (let i = 1; i < stopCount; i++) {
      result.push(i * stepWidth)
    }

    if (range) {
      return result.filter(step => {
        return step < 100 * (this.minValue() - +min) / (+max - +min) ||
          step > 100 * (this.maxValue() - +min) / (+max - +min)
      })
    } else {
      return result.filter(step => step > 100 * (firstValue - +min) / (+max - +min))
    }
  }

  minValue() {
    const { firstValue, secondValue } = this.state
    return Math.min(firstValue, secondValue)
  }

  maxValue() {
    const { firstValue, secondValue } = this.state
    return Math.max(firstValue, secondValue)
  }

  runwayStyle() {
    const { vertical, height } = this.props
    return vertical ? { height } : {}
  }

  barStyle() {
    const { vertical } = this.props
    return vertical
      ? { height: this.barSize(), bottom: this.barStart() }
      : { width: this.barSize(), left: this.barStart() }
  }

  barSize() {
    const { firstValue } = this.state
    const { range, max, min } = this.props
    return range
      ? `${100 * (this.maxValue() - this.minValue()) / (+max - +min)}%`
      : `${100 * (firstValue - +min) / (+max - +min)}%`
  }

  barStart() {
    const { range, max, min } = this.props
    return range
      ? `${100 * (this.minValue() - +min) / (+max - +min)}%`
      : '0%'
  }


  render() {

    console.log(this.context)
    const { vertical, showInput, showStops, showInputControls, range, step, disabled, min, max } = this.props
    const { inputValue, firstValue, secondValue } = this.state

    return (
      <div className={this.className('kenshin-slider', {
        'is-vertical': vertical,
        'kenshin-slider--with-input': showInput
      })}>
        {
          // showInput && !range && (
          //   <InputNumber
          //     ref='input'
          //     className='kenshin-slider__input'
          //     defaultValue={inputValue}
          //     value={firstValue}
          //     step={step}
          //     disabled={disabled}
          //     controls={showInputControls}
          //     min={min}
          //     max={max}
          //     size='small'
          //     onChange={this.onInputValueChanged.bind(this)}
          //   />
          // )
        }
        <div
          ref={this.slider}
          style={this.runwayStyle()}
          className={this.classNames('kenshin-slider__runway', {
            'show-input': showInput,
            'disabled': disabled
          })}
          onClick={e => this.onSliderClick(e)}
        >
          <div
            className='kenshin-slider__bar'
            style={this.barStyle()}>
          </div>
          <SliderContext.Provider value={{ props: this.props }}>
            <SliderButton
              ref={this.button1}
              vertical={vertical}
              value={firstValue}
              onChange={e => this.onFirstValueChange(e)}
            />
            {
              range && <SliderButton
                ref={this.button2}
                vertical={vertical}
                value={secondValue}
                onChange={e => this.onSecondValueChange(e)}
              />
            }
          </SliderContext.Provider>


          {
            showStops && this.stops().map((item, index) => <div
              key={index}
              className='kenshin-slider__stop'
              style={vertical ? { bottom: item + '%' } : { left: item + '%' }}
            />)
          }
        </div>
      </div>
    )
  }
}

