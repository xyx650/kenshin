import * as React from 'react'
import omit from 'rc-util/lib/omit'
import classNames from 'classnames'
import type { SelectProps as RcSelectProps } from 'rc-select'
import RcSelect, { Option, OptGroup } from 'rc-select'
import { OptionProps } from 'rc-select/lib/Option'
import { prefixCls as prefix } from '../config'
import getIcons from './icon'
import './index.less'

type RawValue = string | number;

export { OptionProps }

export type OptionType = typeof Option;

export interface LabeledValue {
  key?: string;
  value: RawValue;
  label: React.ReactNode;
}

export type SelectValue = RawValue | RawValue[] | LabeledValue | LabeledValue[];

export interface InternalSelectProps<VT> extends Omit<RcSelectProps<VT>, 'mode'> {
  suffixIcon?: React.ReactNode;
  size?: 'mini' | 'small' | 'middle' | 'large';
  mode?: 'multiple' | 'tags' | 'SECRET_COMBOBOX_MODE_DO_NOT_USE';
  bordered?: boolean;
}

export interface SelectProps<VT>
  extends Omit<InternalSelectProps<VT>, 'inputIcon' | 'mode' | 'getInputElement' | 'backfill'> {
  mode?: 'multiple' | 'tags';
}

export interface RefSelectProps {
  focus: () => void;
  blur: () => void;
}

const SECRET_COMBOBOX_MODE_DO_NOT_USE = 'SECRET_COMBOBOX_MODE_DO_NOT_USE'

const InternalSelect = <VT extends SelectValue = SelectValue>(
  {
    prefixCls: customizePrefixCls = prefix,
    bordered = true,
    className,
    getPopupContainer,
    dropdownClassName,
    listHeight = 256,
    listItemHeight = 24,
    size: customizeSize = 'middle',
    notFoundContent,
    ...props
  }: SelectProps<VT>,
  ref: React.Ref<RefSelectProps>
) => {
  const prefixCls = `${customizePrefixCls}-select`
  const rootPrefixCls = prefix

  const mode = React.useMemo(() => {
    const { mode: m } = props as InternalSelectProps<VT>

    if ((m as any) === 'combobox') {
      return undefined
    }

    if (m === SECRET_COMBOBOX_MODE_DO_NOT_USE) {
      return 'combobox'
    }

    return m
  }, [props.mode])

  const isMultiple = mode === 'multiple' || mode === 'tags'


  let mergedNotFound: React.ReactNode
  if (notFoundContent !== undefined) {
    mergedNotFound = notFoundContent
  } else if (mode === 'combobox') {
    mergedNotFound = null
  } else {
    // empty
    mergedNotFound = <div />
  }

  const { suffixIcon, itemIcon, removeIcon, clearIcon } = getIcons({
    ...props,
    multiple: isMultiple,
    prefixCls
  })

  const selectProps = omit(props as typeof props & { itemIcon: any }, ['suffixIcon', 'itemIcon'])

  const rcSelectRtlDropDownClassName = classNames(dropdownClassName)

  const mergedSize = customizeSize
  const mergedClassName = classNames({
    [`${prefixCls}-lg`]: mergedSize === 'large',
    [`${prefixCls}-sm`]: mergedSize === 'small',
    [`${prefixCls}-borderless`]: !bordered
  }, className)

  return <RcSelect<VT>
    ref={ref as any}
    {...selectProps}
    transitionName={props.transitionName || `${rootPrefixCls}-slide-up`}
    listHeight={listHeight}
    listItemHeight={listItemHeight}
    mode={mode}
    prefixCls={prefixCls}
    inputIcon={suffixIcon}
    menuItemSelectedIcon={itemIcon}
    removeIcon={removeIcon}
    clearIcon={clearIcon}
    notFoundContent={mergedNotFound}
    className={mergedClassName}
    getPopupContainer={getPopupContainer}
    dropdownClassName={rcSelectRtlDropDownClassName}
  />
}

const SelectRef = React.forwardRef(InternalSelect) as <VT extends SelectValue = SelectValue>(
  props: SelectProps<VT> & { ref?: React.Ref<RefSelectProps> }
) => React.ReactElement

type InternalSelectType = typeof SelectRef;

interface SelectInterface extends InternalSelectType {
  SECRET_COMBOBOX_MODE_DO_NOT_USE: string;
  Option: typeof Option;
  OptGroup: typeof OptGroup;
}

const Select = SelectRef as SelectInterface

Select.SECRET_COMBOBOX_MODE_DO_NOT_USE = SECRET_COMBOBOX_MODE_DO_NOT_USE
Select.Option = Option
Select.OptGroup = OptGroup

export default Select
