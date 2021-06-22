## Switch 开关

```tsx
/**
 * title: Switch 基本使用方式
 * desc: 基本使用方式
 */
import React from 'react';
import { Switch } from 'kenshin';

export default () => <Switch />
```

```tsx
/**
 * title: 扩展的 value 和 color 类型
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
  />
}
```

```tsx
/**
 * title: 自定义文本
 * desc: 设置`onText`和`offText`属性
 */
import React from 'react';
import { Switch } from 'kenshin';

export default () => <Switch
  onColor="#137610"
  offColor="#ff2982"
  onText="我裂开了"
  offText="我收紧了"
  width={88}
/>
```

```tsx
/**
 * title: 触发事件
 * desc: 传入`onChange`
 */
import React from 'react';
import { Switch } from 'kenshin';

export default () => {
  const onChange = val => {
    alert(val ? '我裂开了' : '我收紧了')
  }
  return <Switch
    onText="我裂开了"
    offText="我收紧了"
    width={88}
    onChange={onChange}
  />
}
```

<API/>
