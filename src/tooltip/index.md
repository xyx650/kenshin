## Tooltip 提示


```tsx
/**
 * title: Tooltip 基本使用方式
 * desc: 基本使用方式
 */
import React from 'react';
import { Tooltip, Button } from 'kenshin';

const colors = [
  'pink',
  'red',
  'yellow',
  'orange'
];

export default () => <>
  {colors.map(color => (
    <Tooltip title={color} color={color} key={color}>
      <span type={'text'} className='kenshin-span'>{color}</span>
    </Tooltip>
  ))}
</>
```

<API/>

<style>
.kenshin-span {
  margin: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}
</style>
