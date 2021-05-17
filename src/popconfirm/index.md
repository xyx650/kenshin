## Popconfirm 气泡确认框

```tsx
import React from 'react';
import { Popconfirm, Button } from 'kenshin';

export default () => <Popconfirm
  title="确认删除？"
  okText="是"
  cancelText="否"
>
  <Button type='danger'>删除</Button>
</Popconfirm>
```

<API/>
