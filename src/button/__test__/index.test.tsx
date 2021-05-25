import * as React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
// import { render, mount } from 'enzyme'
import Button from '../button'

// describe('Button', () => {
//   it('should mounted', () => {
//     const buttonText = 'Test-Button'
//     render(<Button>{buttonText}</Button>)
//     expect(screen.getByText(buttonText)).toBeInTheDocument()
//
//     // expect(()=>{
//     //   mount(<Button>{buttonText}</Button>)
//     // }).not.toThrow()
//   })
// })

test('should mounted', () => {
  const buttonText = 'Test-Button'
  render(<Button>{buttonText}</Button>)
  expect(screen.getByText(buttonText)).not.toBeNull()
  expect(screen.getByText(buttonText)).toBeInTheDocument()

  // expect(()=>{
  //   mount(<Button>{buttonText}</Button>)
  // }).not.toThrow()
})


