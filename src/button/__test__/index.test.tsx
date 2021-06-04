import * as React from 'react'
import { render, fireEvent, cleanup } from '@testing-library/react'
import Button from '..'

describe(Button.displayName!, () => {
  afterEach(cleanup)

  it('should mounted', () => {
    const buttonText = 'Test-Button'
    const el = render(<Button>{buttonText}</Button>)
    // 文本节点在 span 标签中
    expect(el.getByText(buttonText).tagName).toEqual('SPAN')
    expect(el.getByText(buttonText)).toBeInTheDocument()
  })

  afterEach(cleanup)

  it('click event', () => {
    const buttonText = 'Test-Button'
    const clickEvent = jest.fn()
    const el = render(<Button onClick={clickEvent}>{buttonText}</Button>)
    fireEvent.click(el.getByText(buttonText))
    expect(clickEvent).toHaveBeenCalled()
  })
})

