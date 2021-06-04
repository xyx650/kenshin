import * as React from 'react'
import { render } from '@testing-library/react'
import Card from '..'

describe(Card.displayName!, () => {
  it('should mounted', () => {

    const header = '卡片名称'
    const card = <Card className='box-card' header={header}>
      <div role='item'>列表内容 1</div>
      <div role='item'>列表内容 2</div>
    </Card>

    const el = render(card)
    expect(el.getByText(header).tagName).toEqual('DIV')
    expect(el.getByText(header)).toBeInTheDocument()
    expect(el.getAllByRole('item').length).toBe(2)
  })
})

