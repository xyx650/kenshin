## Tooltip 提示

Demo:

```tsx
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
      <span type={'text'}>{color}</span>
    </Tooltip>
  ))}
</>
```
