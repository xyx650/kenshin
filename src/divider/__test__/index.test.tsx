import * as React from 'react'
import Divider from '..'
import { render, cleanup } from '@testing-library/react'

describe(Divider.displayName!, () => {
  afterEach(cleanup)
  it('should render', () => {
    const text = 'center'
    const el = render(<Divider>{text}</Divider>)
    expect(el.getByText(text)).toBeInTheDocument()
  })

  afterEach(cleanup)
  it('set style', () => {
    const orientation = 'left'
    const el = render(<Divider orientation={orientation}>{orientation}</Divider>)
    expect(el.getByText(orientation)).toBeInTheDocument()
    expect(el.getByText(orientation)).toHaveClass(`is-${orientation}`)
  })
})
