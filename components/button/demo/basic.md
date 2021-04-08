---
order: 0
title:
  zh-CN: 按钮类型
  en-US: Type
---

## zh-CN

按钮有五种类型：主按钮、次按钮、虚线按钮、文本按钮和链接按钮。

## en-US

There are `primary` button, `default` button, `dashed` button, `text` button and `link` button in antd.

```jsx
import { Button } from 'kenshin';

ReactDOM.render(
  <>
    <Button type="primary">主按钮</Button>
    <Button>次按钮</Button>
    <Button type="dashed">虚线按钮</Button>
    <br />
    <Button type="text">文本按钮</Button>
    <Button type="link">链接按钮</Button>
  </>,
  mountNode,
);
```
