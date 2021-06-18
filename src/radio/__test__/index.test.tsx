import * as React from 'react'
import { render, fireEvent, cleanup } from '@testing-library/react'
import Radio from '..'

describe(Radio.displayName!, () => {

  afterEach(cleanup)

  it('should mounted', () => {
    const el = render(<Radio checked={true} value={1} disabled>选项1</Radio>)
    // 标签存放于 span 中
    expect(el.getByText('选项1').tagName).toEqual('SPAN')
    expect(el.container.querySelectorAll('input[checked]').length).toBe(1)
  })

  // afterEach(cleanup)
  //
  // it('toggle checked', async () => {
  //   const text = 'toggleChecked'
  //   const onChange = jest.fn()
  //   const el = render(<Checkbox checked role='checkbox' onChange={onChange}>{text}</Checkbox>)
  //   expect(el.container.querySelectorAll('input[checked]').length).toBe(1)
  //   await fireEvent.click(el.getByLabelText(text))
  //   expect(onChange).toHaveBeenCalled()
  // })
})

