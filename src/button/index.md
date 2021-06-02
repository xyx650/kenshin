## Button 按钮

```tsx
/**
 * title: Button 基本使用方式
 * desc: 基本使用方式
 */
import React from 'react';
import { Button } from 'kenshin';

export default () => <>
  <Button type='primary'>primary</Button>
  <Button type='success'>success</Button>
  <Button type='plain'>plain</Button>
  <Button type='text'>text</Button>
  <Button type= 'info' onClick={() => alert('hello world')}>clickEvent</Button>
</>
```

<API/>


<br>

## API

| Name          | Description     | Type                                                         |    Default       |
| ------------- | --------------- | ------------------------------------------------------------ |----------------- |
| onClick       | 点击事件         |  `(e: React.MouseEvent<HTMLButtonElement>) => void `         |   `--`           |                                         |
| type          | 按钮类型         | `primary \| success \| warning \| danger \| info \| text \| default`  | `default` |
| size          | 尺寸             | `large \| small \| mini`                                     |     `--`       |
| icon          | 图标             |  `string`                                                       |      `--`          |
| nativeType    | HTML 类型        | `button \| submit \| reset`                                   |  `button`  |
| loading       | 加载状态          | `boolean`                                                      |   `false`  |
| disabled      | 禁用状态          | `boolean`                                                      |  `false`  |
| plain         | 镂空效果          | `boolean`                                                      |   `false` |
| className     | 自定义样式类       | `string`                                                       |  `--`  |
| style         | 自定义样式类       | `React.CSSProperties`                                          |  `--`  |
| prefixCls     | 自定义样式前缀      | `string`                                                      |  `--`  |
