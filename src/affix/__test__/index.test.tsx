import * as React from 'react'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import Affix from '..'

describe(Affix.displayName!, () => {
  afterEach(cleanup)

  it('should mounted', () => {
    render(
      <Affix target={() => window}>
        <button>固定在顶部</button>
      </Affix>
    )
    expect(screen.getByText('固定在顶部')).toBeInTheDocument()
  })

  afterEach(cleanup)
})

