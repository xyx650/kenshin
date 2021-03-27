## Button

Demo:

```tsx
import React from 'react';
import { Button } from 'kenshin';

export default () => (
  <Button onClick={() => alert('hello')}>
    <span>23123</span>
  </Button>
);
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
