## Rate 评分

```tsx
/**
 * title: 基本使用方式
 * desc: 基本使用方式
 */
import React from 'react';
import { Rate } from 'kenshin';

export default () => <Rate />;
```


```tsx
/**
 * title: 区分颜色
 * desc: 可以利用颜色对分数及情感倾向进行分级
 */
import React from 'react';
import { Rate } from 'kenshin';

export default () => <Rate colors={['#99A9BF', '#F7BA2A', '#FF9900']}/>;
```


```tsx
/**
 * title: 允许半选
 * desc: 可支持鼠标选择半星
 */
import React from 'react';
import { Rate } from 'kenshin';

export default () => <Rate allowHalf/>;
```

```tsx
/**
 * title: 辅助文字
 * desc: 为组件设置 `showText` 属性会在右侧显示辅助文字。通过设置 `texts` 可以为每一个分值指定对应的辅助文字。`texts` 为一个数组，长度应等于最大值 max。
 */
import React from 'react';
import { Rate } from 'kenshin';

export default () => <Rate showText onChange={ v => console.log(v) }/>;
```

```tsx
/**
 * title: 只读
 * desc: 为组件设置 `disabled` 属性表示组件为只读，支持小数分值。此时若设置 `showText`，则会在右侧显示目前的分值。
 */
import React from 'react';
import { Rate } from 'kenshin';

export default () => <Rate disabled showText value={2.2} allowHalf/>;
```
<API/>

<style>

</style>
