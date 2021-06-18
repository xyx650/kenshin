import * as React from 'react'
import { render, fireEvent, cleanup } from '@testing-library/react'
import Rate from '..'

describe(Rate.displayName!, () => {

  afterEach(cleanup)

  it('should mounted', () => {
    const val = 1
    const el = render(<Rate value={val} showText disabled/>)
    expect(el.getByText(val)).toBeInTheDocument()
  })

  afterEach(cleanup)

  it('change event', () => {
    const val = 1
    const onChange = jest.fn()
    const el = render(<Rate value={val} showText onChange={onChange}/>)
    const spans = el.container.querySelectorAll('span')
    // span<icons> 的长度应该 >= 5 (文字占用一个)
    expect(spans.length).toBeGreaterThanOrEqual(5)
    fireEvent.click(spans[4])
    // 点击触发事件
    expect(onChange).toHaveBeenCalled()
  })
})

