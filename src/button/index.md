---
title:Button 按钮
---

### Button 按钮

按钮有五种类型：主按钮、次按钮、虚线按钮、文本按钮和链接按钮。主按钮在同一个操作区域最多出现一次。

```tsx
import React from 'react';
import { Button } from 'kenshin';
import './style/index.less'

export default () => <>
  <Button type="primary" style={{ marginRight: '10px' }}>primary</Button>
  <Button type="dashed" style={{ marginRight: '10px' }}>dashed</Button>
  <Button type="text">text</Button>
</>
```

```tsx
/**
 * iframe: true // 设置为数值可控制 iframe 高度
 */
import React from 'react';

export default () => (
  <h2 style={{ boxShadow: '0 2px 15px rgba(0,0,0,0.1)', padding: '5px 20px' }}>iframe 模式</h2>
);
```
