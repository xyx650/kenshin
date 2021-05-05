import * as React from 'react'
import { ColorType } from '@/color-picker/types'

export const colorPickerContext = React.createContext({
  onChange(color: ColorType) {}
})


