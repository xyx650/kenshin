## ColorPicker 颜色选择器

```tsx
/**
 * title: 基础用法
 * desc: 基础用法
 */
import React from 'react';
import { ColorPicker } from 'kenshin';

export default () => {
  const [color,] = React.useState('#000')
  return <ColorPicker defaultColor={color} />
}
```

```tsx
/**
 * title: 自定义宽度
 * desc: 设置`width`属性可以自定义宽度
 */
import React from 'react';
import { ColorPicker } from 'kenshin';

export default () => {
  const [color,] = React.useState('#000')
  return <ColorPicker defaultColor={color} width={111} />
}
```

```tsx
/**
 * title: rgb 模式
 * desc: 设置`mode`为 rgb, 并传入 rgb 格式的颜色值
 */
import React from 'react';
import { ColorPicker } from 'kenshin';

export default () => {
  const [color,] = React.useState('rgba(222, 111, 55, .5)')
  return <ColorPicker defaultColor={color} mode={'rgb'} />
}
```

```tsx
/**
 * title: 预设的颜色值集合
 * desc: 设置`presetColors` 传入颜色集合
 */
import React from 'react';
import { ColorPicker } from 'kenshin';

export default () => {
  const [color,] = React.useState('rgba(12, 23, 66, .333)')
  const presetColors = ['#FF6900', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3', '#ABB8C3', '#EB144C', '#F78DA7', '#9900EF']
  const onChange = color => console.log(color)
  return <ColorPicker defaultColor={color} onChange={onChange} mode={'rgb'} presetColors={presetColors} />
}
```

## API

| Name | Description | Type | Default |
| ------------- | --------------- | ---------------------- |----------------- |
| defaultColor | 默认颜色值 | `string`  |  |
| mode | 颜色类型 | `'hex' \| 'rgb' \| 'hsl'`|     `hex`       |
| disableAlpha | 是否隐藏透明度选项 | `boolean`|     `false`       |
| presetColors | 预设的颜色值集合 | `string[]`|           |
| width | picker 的宽度 | `number`|    `200`       |
| onChange | 颜色改变时触发的回调 | `(color: string) => void`|            |
| onChangeComplete | 颜色改变结束时触发的回调 | `(color: string) => void`|            |
