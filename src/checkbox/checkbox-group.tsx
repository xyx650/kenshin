import * as React from 'react'
import classnames from 'classnames'
import type { CheckboxProps } from './checkbox'
import { checkboxContext } from './context'
import { prefixCls as prefix } from '../config'


export interface CheckboxGroupProps {
  min: string | number;
  max: string | number;
  size: string;
  fill: string;
  textColor?: string;
  value: (string | number)[];
  onChange?: (value: (string | number)[]) => void;
  style?: React.CSSProperties;
  className?: string;
  prefixCls?: string;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = props => {

  const [options, setOptions] = React.useState<(string | number)[]>(props.value || [])

  const { value, prefixCls = prefix } = props

  // WillReceiveProps update hook
  React.useEffect(() => {
    setOptions(value)
  }, [value])

  const onChange = (value: string | number, checked: boolean) => {
    const index = options.indexOf(value)
    if (checked) {
      index === -1 && options.push(value)
    } else {
      options.splice(index, 1)
    }
    props.onChange?.(options)
  }

  const children = React.Children.map(props.children as React.ReactElement<CheckboxProps, React.FC<CheckboxProps>>, (child, index) => {
    if (!child) {
      return null
    }
    const { displayName } = child.type
    // 过滤非 Checkbox 和 CheckboxButton 的子组件
    if (displayName !== 'Checkbox' && displayName !== 'CheckboxButton') {
      return null
    }
    return React.cloneElement(child, {
      ...child.props,
      key: index.toString(),
      checked: child.props.checked || options.indexOf(child.props.value as string | number) >= 0 ||
        options.indexOf(child.props.label as string | number) >= 0,
      // @ts-ignore
      onChange: onChange.bind(child, child.props.value ?
        child.props.value : child.props.value === 0 ? 0 : child.props.label)
    })
  })

  return <div style={props.style} className={classnames(`${prefixCls}-checkbox-group`, props.className)}>
    <checkboxContext.Provider value={{ options, groupProps: props }}>
      {children}
    </checkboxContext.Provider>
  </div>
}

export default CheckboxGroup



