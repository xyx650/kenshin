import * as React from 'react'
import { SliderProps } from '@/slider/slider'

export const SliderContext = React.createContext<{ props: SliderProps }>({
  props: {} as SliderProps
})
