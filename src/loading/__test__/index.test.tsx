import * as React from 'react'
import Loading from '..'
import { render, cleanup } from '@testing-library/react'

describe(Loading.displayName!, () => {
  afterEach(cleanup)
  it('should render', () => {
    const text = 'loading'
    const el = render(<Loading loading>{text}</Loading>)
    expect(el.getByText(text)).toBeInTheDocument()
  })
})
