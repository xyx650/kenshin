import * as React from 'react'
import classNames from 'classnames'
import CalendarOutlined from '@ant-design/icons/CalendarOutlined'
import ClockCircleOutlined from '@ant-design/icons/ClockCircleOutlined'
import CloseCircleFilled from '@ant-design/icons/CloseCircleFilled'
import RCPicker from 'rc-picker'
import locale from 'rc-picker/lib/locale/zh_CN'
import type { PickerMode } from 'rc-picker/lib/interface'
import type { GenerateConfig } from 'rc-picker/lib/generate/index'
import type { PickerProps, PickerDateProps, PickerTimeProps, PickerLocale } from './picker'
import { getTimeProps, Components } from './picker'
import { prefixCls as prefix } from '../config'
import { getPlaceholder } from './util'


export default function generatePicker<DateType>(generateConfig: GenerateConfig<DateType>) {
  type DatePickerProps = PickerProps<DateType>;

  function getPicker<InnerPickerProps extends DatePickerProps>(picker?: PickerMode, displayName?: string) {
    class Picker extends React.Component<InnerPickerProps> {
      // static contextType = ConfigContext;

      static displayName: string

      pickerRef = React.createRef<RCPicker<DateType>>()

      focus = () => {
        this.pickerRef.current?.focus()
      }

      blur = () => {
        this.pickerRef.current?.blur()
      }

      renderPicker = () => {
        const { getPopupContainer } = this.context
        const {
          prefixCls: customizePrefixCls = prefix,
          getPopupContainer: customizeGetPopupContainer,
          className,
          size: customizeSize = 'middle',
          bordered = true,
          placeholder = '请选择',
          ...restProps
        } = this.props

        const { format, showTime } = this.props as any

        const prefixCls = `${customizePrefixCls}-picker`

        const additionalProps = { showToday: true }

        let additionalOverrideProps: any = {}
        if (picker) {
          additionalOverrideProps.picker = picker
        }
        const mergedPicker = picker || this.props.picker

        additionalOverrideProps = {
          ...additionalOverrideProps,
          ...(showTime ? getTimeProps({ format, picker: mergedPicker, ...showTime }) : {}),
          ...(mergedPicker === 'time'
            ? getTimeProps({ format, ...this.props, picker: mergedPicker })
            : {})
        }

        return <RCPicker<DateType>
          ref={this.pickerRef}
          placeholder={getPlaceholder(mergedPicker, { lang: locale } as PickerLocale, placeholder)}
          suffixIcon={mergedPicker === 'time' ? <ClockCircleOutlined /> : <CalendarOutlined />}
          clearIcon={<CloseCircleFilled />}
          allowClear
          transitionName={`${customizePrefixCls}-slide-up`}
          {...additionalProps}
          {...restProps}
          {...additionalOverrideProps}
          locale={locale}
          className={classNames(
            {
              [`${prefixCls}-${customizeSize}`]: customizeSize,
              [`${prefixCls}-borderless`]: !bordered
            },
            className
          )}
          prefixCls={prefixCls}
          getPopupContainer={customizeGetPopupContainer || getPopupContainer}
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

    Picker.displayName = displayName || 'DatePicker'
    return Picker as React.ComponentClass<InnerPickerProps>
  }

  const DatePicker = getPicker<DatePickerProps>()
  const WeekPicker = getPicker<Omit<PickerDateProps<DateType>, 'picker'>>('week', 'WeekPicker')
  const MonthPicker = getPicker<Omit<PickerDateProps<DateType>, 'picker'>>('month', 'MonthPicker')
  const YearPicker = getPicker<Omit<PickerDateProps<DateType>, 'picker'>>('year', 'YearPicker')
  const TimePicker = getPicker<Omit<PickerTimeProps<DateType>, 'picker'>>('time', 'TimePicker')
  const QuarterPicker = getPicker<Omit<PickerTimeProps<DateType>, 'picker'>>('quarter', 'QuarterPicker')

  return { DatePicker, WeekPicker, MonthPicker, YearPicker, TimePicker, QuarterPicker }
}
