import * as React from 'react'
import { render, fireEvent, cleanup, screen } from '@testing-library/react'
import ColorPicker from '..'

describe(ColorPicker.displayName!, () => {
  afterEach(cleanup)
  it('should mounted', () => {
    const color = '#f00'
    const el = render(<ColorPicker defaultColor={color} />)
    expect(el.container.querySelector('span')).toBeInTheDocument()
    expect(el.container.querySelector('span')).toHaveStyle(`background: ${color}`)
  })
})

