import * as React from 'react'
import { render, fireEvent, cleanup, screen } from '@testing-library/react'
import Tag from '..'

describe(Tag.displayName!, () => {
  afterEach(cleanup)
  it('should mounted', () => {
    const text = 'tag'
    const el = render(<Tag>{text}</Tag>)
    expect(el.getByText(text)).toBeInTheDocument()
  })

  afterEach(cleanup)
  it('close event', () => {
    const onClose = jest.fn()
    const el = render(<Tag onClose={onClose} closable>tag</Tag>)
    fireEvent.click(el.container.querySelector('i')!)
    expect(onClose).toHaveBeenCalled()
  })
})

