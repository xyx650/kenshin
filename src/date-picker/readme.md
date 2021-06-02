## DatePicker 日期选择

```tsx
/**
 * title: DatePicker 基本使用方式
 * desc: 基本使用方式
 */
import React from 'react';
import { DatePicker } from 'kenshin';

const onChange = (date, dateString) => {
  console.log(date, dateString);
}

export default () => <DatePicker onChange={onChange}/>
```

<API/>
