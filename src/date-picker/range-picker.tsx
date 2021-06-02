import * as React from 'react'
import classNames from 'classnames'
import CalendarOutlined from '@ant-design/icons/CalendarOutlined'
import ClockCircleOutlined from '@ant-design/icons/ClockCircleOutlined'
import CloseCircleFilled from '@ant-design/icons/CloseCircleFilled'
import SwapRightOutlined from '@ant-design/icons/SwapRightOutlined'
import { RangePicker as RCRangePicker } from 'rc-picker'
import type { GenerateConfig } from 'rc-picker/lib/generate/index'
import { prefixCls as prefix } from '../config'
import type { RangePickerProps , PickerLocale } from './picker'
import { Components, getTimeProps } from './picker'
import locale from 'rc-picker/lib/locale/zh_CN'
import { getRangePlaceholder } from '@/date-picker/util'


export default function generateRangePicker<DateType>(generateConfig: GenerateConfig<DateType>) {

  class RangePicker extends React.Component<RangePickerProps<DateType>> {
    pickerRef = React.createRef<RCRangePicker<DateType>>()
    focus = () => {
      this.pickerRef.current?.focus()
    }

    blur = () => {
      this.pickerRef.current?.blur()
    }

    renderPicker = () => {
      const {
        prefixCls: customizePrefixCls = prefix,
        getPopupContainer: customGetPopupContainer,
        className,
        size: customizeSize = 'middle',
        bordered = true,
        placeholder,
        ...restProps
      } = this.props
      const { format, showTime, picker } = this.props as any
      const prefixCls = `${customizePrefixCls}-picker`
      let additionalOverrideProps: any = {}

      additionalOverrideProps = {
        ...additionalOverrideProps,
        ...(showTime ? getTimeProps({ format, picker, ...showTime }) : {}),
        ...(picker === 'time' ? getTimeProps({ format, ...this.props, picker }) : {})
      }
      return <RCRangePicker<DateType>
         separator={
           <span aria-label="to" className={`${prefixCls}-separator`}>
              <SwapRightOutlined />
            </span>
         }
         ref={this.pickerRef}
         placeholder={getRangePlaceholder(picker, { lang: locale } as PickerLocale, placeholder)}
         suffixIcon={picker === 'time' ? <ClockCircleOutlined /> : <CalendarOutlined />}
         clearIcon={<CloseCircleFilled />}
         allowClear
         transitionName={`${customizePrefixCls}-slide-up`}
         {...restProps}
         {...additionalOverrideProps}
         className={classNames(
           {
             [`${prefixCls}-${customizeSize}`]: customizeSize,
             [`${prefixCls}-borderless`]: !bordered,
           },
           className,
         )}
         locale={locale}
         prefixCls={prefixCls}
         getPopupContainer={customGetPopupContainer}
         generateConfig={generateConfig}
         prevIcon={<span className={`${prefixCls}-prev-icon`} />}
         nextIcon={<span className={`${prefixCls}-next-icon`} />}
         superPrevIcon={<span className={`${prefixCls}-super-prev-icon`} />}
         superNextIcon={<span className={`${prefixCls}-super-next-icon`} />}
         components={Components}
       />
    }

    render() {
      return this.renderPicker()
    }
  }

  return RangePicker
}

