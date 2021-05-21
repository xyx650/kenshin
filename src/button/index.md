## Button 按钮

```tsx
import React from 'react';
import { Button } from 'kenshin';

const [number, setNumber] = React.useState(0)
console.log('组件渲染', number)
export default () => <>
  <span>{number}</span><br />
  <Button onClick={() => setNumber(1)}>将 number 设置成 1</Button><br />
  <Button onClick={() => setNumber(2)}>将 number 设置成 2</Button><br />
  <Button onClick={() => setNumber(3)}>将 number 设置成 3</Button>
</>
// export default () => <Button type='primary'>primary</Button>;
```
<API/>
