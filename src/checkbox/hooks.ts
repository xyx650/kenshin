import React from 'react'
import type { CheckboxProps } from './checkbox'
import { checkboxContext } from './context'

export const useCheckbox = (props: CheckboxProps) => {

  const getLabel = React.useMemo(() => {
    if (props.trueLabel || props.falseLabel) {
      return props.checked ? props.trueLabel : props.falseLabel
    }
    return props.label
  }, [props.checked, props.falseLabel, props.label, props.trueLabel])

  const [checked, setChecked] = React.useState(!!props.checked)
  const [focus, setFocus] = React.useState(props.focus)
  const [label, setLabel] = React.useState(getLabel)

  const onFocus = () => {
    setFocus(true)
  }

  const onBlur = () => {
    setFocus(false)
  }

  const context = React.useContext(checkboxContext)

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target) {
      const { trueLabel, falseLabel } = props
      const { checked } = e.target
      const { options, groupProps } = context
      if (options) {
        const length = options.length + (checked ? 1 : -1)
        if (
          (typeof groupProps.min !== 'undefined' && length < groupProps.min) ||
          (typeof groupProps.max !== 'undefined' && length > groupProps.max)
        ) return
      }
      let newLabel = label
      if (trueLabel || falseLabel) {
        newLabel = checked ? trueLabel : falseLabel
      }

      setChecked(checked)
      setLabel(newLabel)
    }
  }

  return {
    checked,
    setChecked,
    focus,
    setFocus,
    label,
    setLabel,
    getLabel,
    onFocus,
    onBlur,
    onChange
  }
}
