import * as React from 'react'
import InputNumber from '..'
import { render, cleanup } from '@testing-library/react'

describe(InputNumber.displayName!, () => {
  afterEach(cleanup)
  it('should render', () => {
    const value = 2
    const el = render(<InputNumber value={value} />)
    expect(el.getByDisplayValue(value)).toBeInTheDocument()
  })
})
