import * as React from 'react'
import InputNumber from '..'
import { render, cleanup, fireEvent } from '@testing-library/react'

describe(InputNumber.displayName!, () => {
  afterEach(cleanup)
  it('should render', () => {
    const value = 2
    const el = render(<InputNumber value={value} />)
    expect(el.getByDisplayValue(value)).toBeInTheDocument()
  })

  afterEach(cleanup)
  it('change event', () => {
    const value = '1'
    const onChange = jest.fn()
    const el = render(<InputNumber  value={value} onChange={onChange} />)
    expect(el.getByDisplayValue(value)).toBeInTheDocument()
    fireEvent.change(el.getByDisplayValue(value), {
      target: { value: '2' }
    })
    expect(onChange).toHaveBeenCalled()
  })
})
