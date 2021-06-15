import * as React from 'react'
import Input from '..'
import { render, cleanup } from '@testing-library/react'

describe(Input.displayName!, () => {
  afterEach(cleanup)
  it('should render', () => {
    const placeholder = 'placeholder'
    const el = render(<Input placeholder={placeholder} value="1" />)
    expect(el.getByPlaceholderText(placeholder)).toBeInTheDocument()
  })
})
