import * as React from 'react'
import classNames from 'classnames'
import omit from 'rc-util/lib/omit'
import type { Omit, LiteralUnion } from '@/_utils/type'
import SizeContext, { SizeType } from '@/_config-provider/SizeContext'
import { ConfigConsumer, ConfigConsumerProps } from '@/_config-provider'

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix' | 'type'> {
  prefixCls?: string;
  size?: SizeType;
  type?: LiteralUnion<| 'button'
    | 'checkbox'
    | 'color'
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'file'
    | 'hidden'
    | 'image'
    | 'month'
    | 'number'
    | 'password'
    | 'radio'
    | 'range'
    | 'reset'
    | 'search'
    | 'submit'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | 'week',
    string>;
  onPressEnter?: React.KeyboardEventHandler<HTMLInputElement>;
  addonBefore?: React.ReactNode;
  addonAfter?: React.ReactNode;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  allowClear?: boolean;
  bordered?: boolean;
}

export interface InputState {
  value: any;
  focused: boolean;
  prevValue: any;
}

class Input extends React.Component<InputProps, InputState> {

  constructor(props: InputProps) {
    super(props)
    const value = typeof props.value === 'undefined' ? props.defaultValue : props.value
    this.state = {
      value,
      focused: false,
      prevValue: props.value
    }
  }

  renderComponent = ({ getPrefixCls, input }: ConfigConsumerProps) => {
    const { value, focused } = this.state
    const { prefixCls: customizePrefixCls, bordered = true } = this.props
    const prefixCls = getPrefixCls('input', customizePrefixCls)

    return <SizeContext.Consumer>
      {size => <ClearableLabeledInput
        size={size}
        {...this.props}
        prefixCls={prefixCls}
        inputType='input'
        value={fixControlledValue(value)}
        element={this.renderInput(prefixCls, size, bordered, input)}
        handleReset={this.handleReset}
        ref={this.saveClearableInput}
        focused={focused}
        triggerFocus={this.focus}
        bordered={bordered}
      />}
    </SizeContext.Consumer>
  }

  render() {
    return <ConfigConsumer>{this.renderComponent}</ConfigConsumer>
  }
}


export default Input
