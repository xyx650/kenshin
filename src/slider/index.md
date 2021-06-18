## Slider 滑块

```tsx
/**
 * title: 基本滑动条
 * desc: 基本滑动条
 */
import React from 'react';
import { Slider } from 'kenshin';

export default () => <Slider defaultValue={50} />
```

```tsx
/**
 * title: 双滑动条
 * desc: 当 `range` 为 true 时，渲染为双滑块。
 */
import React from 'react';
import { Slider } from 'kenshin';

export default () => <Slider defaultValue={[20, 50]} range />
```

```tsx
/**
 * title: 禁用状态
 * desc: 当 `disabled` 为 true 时，滑块处于不可用状态。
 */
import React from 'react';
import { Slider } from 'kenshin';

export default () => <Slider defaultValue={50} disabled />
```

```tsx
/**
 * title: 自定义提示
 * desc: 使用 `tipFormatter` 可以格式化 Tooltip 的内容
 */
import React from 'react';
import { Slider } from 'kenshin';

const formatter = v => `${v}℃`

export default () => <Slider defaultValue={50} tipFormatter={formatter} />
```


```tsx
/**
 * title: 范围可拖拽
 * desc: 可以设置 `range.draggableTrack`，使得范围刻度整体可拖拽。
 */
import React from 'react';
import { Slider } from 'kenshin';

export default () => <Slider range={{ draggableTrack: true }} defaultValue={[20, 50]} />
```




## API

| Name          | Description     | Type                                                         |    Default       |
| --- | --- | --- | --- |
| defaultValue | 设置初始取值。当 `range` 为 false 时，使用 number，否则用 \[number, number] | `number \| [number, number]` | `0 \| [0, 0]` |
| disabled | 值为 true 时，滑块为禁用状态 | `boolean` | `false` |
| dots | 是否只能拖拽到刻度上 | `boolean` | `false` |  |
| getTooltipPopupContainer | Tooltip 渲染父节点，默认渲染到 body 上 | `triggerNode => HTMLElement` | `() => body` |
| max | 最大值 | `number` | `100` |
| min | 最小值 | `number` | `0` |
| range | 双滑块模式 | `boolean \| { draggableTrack: boolean }` | `false` |
| step | 步长，取值必须大于 0 | `number` | `1` |
| tipFormatter | 自定义提示格式 | `value => ReactNode \| null` | `value` |  |
| tooltipVisible | 值为 true 时，Tooltip 将会始终显示；否则始终不显示，哪怕在拖拽及移入时 | `boolean` | `-` |
| value | 设置当前取值。当 `range` 为 false 时，使用 number，否则用 \[number, number] | `number \| [number, number]` | `-` |
| onAfterChange | 与 `onmouseup` 触发时机一致，把当前值作为参数传入 | `value => void` | `-` |
| onChange | Slider 值改变时触发 | `value => void` | `-` |



<style>
.__dumi-default-previewer-demo {
  width: 50%;
  min-width: 500px;
}
</style>
