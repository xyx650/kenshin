import * as React from 'react'
import { render, fireEvent, cleanup } from '@testing-library/react'
import Slider from '..'

describe(Slider.displayName!, () => {

  afterEach(cleanup)

  it('should mounted', () => {
    const el = render(<Slider defaultValue={1} />)
    expect(el.getByRole('slider')).toBeInTheDocument()
  })

  // afterEach(cleanup)
  //
  // it('change event', () => {
  //   const val = 1
  //   const onChange = jest.fn()
  //   const el = render(<Rate value={val} showText onChange={onChange}/>)
  //   const spans = el.container.querySelectorAll('span')
  //   // span<icons> 的长度应该 >= 5 (文字占用一个)
  //   expect(spans.length).toBeGreaterThanOrEqual(5)
  //   fireEvent.click(spans[4])
  //   // 点击触发事件
  //   expect(onChange).toHaveBeenCalled()
  // })
})

