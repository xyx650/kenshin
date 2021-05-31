## Dropdown 下拉菜单

```tsx
/**
 * title: Dropdown 基本使用方式
 * desc: 基本使用方式
 */
import React from 'react';
import { Dropdown, Button } from 'kenshin';

const Menu = <Dropdown.Menu>
  <Dropdown.Item>黄金糕</Dropdown.Item>
  <Dropdown.Item>狮子头</Dropdown.Item>
  <Dropdown.Item>螺蛳粉</Dropdown.Item>
  <Dropdown.Item disabled>双皮奶</Dropdown.Item>
  <Dropdown.Item divided>蚵仔煎</Dropdown.Item>
</Dropdown.Menu>

export default () => <Dropdown menu={Menu}>
  <Button type="primary">
    更多菜单<i className="kenshin-icon-caret-bottom kenshin-icon--right" />
  </Button>
</Dropdown>
```

<style>
.kenshin-icon-caret-bottom {
  font-size: 12px;
}
</style>

<API/>
