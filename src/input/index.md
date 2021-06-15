## Input 输入框

```tsx
/**
 * title: 基本使用方式
 * desc: 基本使用方式
 */
import React from 'react';
import { Input } from 'kenshin';

export default () => <Input placeholder='请输入' />
```

```tsx
/**
 * title: 禁用状态
 * desc: 可以通过 `disabled` 属性设置禁用状态
 */
import React from 'react';
import { Input } from 'kenshin';

export default () => <Input placeholder='请输入' disabled />
```

```tsx
/**
 * title: 带 icon 的输入框
 * desc: 可以通过 `icon` 属性在 input 组件尾部增加显示图标。
 */
import React from 'react';
import { Input } from 'kenshin';

export default () => <Input placeholder='请输入' icon="edit" />
```

```tsx
/**
 * title: 文本域
 * desc: 通过将 `type` 属性的值指定为 textarea。
 */
import React from 'react';
import { Input } from 'kenshin';

export default () => <Input
  type="textarea"
  autosize={{ minRows: 2, maxRows: 4 }}
  placeholder="请输入内容"
/>
```

## API

| Name          | Description     | Type                                                         |    Default       |
| ------------- | --------------- | ------------------------------------------------------------ |----------------- |
| type          | 类型             | `text \| textarea`                                           | `text` |
| size          | 输入框尺寸，只在 type!="textarea" 时有效           | `large \| small \| mini`                                     |     `--`       |
| icon          | 输入框尾部图标             |  `string`                                                    |      `--`          |
| value         | 绑定值            | `string \| number `                                   |  `--`  |
| maxLength     | 最大输入长度       | `number`                                                      |   `--`  |
| minLength     | 最小输入长度       | `number`                                                      |  `--`  |
| placeholder   | 输入框占位文本     | `string`                                                      |   `--` |
| disabled      | 禁用              | `boolean`                                                      |   `boolean` |
| rows          | 输入框行数，只对 type="textarea" 有效 | `number`                                                      |   `2` |
| autosize      | 输入框行数，只对 type="textarea" 有效，可传入对象，如，{ minRows: 2, maxRows: 6 } | `boolean \| { minRows?: number; maxRows?: number }`       |   `flase` |
| autoComplete  | 原生属性，自动补全   | `'on' \| 'off'`                                                      |   `off` |
| name          | 原生属性           | `string`                                                      |   `--` |
| readOnly      | 原生属性，是否只读   | `boolean`                                                      |   `false` |
| max           | 原生属性，设置最大值 | `number`                                                      |   `--` |
| min           | 原生属性，设置最小值 | `number`                                                      |   `--` |
| resize        | 控制是否能被用户缩放 | `'none' \| 'both' \| 'horizontal' \| 'vertical'`             |   `--` |
| onIconClick   | 点击 Input 内的图标的钩子函数 | `function`             |   `--` |
| trim          | 对input内容进行trim | `boolean`             |   `false` |
| autoFocus     | 原生属性，自动获取焦点 | `boolean`                   |   `false` |
| className     | 自定义样式类       | `string`                                                       |  `--`  |
| style         | 自定义样式类       | `React.CSSProperties`                                          |  `--`  |
| prefixCls     | 自定义样式前缀     | `string`                                                      |  `--`  |

<style>
.kenshin-input,
.kenshin-textarea {
  width: 250px;
}
</style>
