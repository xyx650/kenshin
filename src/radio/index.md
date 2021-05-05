## Radio 单选

Demo:

```tsx
import React from 'react';
import { Radio } from 'kenshin';

export default () => {
  const [value, setValue] = React.useState(1)

  return <>
    <Radio value={1} checked={value === 1} onChange={e => setValue(e)}>备选项1</Radio>
    <Radio value={2} checked={value === 2} onChange={e => setValue(e)}>备选项2</Radio>
  </>
}
```

```
