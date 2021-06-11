import * as React from 'react'
import Dropdown from '..'
import Button from '@/button'
import { render, cleanup } from '@testing-library/react'

describe(Dropdown.displayName!, () => {
  afterEach(cleanup)
  it('should render', () => {
    // @ts-ignore
    const Menu = <Dropdown.Menu>
      <Dropdown.Item>黄金糕</Dropdown.Item>
      <Dropdown.Item>狮子头</Dropdown.Item>
      <Dropdown.Item>螺蛳粉</Dropdown.Item>
      <Dropdown.Item disabled>双皮奶</Dropdown.Item>
      <Dropdown.Item divided>蚵仔煎</Dropdown.Item>
    </Dropdown.Menu>
    const el = render(
      <Dropdown menu={Menu}>
        <Button type="primary">
          更多菜单<i className="kenshin-icon-caret-bottom kenshin-icon--right" />
        </Button>
      </Dropdown>
    )
    expect(el.getByText('更多菜单')).toBeInTheDocument()
  })
})
