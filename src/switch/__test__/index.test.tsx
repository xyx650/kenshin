import * as React from 'react'
import { render, fireEvent, cleanup, screen } from '@testing-library/react'
import Switch from '..'

describe(Switch.displayName!, () => {
  afterEach(cleanup)
  it('should mounted', () => {
    const el = render(<Switch />)
    expect(el.container.querySelector('input')).toBeInTheDocument()
  })

  afterEach(cleanup)
  it('change event', () => {
    const onChange = jest.fn()
    const el = render(<Switch onChange={onChange}/>)
    const input = el.container.querySelector('input')!
    expect(input).toBeInTheDocument()
    fireEvent.click(input)
    expect(onChange).toHaveBeenCalled()
  })
})

