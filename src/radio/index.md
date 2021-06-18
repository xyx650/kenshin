## Radio 单选

```tsx
/**
 * title: 基本使用
 * desc: 基本使用
 */
import React from 'react';
import { Radio } from 'kenshin';

export default () => {
  const [value, setValue] = React.useState(1)

  return <>
    <Radio value={1} checked={value === 1} onChange={e => setValue(e)}>备选项1</Radio>
    <Radio value={2} checked={value === 2} onChange={e => setValue(e)}>备选项2</Radio>
  </>
}
```

```tsx
/**
 * title: 禁用状态
 * desc: 使用`disabled`设置禁用状态
 */
import React from 'react';
import { Radio } from 'kenshin';

export default () => {
  const [value, setValue] = React.useState(0)

  return <>
    <Radio value={1} checked={value === 1} disabled>备选项1</Radio>
    <Radio value={2} checked={value === 2} disabled>备选项2</Radio>
  </>
}
```

## API

| Name          | Description     | Type                                                         |    Default       |
| --- | --- | --- | --- |
| value | 绑定的值 | `string \| number` | `--` |
| disabled | 是否禁用 | `boolean` | `false` |
| checked | 是否选中 | `boolean` | `false` |
| onChange | 改变时事件 | `(val: string \| number) => void` | `--` |
| className     | 自定义样式类       | `string`                                                       |  `--`  |
| style         | 自定义样式类       | `React.CSSProperties`                                          |  `--`  |
| prefixCls     | 自定义样式前缀     | `string`                                                      |  `--`  |
