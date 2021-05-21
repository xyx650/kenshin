import * as React from 'react'
import type { CheckboxGroupProps } from './checkbox-group'

interface Context {
  options: (string | number)[];
  groupProps: CheckboxGroupProps
}

export const checkboxContext = React.createContext<Context>({} as Context)

