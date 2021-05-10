import * as React from 'react'
import RcSlider, { Range as RcRange, Handle as RcHandle, SliderTooltip } from 'rc-slider'
import classnames from 'classnames'
import 'rc-slider/assets/index.css'
import './slider.less'

// Slider 基础属性
export interface SliderBaseProps {
  // prefixCls?: string;
  // tooltipPrefixCls?: string;
  reverse?: boolean;
  min?: number;
  max?: number;
  step?: null | number;
  // marks?: SliderMarks;
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
}

interface HandleGeneratorInfo {
  value?: number;
  dragging?: boolean;
  index: number;
}

export type HandleGeneratorFn = (config: {
  info: HandleGeneratorInfo;
}) => React.ReactElement;


export type Visibles = { [index: number]: boolean };

const Slider = React.forwardRef <unknown, SliderSingleProps | SliderRangeProps>((props, ref: any) => {
  const {
    range,
    className,
    ...restProps
  } = props
  const [visibles, setVisibles] = React.useState<Visibles>({})

  // 切换 Tooltip显示
  const toggleTooltipVisible = (index: number, visible: boolean) => {
    setVisibles((prev: Visibles) => ({ ...prev, [index]: visible }))
  }

  const handleWithTooltip: HandleGeneratorFn = ({
    info: { value, dragging, index, ...restProps }
  }) => {
    const {
      tipFormatter,
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
      overlayClassName='kenshin-tooltip'
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
    className={cls}
    ref={ref}
    handle={(info: HandleGeneratorInfo) => handleWithTooltip({ info })}
  />


})

Slider.defaultProps = {
  tipFormatter(value?: number) {
    return typeof value === 'number' ? value.toString() : ''
  }
}

export default Slider
