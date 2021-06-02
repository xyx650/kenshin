## Switch 开关

```tsx
/**
 * title: Switch 基本使用方式
 * desc: 基本使用方式
 */
import React from 'react';
import { Switch } from 'kenshin';

export default () => <Switch value={true} onText="" offText="" />
```

```tsx
/**
 * title: 扩展的 value 类型
 * desc: 设置`onValue`和`offValue`属性，接受`Boolean`, `String`或`Number`类型的值。
 */

import React from 'react';
import { Switch } from 'kenshin';

export default () => {
  const [value, setValue] = React.useState(100)
  return <Switch
    value={value}
    onColor="#13ce66"
    offColor="#ff4949"
    onValue={100}
    offValue={0}
    onChange={setValue}
  />
}

```

<API/>
