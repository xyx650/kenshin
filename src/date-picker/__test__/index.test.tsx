import * as React from 'react'
import DatePicker from '..'
import { render, cleanup } from '@testing-library/react'

describe(DatePicker.displayName!, () => {
  afterEach(cleanup)
  it('should render', () => {
    const el = render(<DatePicker placeholder={'请选择'}/>)
    expect(el.getByPlaceholderText('请选择')).toBeInTheDocument()
  })
})
