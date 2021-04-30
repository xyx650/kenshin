## InputNumber 数字输入框

```tsx
/**
 * title: InputNumber 基本使用方式
 * desc: 基本使用方式
 */
import React from 'react';
import { InputNumber } from 'kenshin';


export default () => {
  const [value, setValue] = React.useState(1)

  return <InputNumber
    value={value}
  />

}
```

<API/>
