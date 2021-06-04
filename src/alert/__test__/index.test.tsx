import * as React from 'react'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import Alert from '..'

describe(Alert.displayName!, () => {
  afterEach(cleanup)

  it('should mounted', () => {
    const title = 'Test-Alert'
    render(<Alert title={title} />)
    expect(screen.getByText(title)).toBeInTheDocument()
  })

  afterEach(cleanup)

  it('close event', () => {
    const title = 'Test-Alert'
    const closeText = 'close'
    const closeEvent = jest.fn()
    const { getByText } = render(<Alert title={title} closeText={closeText} onClose={closeEvent} />)
    const closeArea = getByText(closeText)
    fireEvent.click(closeArea)
    expect(screen.getByText(title)).not.toBeVisible()
    expect(closeEvent).toHaveBeenCalled()
  })
})

