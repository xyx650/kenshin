import * as React from 'react'
import { render, screen } from '@testing-library/react'
import Button from '..'

describe('Button', () => {
  it('should mounted', () => {
    const buttonText = 'Test-Button'
    render(<Button>{buttonText}</Button>)
    expect(screen.getByText(buttonText)).toBeInTheDocument()
  })
})

