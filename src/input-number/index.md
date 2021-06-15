## InputNumber 数字输入框

```tsx
/**
 * title: InputNumber 基本使用方式
 * desc: 基本使用方式
 */
import React from 'react';
import { InputNumber } from 'kenshin';

export default () => {
  const [value,] = React.useState(1)
  return <InputNumber value={value} />
}
```

```tsx
/**
 * title: 禁用状态
 * desc: 设置`disabled`属性为 true 即可禁用整个组件
 */
import React from 'react';
import { InputNumber } from 'kenshin';

export default () => <InputNumber value={999} disabled />
```

```tsx
/**
 * title: 步数
 * desc: 设置`step`属性可以控制步长，接受一个Number
 */
import React from 'react';
import { InputNumber } from 'kenshin';

export default () => {
  const [value,] = React.useState(1)
  return <InputNumber value={value} step={3} />
}
```

```tsx
/**
 * title: 尺寸
 * desc: 额外提供了 `large`、`small` 两种尺寸的数字输入框
 */
import React from 'react';
import { InputNumber } from 'kenshin';

export default () => {
  const [value,] = React.useState(1)
  const [value2,] = React.useState(1)
  const [value3,] = React.useState(1)
  return <>
    <InputNumber value={value} size="large" />
    <InputNumber value={value2} />
    <InputNumber value={value3} size="small" />
  </>
}
```

## API

| Name          | Description     | Type                                                         |    Default       |
| ------------- | --------------- | ------------------------------------------------------------ |----------------- |
| defaultValue  | 默认值             | `number`                                           | `--` |
| value         | 绑定值           | `number`                                     |     `--`       |
| max           | 设置计数器允许的最大值 | `number`                                                      |   `Infinity` |
| min           | 设置计数器允许的最小值 | `number`                                                      |   `0` |
| step          | 计数器步长        |  `number`                                                    |      `1`          |
| size          | 计数器尺寸        | `'large' \| 'small' `                                   |  `--`  |
| disabled      | 禁用              | `boolean`                                                      |   `boolean` |
| controls      | 是否使用控制按钮     | `boolean`                                                      |   `true` |
| className     | 自定义样式类       | `string`                                                       |  `--`  |
| style         | 自定义样式类       | `React.CSSProperties`                                          |  `--`  |
| prefixCls     | 自定义样式前缀     | `string`                                                      |  `--`  |
| onChange      | 绑定值被改变时触发   | `(value: number) => void`                                     |  `--`  |

<style>
.kenshin-input-number {
  margin-right: 20px;
}
</style>
