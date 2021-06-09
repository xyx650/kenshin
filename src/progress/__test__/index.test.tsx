import * as React from 'react'
import Progress from '..'
import { screen, render } from '@testing-library/react'

describe(Progress.displayName!, () => {
  it('should render', () => {
    const progress = 50
    render(<Progress percentage={progress}/>)
    expect(screen.getByText(`${progress}%`)).toBeInTheDocument()
  })
})
