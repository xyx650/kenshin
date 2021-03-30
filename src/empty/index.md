---
title: Empty
---

```tsx
import React from 'react';
import { Empty } from 'kenshin';

export default () => <Empty />;
```

```tsx
import React from 'react';
import { Empty } from 'kenshin';

export default () => (
  <Empty
    image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
    imageStyle={{
      height: 60,
    }}
    description={
      <span>
        Customize <a href="#API">Description</a>
      </span>
    }
  ></Empty>
);
```
