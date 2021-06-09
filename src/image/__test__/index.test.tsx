import * as React from 'react'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import Image from '..'

describe(Image.displayName!, () => {
  afterEach(cleanup)

  it('should mounted', () => {
    const src = 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    const altText = 'text'
    const el = render(<Image src={src} alt={altText}/>)
    expect(el.getByAltText(altText)).toBeInTheDocument()
  })
})

