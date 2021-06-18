import * as React from 'react'
import Popconfirm from '..'
import { render, cleanup, fireEvent, screen } from '@testing-library/react'

describe(Popconfirm.displayName!, () => {
  afterEach(cleanup)
  it('should render', () => {
    const title = 'test'
    const btnText = 'btnText'
    const el = render(<Popconfirm title={title}>
      <button>{btnText}</button>
    </Popconfirm>)
    expect(el.getByText(btnText)).toBeInTheDocument()
  })

  afterEach(cleanup)
  it('event', () => {
    const title = 'test'
    const onCancel = jest.fn()
    const cancelText = 'cancelText'
    const el = render(<Popconfirm title={title} onCancel={onCancel} cancelText={cancelText}>
      <button data-testid='btn'>del</button>
    </Popconfirm>)
    // trigger popconfirm
    const trigger = el.getByTestId('btn')
    fireEvent.click(trigger)
    // click cancel
    const cancel = screen.getByText(cancelText)
    fireEvent.click(cancel)
    expect(onCancel).toHaveBeenCalled()
  })
})
