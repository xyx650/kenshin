import * as React from 'react'
import { render, fireEvent, cleanup, screen } from '@testing-library/react'
import Tooltip from '..'

describe(Tooltip.displayName!, () => {
  afterEach(cleanup)
  it('should mounted', () => {
    const TooltipComponent = <Tooltip title="我是提示">
      <span className='span'>触发提示</span>
    </Tooltip>
    const el = render(TooltipComponent)
    expect(el.getByText('触发提示')).toBeInTheDocument()
  })

  // afterEach(cleanup)
  // it('change event', () => {
  //   const onChange = jest.fn()
  //   const el = render(<Switch onChange={onChange}/>)
  //   const input = el.container.querySelector('input')!
  //   expect(input).toBeInTheDocument()
  //   fireEvent.click(input)
  //   expect(onChange).toHaveBeenCalled()
  // })
})

