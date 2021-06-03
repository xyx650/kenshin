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
  <Button type='info' onClick={() => alert('hello world')}>clickEvent</Button>
</>
```

```tsx
/**
 * title: 点击按钮后进行数据加载操作，在按钮上显示加载状态。
 * desc: 要设置为`loading` 状态，只要设置`loading`属性为`true`即可。
 */
import React from 'react';
import { Button } from 'kenshin';

export default () => <>
  <Button type='primary' loading>加载中</Button>
</>
```

```tsx
/**
 * title: 按钮不可用状态
 * desc: 你可以使用`disabled`属性来定义按钮是否可用，它接受一个`Boolean`值
 */
import React from 'react';
import { Button } from 'kenshin';

export default () => <>
  <Button type='primary' disabled>禁用按钮</Button>
  <Button type='text' disabled>禁用按钮</Button>
</>
```

```tsx
/**
 * title: Button 组件提供除了默认值以外的三种尺寸，可以在不同场景下选择合适的按钮尺寸。
 * desc: 额外的尺寸：`large`、`small`、`mini`，通过设置`size`属性来配置它们。
 */
import React from 'react';
import { Button } from 'kenshin';

export default () => <>
  <Button type="primary" size="large">大型按钮</Button>
  <Button type="primary">正常按钮</Button>
  <Button type="primary" size="small">小型按钮</Button>
  <Button type="primary" size="mini">超小按钮</Button>
</>
```

```tsx
/**
 * title: 带图标的按钮可增强辨识度(有文字)或节省空间(无文字)。
 * desc: 设置`icon`属性即可，设置在文字右边的`icon` ，也可使用`i`标签即可，可以使用自定义图标。
 */
import React from 'react';
import { Button } from 'kenshin';

export default () => <>
  <Button type="primary" icon="edit"></Button>
  <Button type="primary" icon="share"></Button>
  <Button type="primary" icon="delete"></Button>
  <Button type="primary" icon="search">搜索</Button>
  <Button type="primary">上传<i className="kenshin-icon-upload kenshin-icon-right"
                              style={{ paddingLeft: '5px' }} /></Button>
</>
```

```tsx
/**
 * title: 带图标的按钮可增强辨识度(有文字)或节省空间(无文字)。
 * desc: 设置`icon`属性即可，设置在文字右边的`icon` ，也可使用`i`标签即可，可以使用自定义图标。
 */
import React from 'react';
import { Button } from 'kenshin';

export default () => <Button.Group>
  <Button type="primary" icon="arrow-left">上一页</Button>
  <Button type="primary">下一页<i className="kenshin-icon-arrow-right kenshin-icon-right"></i></Button>
</Button.Group>
```

<API/>


<br>

## API

| Name          | Description     | Type                                                         |    Default       |
| ------------- | --------------- | ------------------------------------------------------------ |----------------- |
| type          | 按钮类型          | `primary \| success \| warning \| danger \| info \| text \| default`  | `default` |
| size          | 尺寸             | `large \| small \| mini`                                     |     `--`       |
| icon          | 图标             |  `string`                                                       |      `--`          |
| nativeType    | HTML 类型        | `button \| submit \| reset`                                   |  `button`  |
| loading       | 加载状态          | `boolean`                                                      |   `false`  |
| disabled      | 禁用状态          | `boolean`                                                      |  `false`  |
| plain         | 镂空效果          | `boolean`                                                      |   `false` |
| className     | 自定义样式类       | `string`                                                       |  `--`  |
| style         | 自定义样式类       | `React.CSSProperties`                                          |  `--`  |
| prefixCls     | 自定义样式前缀     | `string`                                                      |  `--`  |
| onClick       | 点击事件          |  `(e: React.MouseEvent<HTMLButtonElement>) => void `         |   `--`           |

<style>
.kenshin-button [class^="kenshin-icon"] {
  font-size: 14px;
}
</style>
