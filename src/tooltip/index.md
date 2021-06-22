## Tooltip 提示

```tsx
/**
 * title: 基本使用方式
 * desc: 基本使用方式
 */
import React from 'react';
import { Tooltip, Button } from 'kenshin';


export default () => (
  <Tooltip title="我是提示">
    <span className='span'>触发提示</span>
  </Tooltip>
)
```

```tsx
/**
 * title: 多彩文字提示
 * desc: 通过设置`color`来调整颜色样式
 */
import React from 'react';
import { Tooltip, Button } from 'kenshin';

const colors = ['pink', 'red', 'yellow', 'orange', '#108ee9']

export default () => <>
  {
    colors.map(color => (
      <Tooltip title={color} color={color} key={color}>
        <span className='span' style={{ color }}>{color}</span>
      </Tooltip>
    ))
  }
</>
```

```tsx
/**
 * title: 箭头指向
 * desc: 设置了 `arrowPointAtCenter` 后，箭头将指向目标元素的中心
 */
import React from 'react';
import { Tooltip, Button } from 'kenshin';


export default () => <>
  <Tooltip placement="topLeft" title="Prompt Text">
    <span className='span'>Align edge / 边缘对齐</span>
  </Tooltip>
  <Tooltip placement="topLeft" title="Prompt Text" arrowPointAtCenter>
    <span className='span'>Arrow points to center / 箭头指向中心</span>
  </Tooltip>
</>
```

```tsx
/**
 * title: 位置有 12 个方向
 * desc: 通过`placement`设置方向
 */
import React from 'react';
import { Tooltip, Button } from 'kenshin';

const text = '👻 👻 👻'
const buttonWidth = 70

export default () => <div className="demo">
  <div style={{ marginLeft: buttonWidth, whiteSpace: 'nowrap' }}>
    <Tooltip placement="topLeft" title={text}>
      <span className="kenshin-span">TL</span>
    </Tooltip>
    <Tooltip placement="top" title={text}>
      <span className="kenshin-span">Top</span>
    </Tooltip>
    <Tooltip placement="topRight" title={text}>
      <span className="kenshin-span">TR</span>
    </Tooltip>
  </div>
  <div style={{ width: buttonWidth, float: 'left' }}>
    <Tooltip placement="leftTop" title={text}>
      <span className="kenshin-span">LT</span>
    </Tooltip>
    <Tooltip placement="left" title={text}>
      <span className="kenshin-span">Left</span>
    </Tooltip>
    <Tooltip placement="leftBottom" title={text}>
      <span className="kenshin-span">LB</span>
    </Tooltip>
  </div>
  <div style={{ width: buttonWidth, marginLeft: buttonWidth * 4 + 24 }}>
    <Tooltip placement="rightTop" title={text}>
      <span className="kenshin-span">RT</span>
    </Tooltip>
    <Tooltip placement="right" title={text}>
      <span className="kenshin-span">Right</span>
    </Tooltip>
    <Tooltip placement="rightBottom" title={text}>
      <span className="kenshin-span">RB</span>
    </Tooltip>
  </div>
  <div style={{ marginLeft: buttonWidth, clear: 'both', whiteSpace: 'nowrap' }}>
    <Tooltip placement="bottomLeft" title={text}>
      <span className="kenshin-span">BL</span>
    </Tooltip>
    <Tooltip placement="bottom" title={text}>
      <span className="kenshin-span">Bottom</span>
    </Tooltip>
    <Tooltip placement="bottomRight" title={text}>
      <span className="kenshin-span">BR</span>
    </Tooltip>
  </div>
</div>
```

## API

| Name          | Description     | Type                                                         |    Default       |
| --- | --- | --- | --- |
| arrowPointAtCenter | 箭头是否指向目标元素中心 | `boolean` | `false` |
| autoAdjustOverflow | 气泡被遮挡时自动调整位置 | `boolean` | `true` |
| color | 背景颜色 | `string` |  |
| defaultVisible | 默认是否显隐 | `boolean` | `false` |
| getPopupContainer | 浮层渲染父节点，默认渲染到 body 上 | `triggerNode => React.ReactNode` | `() => document.body` |
| overlayClassName | 卡片样式类名 | `string` |  |
| overlayStyle | 卡片样式 | `React.CSSProperties` |  |
| placement | 气泡框位置 | `"top" \| "left" \| "right" \| "bottom" \| "topLeft" \| "topRight" \| "bottomLeft" \| "bottomRight" \| "leftTop" \| "leftBottom" \| "rightTop" \| "rightBottom"` | `top` |
| trigger | 触发行为 | `"hover" \| "focus" \| "click" \| [keyof trigger]` | `hover` |
| visible | 用于手动控制浮层显隐 | `boolean` | `false` |
| onVisibleChange | 显示隐藏的回调 | `(visible: boolean) => void` |  |

<style>
.kenshin-span {
  display: inline-block;
  margin: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 13px;
  width: 60px;
  text-align: center;
}

.demo {
  overflow: auto;
}
.span {
  margin: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 13px;
  display: inline-block;
}
</style>
