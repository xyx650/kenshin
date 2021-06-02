## Select 选择


```tsx
/**
 * title: Select 基本使用方式
 * desc: 基本使用方式
 */
import React from 'react';
import { Select } from 'kenshin';
const { Option } = Select

export default () => <Select defaultValue="apple">
  <Option value="apple">apple</Option>
  <Option value="banana">banana</Option>
  <Option value="strawberry" disabled>strawberry</Option>
  <Option value="orange">orange</Option>
</Select>
```

<API/>
