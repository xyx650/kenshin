## Checkbox 复选框

```tsx
/**
 * title: Checkbox 基本使用方式
 * desc: 简单的 Checkbox，使用 checked 切换选中状态。
 */
import React from 'react';
import { Checkbox } from 'kenshin';

export default () => <>
  <Checkbox checked>选项1</Checkbox>
  <Checkbox>选项2</Checkbox>
</>
```

```tsx
/**
 * title: Checkbox.Group 多选框组
 * desc: Checkbox.Group元素能把多个 checkbox 管理为一组，只需要在 Group 中使用value绑定Array类型的变量即可，label属性除了改变 checkbox 按钮后的介绍外，同时也是该 checkbox 对应的值，label与数组中的元素值相对应，如果存在指定的值则为选中状态，否则为不选中。
 */
import React from 'react';
import { Checkbox } from 'kenshin';

const cities = ['上海', '北京', '广州', '深圳']

const handleChange = value => {
  console.log(value)
}

export default () => <Checkbox.Group
  value={['上海', '北京']}
  max={3}
  onChange={handleChange}>
  {
    cities.map((city, index) => <Checkbox key={index} label={city} />)
  }
</Checkbox.Group>
```

<API/>


<style>
]
</style>
