import * as React from 'react'
import { render, fireEvent, cleanup, screen } from '@testing-library/react'
import Select from '..'

describe(Select.displayName!, () => {

  afterEach(cleanup)

  it('should mounted', () => {
    const { Option } = Select
    const SelectComponent = <Select defaultValue='apple'>
      <Option value='apple'>apple</Option>
      <Option value='banana'>banana</Option>
      <Option value='strawberry'>strawberry</Option>
      <Option value='orange'>orange</Option>
    </Select>
    const el = render(SelectComponent)
    expect(el.getByText('apple')).toBeInTheDocument()
  })
})

