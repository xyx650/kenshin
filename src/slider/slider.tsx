import * as React from 'react'
import RcSlider, { Range as RcRange, Handle as RcHandle, SliderTooltip } from 'rc-slider'
import classnames from 'classnames'
import { prefixCls as prefix } from '../config'
import 'rc-slider/assets/index.css'
import './slider.less'

// Slider 基础属性
export interface SliderBaseProps {
  reverse?: boolean;
  min?: number;
  max?: number;
  step?: null | number;
  dots?: boolean;
  included?: boolean;
  disabled?: boolean;
  vertical?: boolean;
  tipFormatter?: null | ((value?: number) => React.ReactNode);
  className?: string;
  id?: string;
  style?: React.CSSProperties;
  tooltipVisible?: boolean;
  // tooltipPlacement?: TooltipPlacement;
  getTooltipPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  autoFocus?: boolean;
}

// 单个属性
export interface SliderSingleProps extends SliderBaseProps {
  range?: false;
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  onAfterChange?: (value: number) => void;
  handleStyle?: React.CSSProperties;
  trackStyle?: React.CSSProperties;
  prefixCls?: string;
}

// 范围选择属性
export interface SliderRangeProps extends SliderBaseProps {
  range: true | { draggableTrack?: boolean };
  value?: [number, number];
  defaultValue?: [number, number];
  onChange?: (value: number[]) => void;
  onAfterChange?: (value: number[]) => void;
  handleStyle?: React.CSSProperties[];
  trackStyle?: React.CSSProperties[];
  prefixCls?: string;
}

interface HandleGeneratorInfo {
  value?: number;
  dragging?: boolean;
  index: number;
}

export type HandleGeneratorFn = (config: { info: HandleGeneratorInfo }) => React.ReactElement;


export type Visibles = Record<number, boolean>;

const Slider = React.forwardRef <unknown, SliderSingleProps | SliderRangeProps>((props, ref: any) => {
  const {
    range,
    className,
    prefixCls = `${prefix}-slider`,
    ...restProps
  } = props
  const [visibles, setVisibles] = React.useState<Visibles>({})

  // 切换 Tooltip显示
  const toggleTooltipVisible = (index: number, visible: boolean) => {
    setVisibles((prev: Visibles) => ({ ...prev, [index]: visible }))
  }

  const handleWithTooltip: HandleGeneratorFn = ({
    info: {
      value,
      dragging,
      index,
      ...restProps
    }
  }) => {
    const {
      tipFormatter = (value?: number) => typeof value === 'number' ? value.toString() : '',
      tooltipVisible,
      getTooltipPopupContainer,
      vertical
    } = props
    const isTipFormatter = tipFormatter ? visibles[index] || dragging : false
    const visible = tooltipVisible || (tooltipVisible === undefined && isTipFormatter)

    return <SliderTooltip
      overlay={tipFormatter ? tipFormatter(value) : ''}
      visible={visible}
      placement='top'
      key={index}
      overlayClassName={`${prefix}-tooltip`}
      getTooltipContainer={getTooltipPopupContainer}
    >
      <RcHandle
        {...restProps}
        value={value}
        onMouseEnter={() => toggleTooltipVisible(index, true)}
        onMouseLeave={() => toggleTooltipVisible(index, false)}
      />
    </SliderTooltip>
  }


  const cls = classnames(className)

  const draggableTrack = typeof range === 'object' ? range.draggableTrack : undefined

  // 返回范围选择
  if (range) {
    return <RcRange
      {...(restProps as SliderRangeProps)}
      step={restProps.step!}
      prefixCls={prefixCls}
      draggableTrack={draggableTrack}
      className={cls}
      ref={ref}
      handle={(info: HandleGeneratorInfo) => handleWithTooltip({ info })}
    />
  }

  // 返回普通 Slider
  return <RcSlider
    {...(restProps as SliderSingleProps)}
    step={restProps.step!}
    prefixCls={prefixCls}
    className={cls}
    ref={ref}
    handle={(info: HandleGeneratorInfo) => handleWithTooltip({ info })}
  />


})

Slider.defaultProps = {
  tipFormatter: (value?: number) => typeof value === 'number' ? value.toString() : ''
}

Slider.displayName = 'Slider'

export default Slider
