import * as React from 'react'
import Input from '..'
import { render, cleanup, fireEvent } from '@testing-library/react'

describe(Input.displayName!, () => {
  afterEach(cleanup)
  it('should render', () => {
    const placeholder = 'placeholder'
    const el = render(<Input placeholder={placeholder} value='1' />)
    expect(el.getByPlaceholderText(placeholder)).toBeInTheDocument()
  })

  afterEach(cleanup)
  it('change event', () => {
    const value = '1'
    const placeholder = 'placeholder'
    const onChange = jest.fn()
    const el = render(<Input placeholder={placeholder} value={value} onChange={onChange} />)
    expect(el.getByPlaceholderText(placeholder)).toBeInTheDocument()
    fireEvent.change(el.getByPlaceholderText(placeholder), {
      target: { value: '2' }
    })
    expect(onChange).toHaveBeenCalled()
  })
})
